"use client";

import { Box, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  src: string;
  caption: string;
  rotate?: number;
}

export default function Polaroid({ src, caption, rotate = 0 }: Props) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      x: -(y - centerY) / 25,
      y: (x - centerX) / 25,
    });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <Box
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      sx={{
        position: "relative",
        width: { xs: 190, sm: 210, md: 250 },
        background: `
          linear-gradient(#ffffff,#f9f9f9),
          url("/textures/paper-texture.jpg")
        `,
        backgroundBlendMode: "overlay",
        borderRadius: 2,
        p: 1.5,
        pb: 4,
        transform: `
          perspective(900px)
          rotate(${rotate}deg)
          rotateX(${tilt.x}deg)
          rotateY(${tilt.y}deg)
        `,
        transition: "transform 0.15s ease",
        boxShadow: "0px 18px 40px rgba(0,0,0,0.45)",
        "&:hover": {
          boxShadow: "0px 25px 55px rgba(255,77,109,0.35)",
        },
      }}
    >
      {/* Tape */}
      <Box
        sx={{
          position: "absolute",
          top: -12,
          left: 20,
          width: 60,
          height: 20,
          background: "rgba(255,255,255,0.6)",
          transform: "rotate(-12deg)",
          borderRadius: 1,
          backdropFilter: "blur(2px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: -12,
          right: 20,
          width: 60,
          height: 20,
          background: "rgba(255,255,255,0.6)",
          transform: "rotate(10deg)",
          borderRadius: 1,
          backdropFilter: "blur(2px)",
        }}
      />

      {/* ✅ Fixed photo window (polaroid-style) */}
      <Box
        sx={{
          width: "100%",
          height: { xs: 210, sm: 210, md: 250 }, // consistent “print” area
          borderRadius: 1,
          overflow: "hidden",
          mb: 1.5,
        }}
      >
        <Box
          component="img"
          src={src}
          alt={caption}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // ✅ key fix
            display: "block",
          }}
        />
      </Box>

      {/* Caption */}
      <Typography
        sx={{
          fontSize: "0.95rem",
          fontFamily: "'Caveat', cursive",
          color: "#333",
          textAlign: "center",
        }}
      >
        {caption}
      </Typography>
    </Box>
  );
}

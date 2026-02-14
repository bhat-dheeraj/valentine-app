"use client";

import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { MouseEvent, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useMusic } from "./music/MusicProvider";

interface Props {
  onYes: () => void;
}

export default function ValentineQuestion({ onYes }: Props) {
  const title = "Hey Snuggleboooo";
  const text = "Will you be my Valentine? ❤️";
  const [displayedText, setDisplayedText] = useState("");
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const { play } = useMusic();

  // Typing effect
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const moveNoButton = () => {
    play().catch(() => {});
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 150 - 75;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYes = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    play().catch(() => {});
    localStorage.setItem("music_unlocked", "true");
    confetti({
      particleCount: 250,
      spread: 90,
      colors: ["#ff002f", "#3d3d3d", "#ff5f7d", "#000000"],
      gravity: 1.2,
    });

    onYes();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `
            radial-gradient(
              circle at center,
              rgba(255,77,109,0.08),
              #3f3f3f 70%
            )
          `,
        }}
        onClick={(e) => {
          e.stopPropagation();
          play().catch(() => {});
          localStorage.setItem("music_unlocked", "true");
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            p: 6,
            borderRadius: 5,
            background: "rgba(30,30,30,0.95)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 40px 80px rgba(255,77,109,0.15)",
            minWidth: 350,
            maxWidth: 600,
          }}
        >
          <Typography variant="h5" sx={{ mb: 5, color: "#ff4d6d" }}>
            {title}
          </Typography>

          <Typography variant="h4" sx={{ mb: 5, color: "#ff4d6d" }}>
            {displayedText}
          </Typography>

          <Box
            sx={{
              position: "relative",
              height: 140,
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              onClick={handleYes}
              sx={{
                position: "absolute",
                left: "40%",
                transform: "translateX(-50%)",
                px: 4,
                py: 1,
                background: "#ff4d6d",
                "&:hover": {
                  background: "#ff1f4d",
                  boxShadow: "0 0 25px rgba(255,77,109,0.6)",
                },
              }}
              size="large"
            >
              Yes 💖
            </Button>

            <Button
              variant="outlined"
              onMouseEnter={moveNoButton}
              onTouchStart={(e) => {
                e.preventDefault();
                play().catch(() => {});
                moveNoButton();
              }}
              onClick={(e) => {
                e.preventDefault();
                play().catch(() => {});
                moveNoButton();
              }}
              sx={{
                position: "absolute",
                left: "60%",
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                transition: "transform 0.2s ease",
                borderColor: "#ff4d6d",
                color: "#ff4d6d",
                px: 4,
                py: 1,
              }}
              size="large"
            >
              No 🙈
            </Button>
          </Box>

          <Box
            component="img"
            src={"/images/together/photo9.jpg"}
            alt={"Proposal"}
            sx={{
              width: "90%",
              objectFit: "cover", // ✅ key fix
              display: "block",
              borderRadius: 2,
              m: "0 auto",
            }}
          />
        </Box>
      </Box>
    </motion.div>
  );
}

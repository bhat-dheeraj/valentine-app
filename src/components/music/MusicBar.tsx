"use client";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useMusic } from "./MusicProvider";
import { useState } from "react";

export default function MusicBar() {
  const { current, isPlaying, toggle, next, prev, isSwitching } = useMusic();
  const [blocked, setBlocked] = useState(false);

  const safeToggle = async () => {
    setBlocked(false);
    try {
      await toggle();
    } catch {
      // If autoplay was blocked, user can just tap again (after any gesture)
      setBlocked(true);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: "auto", // ✅ IMPORTANT: override MUI default top:0
        bottom: 0, // ✅ stick to bottom
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.modal + 1,

        background: "rgba(15,15,15,0.75)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "35px !important",
          px: { xs: 1, sm: 7 },
          display: "flex",
          gap: 1,
        }}
      >
        <IconButton
          disabled={isSwitching}
          onClick={() => void prev()}
          sx={{ color: "#ff8fab" }}
        >
          <SkipPreviousIcon />
        </IconButton>

        <IconButton
          disabled={isSwitching}
          onClick={() => void toggle()}
          sx={{ color: "#ff4d6d" }}
        >
          {isPlaying ? (
            <PauseCircleIcon fontSize="medium" />
          ) : (
            <PlayCircleIcon fontSize="medium" />
          )}
        </IconButton>

        <IconButton
          disabled={isSwitching}
          onClick={() => void next()}
          sx={{ color: "#ff8fab" }}
        >
          <SkipNextIcon />
        </IconButton>

        <Box sx={{ ml: 1, minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.95rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {current.title}
          </Typography>

          {blocked && (
            <Typography
              sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.75rem" }}
            >
              Tap once more if playback was blocked
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

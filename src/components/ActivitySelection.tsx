"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  onSubmit: () => void;
}

const activities = [
  { id: "watch", label: "Watch Something Together 🎬" },
  { id: "game", label: "Play a Game 🎮" },
  { id: "dinner", label: "Romantic Dinner Date 🍽" },
  { id: "talk", label: "Late night Talk 💌" },
];

export default function ActivitySelection({ onSubmit }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          py: 0,
          height: { md: "100vh" },
        }}
      >
        <Paper
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, color: "#ff4d6d" }}>
            What shall we do together? 💕
          </Typography>

          <Typography
            sx={{
              mb: 6,
              opacity: 0.7,
              fontSize: "0.9rem",
            }}
          >
            Even miles apart, we’re still together ❤️
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              maxWidth: 600,
              width: "100%",
            }}
          >
            {activities.map((item) => {
              const isSelected = selected.includes(item.id);

              return (
                <Card
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  sx={{
                    cursor: "pointer",
                    background: isSelected
                      ? "rgba(255,77,109,0.15)"
                      : "rgba(30,30,30,0.9)",
                    border: isSelected
                      ? "1px solid #ff4d6d"
                      : "1px solid transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 0 20px rgba(255,77,109,0.4)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography>{item.label}</Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>

          <Button
            variant="contained"
            sx={{
              mt: 6,
              background: "#ff4d6d",
              px: 4,
            }}
            disabled={selected.length === 0}
            onClick={onSubmit}
          >
            Continue 💖
          </Button>
        </Paper>
      </Box>
    </motion.div>
  );
}

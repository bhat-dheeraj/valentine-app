"use client";

import { Box, Button, Paper, Typography, IconButton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type SavedPlan = {
  summary?: string[];
  dinnerMood?: string | null;
  foodLabels?: string[];
};

const STORAGE_KEY_PLAN = "valentine_plan";

function readPlan(): SavedPlan | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PLAN);
    if (!raw) return null;
    return JSON.parse(raw) as SavedPlan;
  } catch {
    return null;
  }
}

export default function LoveLetterReveal() {
  const [opened, setOpened] = useState(false);
  const [fullView, setFullView] = useState(false);

  const [plan, setPlan] = useState<SavedPlan | null>(null);

  useEffect(() => {
    setPlan(readPlan());

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_PLAN) {
        setPlan(readPlan());
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Optional: typing just the first line
  const firstLine = "My dear snugglebooo,";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!opened) return;

    let i = 0;
    setTyped("");
    const t = setInterval(() => {
      i++;
      setTyped(firstLine.slice(0, i));
      if (i >= firstLine.length) clearInterval(t);
    }, 55);

    return () => clearInterval(t);
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    confetti({
      particleCount: 250,
      spread: 90,
      colors: ["#ff002f", "#3d3d3d", "#ff5f7d", "#000000"],
      gravity: 1.2
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at center, rgba(255,77,109,0.10), #3f3f3f 70%)",
      }}
    >
      <AnimatePresence mode="wait">
        {!fullView ? (
          // ---------- ENVELOPE VIEW ----------
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                px: 2,
              }}
            >
              <Paper
                sx={{
                  width: "100%",
                  maxWidth: 720,
                  p: { xs: 2, sm: 3 },
                  borderRadius: 4,
                  background: "rgba(30,30,30,0.9)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "#ff4d6d", textAlign: "center", mb: 2 }}
                >
                  A little letter for you 💌
                </Typography>

                <Box sx={{ display: "grid", placeItems: "center", py: 2 }}>
                  <motion.div
                    style={{ width: "100%", maxWidth: 520 }}
                    initial={false}
                    animate={opened ? "open" : "closed"}
                    variants={{
                      closed: { scale: 1 },
                      open: { scale: 1.02 },
                    }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Envelope body */}
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 220,
                        borderRadius: 3,
                        background:
                          "linear-gradient(180deg, rgba(255,77,109,0.18), rgba(255,77,109,0.08))",
                        border: "1px solid rgba(255,77,109,0.35)",
                        overflow: "hidden",
                      }}
                    >
                      {/* Top flap */}
                      <motion.div
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          top: 0,
                          height: "50%",
                          transformOrigin: "top",
                        }}
                        variants={{
                          closed: { rotateX: 0 },
                          open: { rotateX: -160 },
                        }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            background: "rgba(255,77,109,0.25)",
                            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                          }}
                        />
                      </motion.div>

                      {/* Letter preview sliding up */}
                      <motion.div
                        style={{
                          position: "absolute",
                          left: "8%",
                          right: "8%",
                          bottom: 14,
                        }}
                        variants={{
                          closed: { y: 90, opacity: 0 },
                          open: { y: 0, opacity: 1 },
                        }}
                        transition={{
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        onAnimationComplete={(def) => {
                          // Only switch when the "open" animation completes
                          if (opened && def === "open") {
                            setFullView(true);
                          }
                        }}
                      >
                        <Paper
                          sx={{
                            p: { xs: 2, sm: 2.5 },
                            borderRadius: 3,
                            background: `
                              linear-gradient(#ffffff,#f9f9f9),
                              url("/textures/paper-texture.jpg")
                            `,
                            backgroundBlendMode: "overlay",
                            color: "#222",
                            boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "'Caveat', cursive",
                              fontSize: "1.5rem",
                              color: "#111",
                            }}
                          >
                            {opened ? typed : ""}
                          </Typography>
                        </Paper>
                      </motion.div>

                      {/* Bottom shadow strip */}
                      <Box
                        sx={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: 28,
                          background: "rgba(0,0,0,0.18)",
                        }}
                      />
                    </Box>
                  </motion.div>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  {!opened ? (
                    <Button
                      variant="contained"
                      onClick={handleOpen}
                      sx={{
                        background: "#ff4d6d",
                        px: 4,
                        "&:hover": { background: "#ff1f4d" },
                      }}
                    >
                      Open 💌
                    </Button>
                  ) : (
                    <Typography sx={{ color: "#ff8fab", textAlign: "center" }}>
                      Opening your letter… 🖤
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Box>
          </motion.div>
        ) : (
          // ---------- FULL SCREEN LETTER VIEW ----------
          <motion.div
            key="full-letter"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <Box
              sx={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                px: { xs: 2, sm: 3 },
                py: { xs: 3, sm: 4 },
              }}
            >
              <Paper
                sx={{
                  width: "100%",
                  maxWidth: 820,
                  height: "100vh", // ✅ full height
                  maxHeight: { xs: "100vh", sm: "92vh" }, // small margin on larger screens
                  borderRadius: 4,
                  overflow: "hidden",
                  background: "rgba(30,30,30,0.92)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 22px 70px rgba(0,0,0,0.65)",
                  position: "relative",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    px: { xs: 2, sm: 3 },
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      // Option: go back to envelope view
                      setFullView(false);
                      setOpened(false);
                    }}
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* Scroll area */}
                <Box
                  sx={{
                    height: "calc(100% - 56px)",
                    overflowY: "auto",
                    px: { xs: 2, sm: 4 },
                    py: { xs: 3, sm: 4 },
                  }}
                >
                  <Paper
                    sx={{
                      p: { xs: 2.5, sm: 4 },
                      borderRadius: 3,
                      background: `
                        url("/textures/paper-texture1.jpg")
                      `,
                      backgroundBlendMode: "overlay",
                      color: "#222",
                      boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: { xs: "1.7rem", sm: "2rem" },
                        mb: 1,
                        color: "#111",
                      }}
                    >
                      {firstLine}
                    </Typography>

                    <Typography sx={{ fontSize: "1rem", mb: 1.5 }}>
                      Happy Valentine’s Day ❤️ And Very Happy Engagement
                      Anniversary 🥰🥰
                    </Typography>

                    <Typography sx={{ fontSize: "1.05rem", lineHeight: 1.9 }}>
                      {` I know we're miles apart right now, but somehow you still
                      feel closer to me than anything else in this world. And
                      that's something I never take for granted. Being with you has changed me in the best way. With you every single day feels so special.`}
                    </Typography>

                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 2 }}
                    >
                      {`Even when we're not in the same city, You're always in my heart. In the way I smile at random thoughts of you, in the way I look forward to our calls, 
                      in the way I plan a future that always includes you.I made this little page for you because I wanted to do something special and different this valentines day. 
                      A little playful. A little dramatic. But completely sincere.`}
                    </Typography>

                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 2 }}
                    >
                      {`Every movie we watch, every conversation, every silly game, every future dinner date, it's never just about the activity. 
                      It's about doing it with you.`}
                    </Typography>

                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 2 }}
                    >
                      I don&apos;t just want Valentine&apos;s Day with you.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 1 }}
                    >
                      I want random Tuesdays.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 1 }}
                    >
                      I want exciting travel days.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 1 }}
                    >
                      I want boring grocery runs.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 1 }}
                    >
                      I want the whole story.
                    </Typography>

                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 2 }}
                    >
                      You are my calm.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 1 }}
                    >
                      My favorite notification.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 1 }}
                    >
                      The love of my life
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 1 }}
                    >
                      My baby doll, my snuggleboo, my cutie pieee, my gorgeous
                      little wifeyyy.
                    </Typography>

                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 2 }}
                    >
                      No matter how far apart we are right now, I know this is
                      temporary. What we&apos;re building is permanent.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 1 }}
                    >
                      Thank you for loving me.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 1 }}
                    >
                      Thank you for choosing me.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 1 }}
                    >
                      Thank you for being you.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 2 }}
                    >
                      And I promise one day soon we won&apos;t have to celebrate
                      through screens.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "1.05rem", lineHeight: 1.9, mt: 2 }}
                    >
                      Until then, I&apos;ll keep choosing you. Every time.
                    </Typography>

                    <Typography
                      sx={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "1.6rem",
                        color: "#ff4d6d",
                        mt: 2,
                      }}
                    >
                      I love youuuuuu 💋
                    </Typography>

                    <Typography sx={{ mt: 3, fontWeight: 800 }}>
                      Yours always, ❤️
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "1.6rem",
                      }}
                    >
                      Babulushu
                    </Typography>

                    <Box
                      component="img"
                      src={"/images/kiss1.gif"}
                      alt={"Kiss"}
                      sx={{
                        width: "auto",
                        objectFit: "cover", // ✅ key fix
                        display: "block",
                      }}
                    />

                    {plan && (
                      <Box sx={{ mt: 2 }}>
                        <Typography sx={{ fontWeight: 800, mb: 1 }}>
                          Virtual date night plan using your choices 😍
                        </Typography>

                        {plan?.summary?.length ? (
                          <Box component="ul" sx={{ m: 0, pl: 2 }}>
                            {plan.summary.map((s, idx) => (
                              <li key={idx}>
                                <Typography sx={{ fontSize: "1.02rem" }}>
                                  {s}
                                </Typography>
                              </li>
                            ))}
                          </Box>
                        ) : (
                          <Typography sx={{ opacity: 0.85 }}>
                            (I’ll follow whatever you choose 😌)
                          </Typography>
                        )}

                        {(plan?.dinnerMood || plan?.foodLabels?.length) && (
                          <Box sx={{ mt: 1 }}>
                            {plan.dinnerMood && (
                              <Typography>
                                🍽 Dinner mood: {plan.dinnerMood}
                              </Typography>
                            )}
                            {!!plan.foodLabels?.length && (
                              <Typography>
                                🍰 Food: {plan.foodLabels.join(", ")}
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Box>
                    )}

                    <Typography sx={{ mt: 2 }}>
                      I can&apos;t wait for our date night. No matter what you
                      chose, as long as it&apos;s with you, I&apos;m happy.
                    </Typography>
                  </Paper>

                  <Box sx={{ height: 24 }} />
                </Box>
              </Paper>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

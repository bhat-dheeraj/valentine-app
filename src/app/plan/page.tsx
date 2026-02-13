"use client";

import { AnimatePresence } from "framer-motion";
import BackgroundMusic from "@/components/BackgroundMusic";
import { Box } from "@mui/material";
import ResponsivePolaroidCarousel from "@/components/ResponsivePolaroidCarousel";
import ValentinePathBuilder from "@/components/ValentinePathBuilder";
import { useRouter } from "next/navigation";

export default function Plan() {
  const router = useRouter();

  return (
    <>
      <BackgroundMusic play={true} />

      <AnimatePresence mode="wait">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            height: { md: "100dvh" }, // ✅ lock to viewport on desktop
            overflow: { md: "hidden" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "25%" },
              height: { md: "100dvh" },
              overflow: "hidden",
            }}
          >
            <ResponsivePolaroidCarousel />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0, // ✅ IMPORTANT
              overflow: "hidden",
            }}
          >
            <ValentinePathBuilder
              onRevealLetter={() => router.push("/letter")}
            />
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "25%" },
              height: { md: "100dvh" },
              overflow: "hidden",
            }}
          >
            <ResponsivePolaroidCarousel reverse secondCarousal={true} />
          </Box>
        </Box>
      </AnimatePresence>
    </>
  );
}

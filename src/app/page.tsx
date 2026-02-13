"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import ValentineQuestion from "@/components/ValentineQuestion";
import { useRouter } from "next/navigation";
import { useMusic } from "@/components/music/MusicProvider";

export default function Home() {
  const [step, setStep] = useState<"loading" | "question">("loading");

  const router = useRouter();

  const { play } = useMusic();

  return (
    <>
      <AnimatePresence mode="wait">
        {step === "loading" && (
          <LoadingScreen
            key="loading"
            onComplete={async () => {
              setStep("question");
              play().catch(() => {});
              localStorage.setItem("music_unlocked", "true");
            }}
          />
        )}

        {step === "question" && (
          <ValentineQuestion
            key="question"
            onYes={() => {
              play().catch(() => {});
              localStorage.setItem("music_unlocked", "true");
              router.push("/plan");
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

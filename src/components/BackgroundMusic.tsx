"use client";

import { useEffect, useRef } from "react";

interface Props {
  play: boolean;
}

export default function BackgroundMusic({ play }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [play]);

  return <audio ref={audioRef} src="/music/romantic1.mp3" loop />;
}

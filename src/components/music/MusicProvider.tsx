"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type Track = { src: string; title: string };

type MusicContextValue = {
  tracks: Track[];
  index: number;
  current: Track;
  isPlaying: boolean;
  isSwitching: boolean;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  setIndex: (i: number) => Promise<void>;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within <MusicProvider />");
  return ctx;
}

const DEFAULT_TRACKS: Track[] = [
  { src: "/music/Perfect.mp3", title: "Perfect" },
  { src: "/music/AllOfMe.mp3", title: "All Of Me" },
  { src: "/music/JustTheWayYouAre.mp3", title: "Just the way you are" },
  { src: "/music/TuHai.mp3", title: "Tu Hai" },
  { src: "/music/Morni.mp3", title: "Morni" },
  { src: "/music/UntilIFoundYou.mp3", title: "Until I Found You" },
  { src: "/music/Sajna.mp3", title: "Sajna" },
  { src: "/music/DieWithASmile.mp3", title: "Die With A Smile" },
  { src: "/music/magic.mp3", title: "Magic!" },
  { src: "/music/TumHoTohSong.mp3", title: "Tum Ho Toh" },
  { src: "/music/Grenade.mp3", title: "Grenade" },
  { src: "/music/TuHainToh.mp3", title: "Tu Hain Toh" },
  { src: "/music/LineWithoutAHook.mp3", title: "Line Without A Hook" },
  { src: "/music/PreetRe.mp3", title: "Preet Re" },
  {
    src: "/music/IThinkTheyCallThisLove.mp3",
    title: "I Think They Call This Love",
  },
  { src: "/music/ThoseEyes.mp3", title: "Those Eyes" },
  { src: "/music/LoveStory.mp3", title: "Love Story" },
  { src: "/music/ily.mp3", title: "I love you" },
];

const clampIndex = (i: number, len: number) => ((i % len) + len) % len;

function waitForCanPlay(audio: HTMLAudioElement) {
  return new Promise<void>((resolve) => {
    if (audio.readyState >= 3) return resolve(); // HAVE_FUTURE_DATA

    const onCanPlay = () => {
      audio.removeEventListener("canplay", onCanPlay);
      resolve();
    };
    audio.addEventListener("canplay", onCanPlay);
  });
}

export function MusicProvider({
  children,
  tracks = DEFAULT_TRACKS,
}: {
  children: React.ReactNode;
  tracks?: Track[];
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
    }
  }, []);

  const [index, setIndexState] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  // user intent: should music be playing?
  const playWantedRef = useRef(false);

  // avoid overlapping switches; queue the last requested index
  const switchingRef = useRef(false);
  const pendingIndexRef = useRef<number | null>(null);

  const current = tracks[index];

  const play = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    playWantedRef.current = true;

    // if switching, just remember intent; switch routine will honor it
    if (switchingRef.current) return;

    await audio.play(); // may throw if blocked
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    playWantedRef.current = false;
    audio.pause();
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // ✅ source of truth is audio.paused (not React state)
    if (audio.paused) {
      try {
        await play();
      } catch {
        // autoplay blocked; user can tap again
      }
    } else {
      pause();
    }
  };

  const switchTo = async (targetIndex: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const safe = clampIndex(targetIndex, tracks.length);

    // If a switch is already happening, just store the last request
    if (switchingRef.current) {
      pendingIndexRef.current = safe;
      return;
    }

    switchingRef.current = true;
    setIsSwitching(true);

    try {
      // pause first to avoid "play interrupted by load"
      audio.pause();

      // change source
      setIndexState(safe);
      audio.src = tracks[safe].src;
      audio.load();

      await waitForCanPlay(audio);

      // resume only if user wants it playing
      if (playWantedRef.current) {
        try {
          await audio.play();
        } catch {
          // blocked; user can hit play
        }
      }
    } finally {
      switchingRef.current = false;
      setIsSwitching(false);

      // If user clicked multiple next/prev quickly, perform the last one
      const pending = pendingIndexRef.current;
      pendingIndexRef.current = null;
      if (pending !== null && pending !== safe) {
        void switchTo(pending);
      }
    }
  };

  const next = async () => {
    await switchTo(index + 1);
  };

  const prev = async () => {
    await switchTo(index - 1);
  };

  const setIndex = async (i: number) => {
    await switchTo(i);
  };

  const value = useMemo(
    () => ({
      tracks,
      index,
      current,
      isPlaying,
      isSwitching,
      play,
      pause,
      toggle,
      next,
      prev,
      setIndex,
    }),
    [tracks, index, current, isPlaying, isSwitching],
  );

  return (
    <MusicContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={current.src}
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          // only auto-next if the user still wants music
          if (playWantedRef.current) void next();
        }}
      />
      {children}
    </MusicContext.Provider>
  );
}

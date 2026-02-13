"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type ActiveCategory = "watch" | "game" | "dinner" | "chat";
type CategoryId = ActiveCategory;

type TimelineItem =
  | {
      type: "pick";
      instanceId: string;
      value: { category: Exclude<CategoryId, "dinner">; optionId: string };
    }
  | {
      type: "dinner";
      instanceId: string; // always "dinner-slot"
    };

type ValentinePathState = {
  timeline: TimelineItem[];
  dinner: {
    selected: boolean;
    moodId: string | null; // exactly 1 mood (optional until chosen)
    foodIds: string[]; // multi-select, no ordering
  };
};

const initialValentineState: ValentinePathState = {
  timeline: [],
  dinner: { selected: false, moodId: null, foodIds: [] },
};

// ---------- DATA ----------
const watchOptions = [
  { id: "movie_1", label: "Stranger Things 📺" },
  { id: "movie_2", label: "Wednesday 📺" },
  { id: "movie_3", label: "Crime patrol 📺" },
  { id: "series_1", label: "Shark tank 📺" },
  { id: "series_2", label: "Splitsvilla 📺" },
  { id: "series_3", label: "The killing 📺" },
  { id: "series_4", label: "Delhi crime 📺" },
  { id: "movie_4", label: "Happy Patel: Khatarnak Jasoos 🎬" },
  { id: "movie_5", label: "Dhadak 2 🎬" },
  { id: "movie_6", label: "Bhool Chuk Maaf 🎬" },
  { id: "series_5", label: "Choose a movie/show on the date" },
];

const gameOptions = [
  { id: "game_1", label: "PubG 🎮" },
  { id: "game_2", label: "Call of duty 🎮" },
  { id: "game_3", label: "Online Escape room 🎮" },
  { id: "game_4", label: "Codenames (Guess the password) 🎴" },
  { id: "game_5", label: "Emoji Decoder (Guess the phrase/movie...) 🎴" },
  { id: "game_6", label: "Pictionary 🎨" },
  { id: "game_7", label: "Dumb Charades 🎭" },
  { id: "game_8", label: "Online board games (Ludo, etc.) 🎲" },
  { id: "game_9", label: "Card games (Uno, etc.) 🎴" },
  { id: "game_10", label: "Choose a game on the date" },
];

const chatOptions = [
  { id: "chat_1", label: "Plan future trips💞" },
  { id: "chat_2", label: "Create bucket list 💞" },
  { id: "chat_3", label: "Would You Rather 😄" },
  { id: "chat_4", label: "Romantic Questions 💌" },
  { id: "chat_5", label: "This-or-That 💞" },
  { id: "chat_6", label: "20 Questions" },
  { id: "chat_7", label: "Truth or dare 🎲" },
  { id: "chat_8", label: "Choose randomly on the day" },
  { id: "chat_9", label: "Share memes and cute videos" },
  { id: "chat_10", label: "Story Builder" },
  { id: "chat_11", label: "Choose a chatting topic/game on the date" },
];

const dinnerMoods = [
  { id: "food_movie", label: "Food + Movie 🍽🎬" },
  { id: "food_games", label: "Food + Games 🍽🎮" },
  { id: "food_talk", label: "Food + Talk 🍽💌" },
  { id: "food_only", label: "Just food 🍽💌" },
];

const foodItems = [
  { id: "Lollipop", label: "Chicken Lollipop 🍗" },
  { id: "Gobi manchurian", label: "Gobi Manchurian 🍝" },
  { id: "pasta", label: "Pasta 🍝" },
  { id: "noodles", label: "Chinese 🍜" },
  { id: "biryani", label: "Biryani 🍛" },
  { id: "Shawarma", label: "Shawarma 🍔" },
  { id: "Snacks", label: "Snacks(Lays, crax, etc.) 🍟" },
  { id: "Chole puri", label: "Chole Puri 🍛" },
  {
    id: "Prawns fry/Prawns hinga udda/ crab",
    label: "Prawns fry/Prawns hinga udda/ crab ",
  },
  { id: "tres leches cake", label: "Tres Leches Cake 🍰" },
  { id: "Rasmalai", label: "Rasmalai 🍰" },
  { id: "Drinks", label: "Drink of choice🥤" },
  { id: "craving of the day", label: "Craving of the day 🎁" },
  { id: "cook together", label: "Cook Together 🍳" },
];

const STORAGE_KEY_BUILDER = "valentine_builder_state_v1";

function loadBuilderState(): ValentinePathState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BUILDER);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ValentinePathState;

    // Minimal sanity check
    if (!parsed || !Array.isArray(parsed.timeline) || !parsed.dinner)
      return null;

    return parsed;
  } catch {
    return null;
  }
}

function saveBuilderState(state: ValentinePathState) {
  try {
    localStorage.setItem(STORAGE_KEY_BUILDER, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random()}`;
}

function labelForPick(
  category: Exclude<CategoryId, "dinner">,
  optionId: string,
) {
  const table =
    category === "watch"
      ? watchOptions
      : category === "game"
        ? gameOptions
        : chatOptions;

  return table.find((o) => o.id === optionId)?.label ?? optionId;
}

function computeNumbers(state: ValentinePathState) {
  // instanceId -> number for picks
  const pickNumber = new Map<string, number>();
  let dinnerNumber: number | null = null;

  let n = 1;
  for (const item of state.timeline) {
    if (item.type === "dinner") {
      dinnerNumber = n++;
    } else {
      pickNumber.set(item.instanceId, n++);
    }
  }

  return { pickNumber, dinnerNumber };
}

function addPick(
  state: ValentinePathState,
  category: Exclude<CategoryId, "dinner">,
  optionId: string,
): ValentinePathState {
  const alreadyPicked = state.timeline.some(
    (t) =>
      t.type === "pick" &&
      t.value.category === category &&
      t.value.optionId === optionId,
  );

  if (alreadyPicked) return state; // ✅ block duplicates

  const instanceId = makeId();
  return {
    ...state,
    timeline: [
      ...state.timeline,
      { type: "pick", instanceId, value: { category, optionId } },
    ],
  };
}

function ensureDinnerSelected(state: ValentinePathState): ValentinePathState {
  if (state.dinner.selected) return state;

  return {
    ...state,
    dinner: { ...state.dinner, selected: true },
    timeline: [
      ...state.timeline,
      { type: "dinner", instanceId: "dinner-slot" },
    ],
  };
}

function deselectDinner(state: ValentinePathState): ValentinePathState {
  if (!state.dinner.selected) return state;

  return {
    ...state,
    dinner: { selected: false, moodId: null, foodIds: [] },
    timeline: state.timeline.filter((t) => t.type !== "dinner"),
  };
}

function setDinnerMood(
  state: ValentinePathState,
  moodId: string,
): ValentinePathState {
  const withDinner = ensureDinnerSelected(state);
  return {
    ...withDinner,
    dinner: { ...withDinner.dinner, moodId },
  };
}

function toggleDinnerFood(
  state: ValentinePathState,
  foodId: string,
): ValentinePathState {
  const withDinner = ensureDinnerSelected(state);
  const exists = withDinner.dinner.foodIds.includes(foodId);

  return {
    ...withDinner,
    dinner: {
      ...withDinner.dinner,
      foodIds: exists
        ? withDinner.dinner.foodIds.filter((id) => id !== foodId)
        : [...withDinner.dinner.foodIds, foodId],
    },
  };
}

function removeTimelineItem(
  state: ValentinePathState,
  instanceId: string,
): ValentinePathState {
  const item = state.timeline.find((t) => t.instanceId === instanceId);
  if (!item) return state;

  if (item.type === "dinner") {
    return deselectDinner(state);
  }

  return {
    ...state,
    timeline: state.timeline.filter((t) => t.instanceId !== instanceId),
  };
}

// ---------- COMPONENT ----------
export default function ValentinePathBuilder({
  onRevealLetter,
}: {
  onRevealLetter?: () => void;
}) {
  const [active, setActive] = useState<ActiveCategory>("watch");
  const [state, setState] = useState<ValentinePathState>(initialValentineState);
  const [isRevealing, setIsRevealing] = useState(false);

  const numbers = useMemo(() => computeNumbers(state), [state]);

  const totalMoments = state.timeline.length;
  const dinnerOn = state.dinner.selected;
  const foodCount = state.dinner.foodIds.length;

  const hydratedRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;

    const stored = loadBuilderState();
    if (stored) setState(stored);
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return; // don’t save before we hydrate
    saveBuilderState(state);
  }, [state]);

  const buildLetterPayload = () => {
    const summary = state.timeline.map((item) => {
      if (item.type === "dinner") {
        const n = numbers.dinnerNumber ?? "";
        return `${n}. Dinner 🍽`;
      }
      const n = numbers.pickNumber.get(item.instanceId) ?? "";
      const niceLabel = labelForPick(item.value.category, item.value.optionId);
      return `${n}. ${niceLabel}`;
    });

    const dinnerMoodLabel =
      dinnerMoods.find((m) => m.id === state.dinner.moodId)?.label ?? null;

    const foodLabels = state.dinner.foodIds.map(
      (id) => foodItems.find((f) => f.id === id)?.label ?? id,
    );

    return { summary, dinnerMood: dinnerMoodLabel, foodLabels };
  };

  const SHEET_WEBHOOK_URL = process.env.NEXT_PUBLIC_SHEET_WEBHOOK_URL!;

  const handleReveal = async () => {
    if (isRevealing) return;

    setIsRevealing(true);

    try {
      // 1) Save builder state
      saveBuilderState(state);

      // 2) Save payload for letter
      const payload = buildLetterPayload();
      localStorage.setItem("valentine_plan", JSON.stringify(payload));

      // 3) Send to sheet (optional, but you want it)
      if (SHEET_WEBHOOK_URL) {
        const body = {
          ...payload,
          createdAt: new Date().toISOString(),
        };

        await fetch(SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(body),
        });
      }

      // 4) Navigate
      onRevealLetter?.();
    } catch (e) {
      console.error(e);
    } finally {
      setIsRevealing(false);
    }
  };

  const handleClearAll = () => {
    if (!confirm("Are you sure you want to reset everything? 💔")) return;

    const emptyState: ValentinePathState = {
      timeline: [],
      dinner: {
        selected: false,
        moodId: null,
        foodIds: [],
      },
    };

    setState(emptyState);

    localStorage.removeItem(STORAGE_KEY_BUILDER);
  };

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0, // ✅ IMPORTANT
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          minHeight: 0, // ✅ IMPORTANT
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 3, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Typography
            variant="h4"
            sx={{ color: "#ff4d6d", mb: 2, mx: "auto", textAlign: "center" }}
          >
            Date Night Plan 💖
          </Typography>

          <Typography sx={{ opacity: 0.75, mb: 3 }}>
            Tap things in the order you want. I’ll keep track 😌
          </Typography>
        </Box>

        {/* Category Row */}
        <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", p: 3 }}>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
              mb: 3,
            }}
          >
            {[
              { id: "watch", label: "Watch 🎬" },
              { id: "dinner", label: "Dinner 🍽" },
              { id: "game", label: "Game 🎮" },
              { id: "chat", label: "Chat 💌" },
            ].map((c) => (
              <Card
                key={c.id}
                onClick={() => setActive(c.id as ActiveCategory)}
                sx={{
                  cursor: "pointer",
                  border:
                    active === c.id
                      ? "1px solid #ff4d6d"
                      : "1px solid transparent",
                  background:
                    active === c.id
                      ? "rgba(255,77,109,0.12)"
                      : "rgba(20,20,20,0.8)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    boxShadow: "0 0 20px rgba(255,77,109,0.25)",
                  },
                }}
              >
                <CardContent sx={{ py: 2 }}>
                  <Typography sx={{ textAlign: "center" }}>
                    {c.label}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Sub-options Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Box sx={{ mb: 3 }}>
                {active === "watch" && (
                  <OptionGrid
                    title="Pick what to watch"
                    options={watchOptions}
                    onPick={(id) => setState((s) => addPick(s, "watch", id))}
                  />
                )}

                {active === "game" && (
                  <OptionGrid
                    title="Pick a game"
                    options={gameOptions}
                    onPick={(id) => setState((s) => addPick(s, "game", id))}
                  />
                )}

                {active === "chat" && (
                  <OptionGrid
                    title="Pick a chat vibe"
                    options={chatOptions}
                    onPick={(id) => setState((s) => addPick(s, "chat", id))}
                  />
                )}

                {active === "dinner" && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Dinner mood (choose 1)
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mb: 2,
                      }}
                    >
                      {dinnerMoods.map((m) => {
                        const selected = state.dinner.moodId === m.id;
                        const dinnerNum = numbers.dinnerNumber;

                        return (
                          <Chip
                            key={m.id}
                            label={
                              dinnerNum ? `${dinnerNum}. ${m.label}` : m.label
                            }
                            onClick={() =>
                              setState((s) => setDinnerMood(s, m.id))
                            }
                            color={selected ? "primary" : "default"}
                            variant={selected ? "filled" : "outlined"}
                          />
                        );
                      })}
                    </Box>

                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Pick food (multiple)
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mb: 2,
                      }}
                    >
                      {foodItems.map((f) => {
                        const selected = state.dinner.foodIds.includes(f.id);
                        return (
                          <Chip
                            key={f.id}
                            label={f.label}
                            onClick={() =>
                              setState((s) => toggleDinnerFood(s, f.id))
                            }
                            color={selected ? "primary" : "default"}
                            variant={selected ? "filled" : "outlined"}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                )}
              </Box>
            </motion.div>
          </AnimatePresence>

          {/* Summary */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Your plan ❤️
            </Typography>

            {/* Cute progress indicator (no fixed target) */}
            <Typography sx={{ opacity: 0.8, mb: 2 }}>
              You’ve picked <b>{totalMoments}</b> moment
              {totalMoments === 1 ? "" : "s"} 💖
              {dinnerOn ? ` • Dinner is in the plan 🍽` : ""}
              {foodCount > 0
                ? ` • ${foodCount} food item${foodCount === 1 ? "" : "s"} selected`
                : ""}
            </Typography>

            {/* Tap-to-remove numbered items */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {state.timeline.map((item) => {
                if (item.type === "dinner") {
                  const n = numbers.dinnerNumber;
                  return (
                    <Chip
                      key={item.instanceId}
                      label={`${n ?? ""}. Dinner 🍽`}
                      color="primary"
                      onClick={() =>
                        setState((s) => removeTimelineItem(s, item.instanceId))
                      }
                      onDelete={() =>
                        setState((s) => removeTimelineItem(s, item.instanceId))
                      }
                    />
                  );
                }

                const n = numbers.pickNumber.get(item.instanceId);
                const niceLabel = labelForPick(
                  item.value.category,
                  item.value.optionId,
                );

                return (
                  <Chip
                    key={item.instanceId}
                    label={`${n ?? ""}. ${niceLabel}`}
                    variant="outlined"
                    onClick={() =>
                      setState((s) => removeTimelineItem(s, item.instanceId))
                    }
                    onDelete={() =>
                      setState((s) => removeTimelineItem(s, item.instanceId))
                    }
                  />
                );
              })}
            </Box>

            {/* Dinner foods (no numbering) */}
            {state.dinner.foodIds.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ opacity: 0.75, mb: 1 }}>
                  Food picked:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {state.dinner.foodIds.map((id) => (
                    <Chip
                      key={id}
                      label={foodItems.find((f) => f.id === id)?.label ?? id}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            p: 3,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            disabled={isRevealing}
            onClick={handleReveal}
            sx={{
              mt: 3,
              background: "#ff4d6d",
              px: 4,
              "&:hover": { background: "#ff1f4d" },
              "&.Mui-disabled": { opacity: 0.6 },
            }}
          >
            {isRevealing ? (
              <>
                <CircularProgress size={18} sx={{ mr: 1, color: "white" }} />
                Saving…
              </>
            ) : (
              "Done! Let's gooo"
            )}
          </Button>
          <Button
            variant="outlined"
            onClick={handleClearAll}
            sx={{
              mt: 3,
              borderColor: "rgba(255,77,109,0.5)",
              color: "#ff8fab",
              "&:hover": {
                borderColor: "#ff4d6d",
                background: "rgba(255,77,109,0.08)",
              },
            }}
            disabled={state.timeline.length === 0 && !state.dinner.selected}
          >
            Clear All Choices 🗑
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

// ---------- SUB COMPONENT ----------
function OptionGrid(props: {
  title: string;
  options: Array<{ id: string; label: string }>;
  onPick: (id: string) => void;
}) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {props.title}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
        {props.options.map((o) => (
          <Chip
            key={o.id}
            label={o.label}
            onClick={() => props.onPick(o.id)}
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
}

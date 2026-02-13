export type TopChoiceId = "watch" | "dinner" | "game" | "chat";

export type DinnerMode = "food+movie" | "food+series" | "food+talk";

export interface OptionItem {
  id: string;
  label: string;
  emoji?: string;
}

export const TOP_CHOICES: {
  id: TopChoiceId;
  title: string;
  subtitle: string;
}[] = [
  {
    id: "watch",
    title: "Watch something together 🎬",
    subtitle: "Movie or series — cozy vibes",
  },
  { id: "dinner", title: "Romantic dinner 🍽️", subtitle: "Food + a cute plan" },
  {
    id: "game",
    title: "Play a game 🎮",
    subtitle: "Fun, playful, competitive",
  },
  {
    id: "chat",
    title: "Chatting time 💌",
    subtitle: "Romantic talk & conversation games",
  },
];

export const WATCH_OPTIONS: OptionItem[] = [
  { id: "movie_1", label: "Movie 1" },
  { id: "movie_2", label: "Movie 2" },
  { id: "series_1", label: "Series 1" },
  { id: "series_2", label: "Series 2" },
];

export const GAME_OPTIONS: OptionItem[] = [
  { id: "game_1", label: "Game 1" },
  { id: "game_2", label: "Game 2" },
  { id: "quiz", label: "Couple Quiz" },
  { id: "truth_dare", label: "Truth or Dare" },
];

export const DINNER_MODES: { id: DinnerMode; label: string }[] = [
  { id: "food+movie", label: "Food + Movie 🎬" },
  { id: "food+series", label: "Food + Series 📺" },
  { id: "food+talk", label: "Food + Talk 💌" },
];

export const FOOD_OPTIONS: OptionItem[] = [
  { id: "pizza", label: "Pizza 🍕" },
  { id: "pasta", label: "Pasta 🍝" },
  { id: "biryani", label: "Biryani 🍛" },
  { id: "dessert", label: "Dessert 🍰" },
];

export const CHAT_GAMES: OptionItem[] = [
  { id: "36_questions", label: "36 Questions (love edition) 💞" },
  { id: "this_or_that", label: "This or That 💭" },
  { id: "memory_lane", label: "Memory Lane (best moments) 📸" },
  { id: "compliment_game", label: "3 Things I Love About You 🥰" },
];

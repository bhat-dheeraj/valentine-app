import {
  ValentinePathState,
  TimelineItem,
  CategoryId,
} from "@/types/valentine";
import confetti from "canvas-confetti";

export const initialValentineState: ValentinePathState = {
  timeline: [],
  dinner: { selected: false, moodId: null, foodIds: [] },
};

export function computeNumbers(state: ValentinePathState) {
  let n = 1;

  const pickNumber = new Map<string, number>(); // instanceId -> number
  let dinnerNumber: number | null = null;

  for (const item of state.timeline) {
    if (item.type === "dinner") {
      dinnerNumber = n++;
    } else {
      pickNumber.set(item.instanceId, n++);
    }
  }

  return { pickNumber, dinnerNumber };
}

export function addPick(
  state: ValentinePathState,
  category: Exclude<CategoryId, "dinner">,
  optionId: string,
  instanceId: string,
): ValentinePathState {
  return {
    ...state,
    timeline: [
      ...state.timeline,
      { type: "pick", instanceId, value: { category, optionId } },
    ],
  };
}

export function ensureDinnerSelected(
  state: ValentinePathState,
): ValentinePathState {
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

export function deselectDinner(state: ValentinePathState): ValentinePathState {
  if (!state.dinner.selected) return state;

  return {
    ...state,
    dinner: { selected: false, moodId: null, foodIds: [] },
    timeline: state.timeline.filter((t) => t.type !== "dinner"),
  };
}

export function setDinnerMood(
  state: ValentinePathState,
  moodId: string,
): ValentinePathState {
  const withDinner = ensureDinnerSelected(state);
  return { ...withDinner, dinner: { ...withDinner.dinner, moodId } };
}

export function toggleDinnerFood(
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

/** ✅ Remove a specific numbered item (by instanceId) */
export function removeTimelineItem(
  state: ValentinePathState,
  instanceId: string,
): ValentinePathState {
  const item = state.timeline.find((t) => t.instanceId === instanceId);
  if (!item) return state;

  // If removing dinner slot, also clear dinner state
  if (item.type === "dinner") {
    return deselectDinner(state);
  }

  return {
    ...state,
    timeline: state.timeline.filter((t) => t.instanceId !== instanceId),
  };
}

/** ✅ Reorder timeline items (for drag/drop later) */
export function reorderTimeline(
  state: ValentinePathState,
  newOrder: string[],
): ValentinePathState {
  const map = new Map(state.timeline.map((t) => [t.instanceId, t] as const));
  const reordered: TimelineItem[] = newOrder
    .map((id) => map.get(id))
    .filter(Boolean) as TimelineItem[];

  return { ...state, timeline: reordered };
}

export const heart = confetti.shapeFromText({ text: "💖", scalar: 2 });
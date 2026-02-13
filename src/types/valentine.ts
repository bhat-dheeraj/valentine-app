export type CategoryId = "watch" | "game" | "dinner" | "chat";

export interface PickedOption {
  category: Exclude<CategoryId, "dinner">; // watch/game/chat
  optionId: string;
}

export interface DinnerState {
  selected: boolean;
  moodId: string | null;
  foodIds: string[];
}

export interface TimelinePickItem {
  type: "pick";
  instanceId: string; // unique per click
  value: PickedOption;
}

export interface TimelineDinnerItem {
  type: "dinner";
  instanceId: string; // unique for dinner slot
}

export type TimelineItem = TimelinePickItem | TimelineDinnerItem;

export interface ValentinePathState {
  timeline: TimelineItem[];
  dinner: DinnerState;
}

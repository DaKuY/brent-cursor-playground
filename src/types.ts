export interface ChoiceOption {
  id: string;
  label: string;
  emoji: string;
  kidReply: string;
}

export interface TutorialStepData {
  id: number;
  title: string;
  kidLine: string;
  cursorFeature: string;
  graphic: "buddy" | "powers" | "mission";
  choices: ChoiceOption[];
  /** step 3 uses choiceGroups instead of flat choices */
  choiceGroups?: {
    key: keyof PlayerChoices;
    prompt: string;
    options: ChoiceOption[];
  }[];
}

export interface PlayerChoices {
  whatIsCursor: string;
  superpower: string;
  pizza: string;
  drone: string;
  minecraft: string;
}

export const EMPTY_CHOICES: PlayerChoices = {
  whatIsCursor: "",
  superpower: "",
  pizza: "",
  drone: "",
  minecraft: "",
};

export const STORAGE_KEY = "brent-cursor-playground-v2";

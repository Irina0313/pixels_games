export const GAME_TITLE = "Pixel Pairs";
export const GAME_SUBTITLE = "Open two cards. Find all matching pairs.";

export const GAME_RULES = [
  "Open two cards.",
  "If the images match, the pair stays open.",
  "If they don't match, the cards flip back.",
  "Find all pairs with fewer moves and better time.",
];

export const MODES = {
  quick: {
    label: "Quick Mode",
    description: "8 people / 16\ncards",
    peopleCount: 8,
  },
  full: {
    label: "Full Team",
    description: "16 people / 32\ncards",
    peopleCount: 16,
  },
} as const;

export const ASSETS = {
  cardBack: "/assets/card-back.svg",
  cardFront: "/assets/card-front.svg",
  boardBg: "/assets/board-bg.svg",
  personBase: "/assets/team/person-",
};

export const STORAGE_KEYS = {
  quick: "pixelPairs_quickRecords",
  full: "pixelPairs_fullRecords",
};

export const MISMATCH_DELAY_MS = 700;
export const MAX_RECORDS = 5;

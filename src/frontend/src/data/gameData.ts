export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  source: "harry-potter" | "vampire-diaries";
  difficulty: "hard" | "expert";
}

export const ALL_QUESTIONS: Question[] = [
  // ── HARRY POTTER (20 questions) ──────────────────────────
  {
    id: 1,
    question:
      "In the graveyard scene in Goblet of Fire, what was the ORDER in which Priori Incantatem ghosts emerged from Voldemort's wand?",
    options: [
      "Cedric, Frank Bryce, Bertha Jorkins, Lily, James",
      "Lily, James, Bertha Jorkins, Frank Bryce, Cedric",
      "Frank Bryce, Cedric, Lily, James, Bertha Jorkins",
      "Bertha Jorkins, Frank Bryce, Cedric, James, Lily",
    ],
    correctAnswer: "Cedric, Frank Bryce, Bertha Jorkins, Lily, James",
    source: "harry-potter",
    difficulty: "expert",
  },
  {
    id: 2,
    question:
      "What spell did Gilderoy Lockhart accidentally use on himself during the dueling club in Chamber of Secrets?",
    options: ["Obliviate", "Expelliarmus", "Stupefy", "Confundus"],
    correctAnswer: "Obliviate",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 3,
    question:
      "Which Hogwarts founder's locket was turned into a Horcrux by Voldemort?",
    options: [
      "Salazar Slytherin",
      "Helga Hufflepuff",
      "Rowena Ravenclaw",
      "Godric Gryffindor",
    ],
    correctAnswer: "Salazar Slytherin",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 4,
    question:
      "In Deathly Hallows, what was the name of the street where Harry, Ron and Hermione were caught by Snatchers after leaving the café?",
    options: [
      "Shaftesbury Avenue / Tottenham Court Road",
      "Knockturn Alley",
      "Diagon Alley",
      "Grimmauld Place",
    ],
    correctAnswer: "Shaftesbury Avenue / Tottenham Court Road",
    source: "harry-potter",
    difficulty: "expert",
  },
  {
    id: 5,
    question:
      "What defensive spell is specifically effective against Dementors?",
    options: ["Expecto Patronum", "Riddikulus", "Protego", "Expelliarmus"],
    correctAnswer: "Expecto Patronum",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 6,
    question: "Who was the Half-Blood Prince?",
    options: [
      "Severus Snape",
      "Tom Riddle",
      "Albus Dumbledore",
      "Sirius Black",
    ],
    correctAnswer: "Severus Snape",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 7,
    question: "What are ALL of Albus Dumbledore's full given names?",
    options: [
      "Albus Percival Wulfric Brian",
      "Albus Severus Percival Brian",
      "Albus Wulfric Percival Godric",
      "Albus Brian Percival James",
    ],
    correctAnswer: "Albus Percival Wulfric Brian",
    source: "harry-potter",
    difficulty: "expert",
  },
  {
    id: 8,
    question:
      "Approximately when was Hogwarts School of Witchcraft and Wizardry founded?",
    options: [
      "Around 990 AD",
      "Around 1066 AD",
      "Around 800 AD",
      "Around 1200 AD",
    ],
    correctAnswer: "Around 990 AD",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 9,
    question:
      "What is the maximum acceleration speed of the Firebolt broomstick?",
    options: [
      "150 mph in 10 seconds",
      "200 mph in 15 seconds",
      "120 mph in 8 seconds",
      "175 mph in 12 seconds",
    ],
    correctAnswer: "150 mph in 10 seconds",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 10,
    question:
      "What 'lucky' potion did Harry use to win Professor Slughorn's trust in Half-Blood Prince?",
    options: ["Felix Felicis", "Veritaserum", "Polyjuice Potion", "Amortentia"],
    correctAnswer: "Felix Felicis",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 11,
    question:
      "What is the name of the magical document that shows the location of every person inside Hogwarts in real time?",
    options: [
      "The Marauder's Map",
      "The Daily Prophet",
      "The Sorting Scroll",
      "The Hogwarts Register",
    ],
    correctAnswer: "The Marauder's Map",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 12,
    question:
      "Match the four Marauders to their correct Animagus/werewolf nicknames: James, Sirius, Remus, Peter.",
    options: [
      "James=Prongs, Sirius=Padfoot, Remus=Moony, Peter=Wormtail",
      "James=Padfoot, Sirius=Prongs, Remus=Wormtail, Peter=Moony",
      "James=Moony, Sirius=Prongs, Remus=Padfoot, Peter=Wormtail",
      "James=Prongs, Sirius=Moony, Remus=Wormtail, Peter=Padfoot",
    ],
    correctAnswer: "James=Prongs, Sirius=Padfoot, Remus=Moony, Peter=Wormtail",
    source: "harry-potter",
    difficulty: "expert",
  },
  {
    id: 13,
    question: "What animal form does Severus Snape's Patronus take?",
    options: ["A doe", "A stag", "A silver wolf", "A raven"],
    correctAnswer: "A doe",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 14,
    question:
      "What powerful magical object was hidden inside the Mirror of Erised in Philosopher's Stone?",
    options: [
      "The Philosopher's Stone",
      "The Elder Wand",
      "The Sorting Hat",
      "The Resurrection Stone",
    ],
    correctAnswer: "The Philosopher's Stone",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 15,
    question:
      "What is the magical core inside Harry Potter's wand, and whose phoenix provided it?",
    options: [
      "Phoenix feather from Fawkes (Dumbledore's phoenix)",
      "Dragon heartstring from a Hungarian Horntail",
      "Unicorn tail hair from the Forbidden Forest",
      "Phoenix feather from a wild phoenix",
    ],
    correctAnswer: "Phoenix feather from Fawkes (Dumbledore's phoenix)",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 16,
    question:
      "In what numbered vault at Gringotts Bank was the Philosopher's Stone originally kept?",
    options: ["Vault 713", "Vault 687", "Vault 1", "Vault 999"],
    correctAnswer: "Vault 713",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 17,
    question: "What is the exact canonical birth date of Harry James Potter?",
    options: [
      "July 31, 1980",
      "October 31, 1981",
      "July 31, 1979",
      "September 1, 1980",
    ],
    correctAnswer: "July 31, 1980",
    source: "harry-potter",
    difficulty: "hard",
  },
  {
    id: 18,
    question:
      "How many staircases does Hogwarts Castle contain according to the books?",
    options: ["142", "128", "176", "200"],
    correctAnswer: "142",
    source: "harry-potter",
    difficulty: "expert",
  },
  {
    id: 19,
    question:
      "What is the origin of the twin-core connection between Harry's and Voldemort's wands (Priori Incantatem)?",
    options: [
      "Both wands have a feather from Fawkes the phoenix",
      "Both wands were made from the same Elder tree",
      "Both wands contain a hair from Merlin",
      "Both wands were crafted by the same goblin",
    ],
    correctAnswer: "Both wands have a feather from Fawkes the phoenix",
    source: "harry-potter",
    difficulty: "expert",
  },
  {
    id: 20,
    question:
      "What was the name of Kai Parker's prison world year in which he was trapped?",
    options: ["1994", "1990", "2001", "1987"],
    correctAnswer: "1994",
    source: "harry-potter",
    difficulty: "expert",
  },
  // ── VAMPIRE DIARIES (20 questions) ──────────────────────────
  {
    id: 21,
    question:
      "Approximately how many times did Tyler Lockwood have to break every bone in his body to break Klaus's sire bond?",
    options: ["100+ times", "10 times", "50 times", "7 times"],
    correctAnswer: "100+ times",
    source: "vampire-diaries",
    difficulty: "expert",
  },
  {
    id: 22,
    question: "What doppelganger lineage does Elena Gilbert belong to?",
    options: [
      "Katerina Petrova / Tatia / Silas's doppelganger line",
      "Klaus's bloodline through Esther",
      "An Original doppelganger from 1000 AD",
      "A Bennett witch bloodline",
    ],
    correctAnswer: "Katerina Petrova / Tatia / Silas's doppelganger line",
    source: "vampire-diaries",
    difficulty: "expert",
  },
  {
    id: 23,
    question:
      "What is the name of the powerful witch who originally imprisoned Silas?",
    options: ["Qetsiyah", "Bonnie Bennett", "Esther Mikaelson", "Mary Louise"],
    correctAnswer: "Qetsiyah",
    source: "vampire-diaries",
    difficulty: "hard",
  },
  {
    id: 24,
    question:
      "Who created the Original vampires, and what key ingredient did she use?",
    options: [
      "Esther Mikaelson using a spell with white oak ash",
      "Qetsiyah using her own blood",
      "Silas using a dark grimoire",
      "Klaus using moonstone magic",
    ],
    correctAnswer: "Esther Mikaelson using a spell with white oak ash",
    source: "vampire-diaries",
    difficulty: "hard",
  },
  {
    id: 25,
    question:
      "What is the actual first name of the Originals' vampire-hunting father?",
    options: ["Mikael", "Henrik", "Elijah", "Kol"],
    correctAnswer: "Mikael",
    source: "vampire-diaries",
    difficulty: "hard",
  },
  {
    id: 26,
    question:
      "What species was Silas BEFORE he was turned into a supernatural creature?",
    options: [
      "A powerful warlock/witch",
      "A werewolf",
      "A human hunter",
      "A Traveler",
    ],
    correctAnswer: "A powerful warlock/witch",
    source: "vampire-diaries",
    difficulty: "expert",
  },
  {
    id: 27,
    question:
      "What is the name of the only known cure for vampirism in TVD, and how old is its origin?",
    options: [
      "The Cure — it existed since Silas and Qetsiyah's time",
      "The Elixir — created by Klaus",
      "The Antidote — invented by Bonnie Bennett",
      "The Vervain Serum — from the original Salem witches",
    ],
    correctAnswer: "The Cure — it existed since Silas and Qetsiyah's time",
    source: "vampire-diaries",
    difficulty: "expert",
  },
  {
    id: 28,
    question:
      "Which specific moonstone was used in the ritual to break the Sun and Moon curse?",
    options: [
      "The moonstone from the Lockwood cellar",
      "The moonstone from the Original Witch's tomb",
      "Klaus's personal moonstone",
      "The moonstone embedded in Esther's grimoire",
    ],
    correctAnswer: "The moonstone from the Lockwood cellar",
    source: "vampire-diaries",
    difficulty: "hard",
  },
  {
    id: 29,
    question:
      "Who became the living anchor for the Other Side (the supernatural purgatory) after Qetsiyah's death?",
    options: ["Bonnie Bennett", "Elena Gilbert", "Rebekah Mikaelson", "Amara"],
    correctAnswer: "Bonnie Bennett",
    source: "vampire-diaries",
    difficulty: "hard",
  },
  {
    id: 30,
    question: "What is the real name of Klaus's biological werewolf father?",
    options: ["Ansel", "Mikael", "Henrik", "Elijah"],
    correctAnswer: "Ansel",
    source: "vampire-diaries",
    difficulty: "expert",
  },
  {
    id: 31,
    question:
      "In what year was the fictional town of Mystic Falls, Virginia founded?",
    options: ["1860", "1780", "1920", "1690"],
    correctAnswer: "1860",
    source: "vampire-diaries",
    difficulty: "hard",
  },
  {
    id: 32,
    question:
      "What is Bonnie Bennett's full legal name as revealed in the series?",
    options: [
      "Bonnie Sheila Bennett",
      "Bonnie Marie Bennett",
      "Bonnie Grace Bennett",
      "Bonnie Elena Bennett",
    ],
    correctAnswer: "Bonnie Sheila Bennett",
    source: "vampire-diaries",
    difficulty: "hard",
  },
  {
    id: 33,
    question:
      "Which Salvatore brother was technically turned into a vampire first?",
    options: [
      "Both were turned at virtually the same time by Katherine",
      "Stefan was turned first by Katherine",
      "Damon turned himself first",
      "Stefan turned Damon against his will",
    ],
    correctAnswer: "Both were turned at virtually the same time by Katherine",
    source: "vampire-diaries",
    difficulty: "expert",
  },
  {
    id: 34,
    question: "What herb is used in TVD to repel, weaken, and poison vampires?",
    options: ["Vervain", "Wolfsbane", "Nightshade", "Belladonna"],
    correctAnswer: "Vervain",
    source: "vampire-diaries",
    difficulty: "hard",
  },
  {
    id: 35,
    question:
      "What was Katherine Pierce's real birth name before she fled Bulgaria in 1490?",
    options: [
      "Katerina Petrova",
      "Elena Petrova",
      "Katarina Vladescu",
      "Katja Petrov",
    ],
    correctAnswer: "Katerina Petrova",
    source: "vampire-diaries",
    difficulty: "hard",
  },
  {
    id: 36,
    question:
      "Who was Alaric Saltzman's first wife, before she became a vampire?",
    options: [
      "Isobel Flemming",
      "Jenna Sommers",
      "Jo Laughlin",
      "Caroline Forbes",
    ],
    correctAnswer: "Isobel Flemming",
    source: "vampire-diaries",
    difficulty: "hard",
  },
  {
    id: 37,
    question:
      "In what era was Stefan Salvatore known by the fearsome name 'The Ripper of Monterey'?",
    options: ["The 1920s", "The 1860s", "The 1950s", "The 1980s"],
    correctAnswer: "The 1920s",
    source: "vampire-diaries",
    difficulty: "expert",
  },
  {
    id: 38,
    question: "Who turned Caroline Forbes into a vampire?",
    options: [
      "Katherine Pierce (who fed Caroline Damon's blood then smothered her)",
      "Damon Salvatore bit her directly",
      "Klaus turned her as a hybrid",
      "Stefan gave her his blood willingly",
    ],
    correctAnswer:
      "Katherine Pierce (who fed Caroline Damon's blood then smothered her)",
    source: "vampire-diaries",
    difficulty: "expert",
  },
  {
    id: 39,
    question: "What was the year of Kai Parker's Gemini Coven prison world?",
    options: ["1994", "1990", "2001", "1987"],
    correctAnswer: "1994",
    source: "vampire-diaries",
    difficulty: "hard",
  },
  {
    id: 40,
    question:
      "What unique supernatural consequence occurred when Klaus broke the Sun and Moon curse that no one anticipated?",
    options: [
      "He triggered his werewolf side and became the first hybrid",
      "He became mortal for 24 hours",
      "He lost the ability to compel people",
      "He was bound to Elena forever",
    ],
    correctAnswer: "He triggered his werewolf side and became the first hybrid",
    source: "vampire-diaries",
    difficulty: "expert",
  },
];

export interface Reward {
  level: number;
  name: string;
  description: string;
  image: string;
  source: "harry-potter" | "vampire-diaries";
  emoji: string;
}

export const REWARDS: Reward[] = [
  {
    level: 2,
    name: "Hermione's Time-Turner",
    description:
      "A golden hourglass that controls the very fabric of time itself.",
    image: "/assets/generated/reward-timeturner-transparent.dim_200x200.png",
    source: "harry-potter",
    emoji: "⏳",
  },
  {
    level: 3,
    name: "Elena's Daylight Ring",
    description:
      "A lapis lazuli ring forged by a witch to protect vampires from sunlight.",
    image: "/assets/generated/reward-daylight-ring-transparent.dim_200x200.png",
    source: "vampire-diaries",
    emoji: "💍",
  },
  {
    level: 4,
    name: "The Elder Wand",
    description:
      "The most powerful wand ever created, one of the three Deathly Hallows.",
    image: "/assets/generated/reward-elder-wand-transparent.dim_200x200.png",
    source: "harry-potter",
    emoji: "🪄",
  },
  {
    level: 5,
    name: "Bonnie's Grimoire",
    description:
      "A powerful spell book passed through generations of Bennett witches.",
    image: "/assets/generated/reward-grimoire-transparent.dim_200x200.png",
    source: "vampire-diaries",
    emoji: "📖",
  },
  {
    level: 6,
    name: "Sword of Gryffindor",
    description:
      "A goblin-made silver sword that absorbs that which strengthens it.",
    image:
      "/assets/generated/reward-gryffindor-sword-transparent.dim_200x200.png",
    source: "harry-potter",
    emoji: "⚔️",
  },
  {
    level: 7,
    name: "Klaus's Hybrid Ring",
    description:
      "A ring worn by the Original Hybrid, channeling untold supernatural power.",
    image: "/assets/generated/reward-hybrid-ring-transparent.dim_200x200.png",
    source: "vampire-diaries",
    emoji: "🐺",
  },
  {
    level: 8,
    name: "The Marauder's Map",
    description:
      "I solemnly swear that I am up to no good. A map of all of Hogwarts.",
    image: "/assets/generated/reward-marauders-map-transparent.dim_200x200.png",
    source: "harry-potter",
    emoji: "🗺️",
  },
];

export const PHILOSOPHER_STONE_REWARD: Reward = {
  level: 9,
  name: "The Philosopher's Stone",
  description:
    "The legendary stone that grants immortality and turns any metal to gold.",
  image:
    "/assets/generated/reward-philosophers-stone-transparent.dim_200x200.png",
  source: "harry-potter",
  emoji: "💎",
};

export const LEVEL_THRESHOLDS = [0, 0, 300, 700, 1200, 1800, 2500, 3300, 4200];

export function getLevelFromXP(xp: number): number {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 1; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i;
      break;
    }
  }
  return level;
}

export function getXPForNextLevel(level: number): number {
  if (level >= LEVEL_THRESHOLDS.length - 1)
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  return LEVEL_THRESHOLDS[level + 1];
}

export function getLevelProgress(xp: number): number {
  const level = getLevelFromXP(xp);
  const current = LEVEL_THRESHOLDS[level] ?? 0;
  const next = getXPForNextLevel(level);
  if (next <= current) return 100;
  return Math.round(((xp - current) / (next - current)) * 100);
}

export function getRewardForLevel(level: number): Reward | null {
  if (level >= 9) return PHILOSOPHER_STONE_REWARD;
  return REWARDS.find((r) => r.level === level) ?? null;
}

export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

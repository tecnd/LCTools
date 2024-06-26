import type { Picture } from "vite-imagetools";

export const categories = [
  "Fires",
  "Maneuver",
  "Interception",
  "Info Ops",
  "C5ISR",
] as const;
export type Category = (typeof categories)[number];
export function isCategory(t: unknown): t is Category {
  if (typeof t === "string") {
    return (categories as readonly string[]).includes(t);
  }
  return false;
}

export const tags = {
  Attach: "This card is attached to a unit during deployment.",
  Aviation: "This card is an aircraft and can be FTR NULLIFIED.",
  Ballistic:
    "Ballistic missiles can only be intercepted by units with ballistic missile defense.",
  "Cyber & EMS":
    "If a cyber or EMS card is successfully utilized, add one cube to the opponent's Tactical Network card unless it removed cubes from your own Tactical Network or nullified another cyber or EMS card.",
  Fighter: "This card is capable of FTR NULLIFYING enemy aviation.",
  Hypersonic: "Hypersonic weapons are difficult to intercept.",
  LRS: "This card can attack enemy units using LRS.",
  Reveal: "This card can reveal hidden enemy units.",
} as const satisfies Record<string, string>;
export type Tag = keyof typeof tags;
export function isTag(t: unknown): t is Tag {
  if (typeof t === "string") {
    return Object.keys(tags).includes(t);
  }
  return false;
}

interface Card {
  faction: "USMC" | "PLAN";
  name: string;
  image: Picture;
  cost: number;
  category: Category;
  availability: number;
  cardText: string;
  tags?: Tag[];
  notes?: string;
}

const images = import.meta.glob<Picture>("/src/lib/images/*.jpg", {
  query: { enhanced: true },
  import: "default",
  eager: true,
});

const imageMap: Record<string, Picture> = {};
for (const [key, value] of Object.entries(images)) {
  const match = key.match(/LCC (USMC|PLAN) (\d+)/);
  if (!match || !match[1] || !match[2]) {
    throw Error(`Failed to parse image ${key}`);
  }
  imageMap[`${match[1]} ${match[2]}`] = value;
}

export const cards: Card[] = [
  {
    faction: "PLAN",
    name: "Tactical Network",
    image: imageMap["PLAN 01"],
    cost: 0,
    availability: 1,
    category: "C5ISR",
    cardText: `This affects all friendly LRS and INTERCEPT values (including JCCs) for the PRC team. For every successful enemy cyber or EMS JCC, add 1 blue cube to this card.
No Effect: 0-1 cubes.
Minor Effect: 2-3, reduce by 4.
Major Effect: 4+, reduce by 7.
Any player may spend 2 APs on their turn to remove one cube.`,
  },
  {
    faction: "PLAN",
    name: "Combat Air Patrols",
    image: imageMap["PLAN 02"],
    cost: 3,
    availability: 2,
    category: "Interception",
    cardText: `Once per turn, choose one and roll 1 die. All options succeed on 1-12:
A) FTR NULLIFY 1 or 2 enemy aviation JCCs (but not enemy tactical UAS);
B) Reduce all enemy attacks against 1 friendly aviation JCC by 7;
C) Reveal all units in one naval hex, then roll 2 dice to attack. LRS: 1-12.`,
    tags: ["Aviation", "Fighter", "LRS", "Reveal"],
  },
  {
    faction: "PLAN",
    name: "Maritime Militia",
    image: imageMap["PLAN 03"],
    cost: 1,
    availability: 2,
    category: "C5ISR",
    cardText:
      "Roll 4 dice. For each 1-11 rolled, reveal one enemy naval unit anywhere on the map.",
    tags: ["Reveal"],
  },
  {
    faction: "PLAN",
    name: "DF-10A: Long Sword",
    image: imageMap["PLAN 04"],
    cost: 3,
    availability: 1,
    category: "Fires",
    cardText:
      "Increase host unit's HP by 2. Using an orange cube, indicate a supply of 4 on Unit Tracker. For every LRS attempt, reduce supply by one. LRS. 1-14. Range: 25.",
    tags: ["Attach", "LRS"],
  },
  {
    faction: "PLAN",
    name: "DF-21D: Ballistic",
    image: imageMap["PLAN 05"],
    cost: 4,
    availability: 2,
    category: "Fires",
    cardText:
      "Roll 4 dice to attack up to 2 adjacent hexes on the map or in the opposing 700 km naval zone. LRS: 1-16.",
    tags: ["Ballistic", "LRS"],
  },
];

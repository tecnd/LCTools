import type { Picture } from "vite-imagetools";

interface Card {
  name: string;
  image: Picture;
  cost: number;
  tags?: (keyof typeof tags)[];
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

const tags = {
  "Attach": "This card is attached to a unit during deployment.",
  "Ballistic": "Ballistic missiles can only be intercepted by units with ballistic missile defense.",
  "Cyber & EMS": "If a cyber or EMS card is successfully utilized, add one cube to the opponent's Tactical Network card unless it removed cubes from your own Tactical Network or nullified another cyber or EMS card.",
  "Hypersonic": "Hypersonic weapons are difficult to intercept."
} satisfies Record<string, string>;

const cards: Card[] = [
  {
    name: "Tactical Network",
    image: imageMap["PLAN 01"],
    cost: 0
  },
  {
    name: "Combat Air Patrols",
    image: imageMap["PLAN 02"],
    cost: 3
  },
  {
    name: "Maritime Militia",
    image: imageMap["PLAN 03"],
    cost: 1,
    tags: ["Attach", "Ballistic"]
  },
  {
    name: "Patriot",
    cost: 4,
    image: imageMap["USMC 88"],
  },
];

export default cards;

import type { Picture } from "vite-imagetools";

interface Card {
  name: string;
  image: Picture;
  tags?: string[];
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

const cards: Card[] = [
  {
    name: "Tactical Network",
    image: imageMap["PLAN 01"]
  },
  {
    name: "Combat Air Patrols",
    image: imageMap["PLAN 02"]
  },
  {
    name: "Maritime Militia",
    image: imageMap["PLAN 03"],
    tags: ["plane", "cyber", "everything else"]
  },
  {
    name: "Patriot",
    image: imageMap["USMC 88"],
  },
];

export default cards;

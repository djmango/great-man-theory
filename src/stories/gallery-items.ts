import { alexanderStories } from "./alexander";
import { caesarStories } from "./caesar";
import { cleopatraStories } from "./cleopatra";
import { napoleonStories } from "./napoleon";
import { lincolnStories } from "./lincoln";
import { oppenheimerStories } from "./oppenheimer";
import { leonardoStories } from "./leonardo";
import { galileoStories } from "./galileo";
import { beethovenStories } from "./beethoven";
import { turingStories } from "./turing";
import { jobsStories } from "./jobs";
import { gatesStories } from "./gates";
import { bezosStories } from "./bezos";
import { huangStories } from "./huang";
import { muskStories } from "./musk";
import { pageStories } from "./page";
import { zuckerbergStories } from "./zuckerberg";
import { altmanStories } from "./altman";

export type GalleryItem = {
  figure: string;
  slug: string;
  title: string;
  image: string;
  tags: string[];
};

const MODULES: Array<[string, Record<string, { title: string; body: string; image: string; tags: string[] }>]> = [
  ["Alexander", alexanderStories],
  ["Caesar", caesarStories],
  ["Cleopatra", cleopatraStories],
  ["Napoleon", napoleonStories],
  ["Lincoln", lincolnStories],
  ["Oppenheimer", oppenheimerStories],
  ["Leonardo", leonardoStories],
  ["Galileo", galileoStories],
  ["Beethoven", beethovenStories],
  ["Turing", turingStories],
  ["Jobs", jobsStories],
  ["Gates", gatesStories],
  ["Bezos", bezosStories],
  ["Huang", huangStories],
  ["Musk", muskStories],
  ["Page", pageStories],
  ["Zuckerberg", zuckerbergStories],
  ["Altman", altmanStories],
];

export function storyGalleryItems(): GalleryItem[] {
  const items: GalleryItem[] = [];
  const seen = new Set<string>();

  for (const [figure, stories] of MODULES) {
    for (const story of Object.values(stories)) {
      if (seen.has(story.image)) continue;
      seen.add(story.image);
      const slug = story.image.replace(/^images\/story\//, "").replace(/\.webp$/, "");
      items.push({
        figure,
        slug,
        title: story.title,
        image: story.image,
        tags: story.tags,
      });
    }
  }

  return items.sort((a, b) => a.figure.localeCompare(b.figure) || a.slug.localeCompare(b.slug));
}

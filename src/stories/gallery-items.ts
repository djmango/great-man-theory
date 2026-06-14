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
import { teslaStories } from "./tesla";
import { wattStories } from "./watt";
import { carnegieStories } from "./carnegie";
import { rockefellerStories } from "./rockefeller";
import { benzStories } from "./benz";
import { edisonStories } from "./edison";
import { bellStories } from "./bell";
import { fordStories } from "./ford";
import { porscheStories } from "./porsche";
import { marconiStories } from "./marconi";
import { wrightStories } from "./wright";
import { ferrariStories } from "./ferrari";
import { disneyStories } from "./disney";

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
  ["Tesla", teslaStories],
  ["Watt", wattStories],
  ["Carnegie", carnegieStories],
  ["Rockefeller", rockefellerStories],
  ["Benz", benzStories],
  ["Edison", edisonStories],
  ["Bell", bellStories],
  ["Ford", fordStories],
  ["Porsche", porscheStories],
  ["Marconi", marconiStories],
  ["Wright", wrightStories],
  ["Ferrari", ferrariStories],
  ["Disney", disneyStories],
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

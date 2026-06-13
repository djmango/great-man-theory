/**
 * Export story scene slugs + image prompts from story modules.
 * Usage: bun scripts/story-image-manifest.ts [--missing] [--slug name]
 */
import { alexanderStories } from "../src/stories/alexander";
import { caesarStories } from "../src/stories/caesar";
import { cleopatraStories } from "../src/stories/cleopatra";
import { napoleonStories } from "../src/stories/napoleon";
import { lincolnStories } from "../src/stories/lincoln";
import { oppenheimerStories } from "../src/stories/oppenheimer";
import { leonardoStories } from "../src/stories/leonardo";
import { galileoStories } from "../src/stories/galileo";
import { beethovenStories } from "../src/stories/beethoven";
import { turingStories } from "../src/stories/turing";
import { jobsStories } from "../src/stories/jobs";
import { buildScenePrompt } from "./story-scene-visuals";
import { existsSync } from "node:fs";
import { join } from "node:path";

const modules = [
  ["alexander", alexanderStories],
  ["caesar", caesarStories],
  ["cleopatra", cleopatraStories],
  ["napoleon", napoleonStories],
  ["lincoln", lincolnStories],
  ["oppenheimer", oppenheimerStories],
  ["leonardo", leonardoStories],
  ["galileo", galileoStories],
  ["beethoven", beethovenStories],
  ["turing", turingStories],
  ["jobs", jobsStories],
] as const;

type Scene = {
  slug: string;
  figure: string;
  title: string;
  prompt: string;
  webp: string;
  source: string;
  missing: boolean;
};

const root = join(import.meta.dir, "..");
const storyDir = join(root, "images/story");
const assetsDir =
  process.env.STORY_ASSETS_DIR ??
  join(process.env.HOME ?? "", ".cursor/projects/Users-djmango-github-great-man-theory/assets");
const scenes: Scene[] = [];
const seen = new Set<string>();
const slugFilter = (() => {
  const i = process.argv.indexOf("--slug");
  return i >= 0 ? process.argv[i + 1] : null;
})();

for (const [figure, stories] of modules) {
  for (const story of Object.values(stories)) {
    const webp = story.image.replace(/^images\/story\//, "");
    const slug = webp.replace(/\.webp$/, "");
    if (seen.has(slug)) continue;
    seen.add(slug);
    if (slugFilter && slug !== slugFilter) continue;
    const source = `${slug}-scene.png`;
    scenes.push({
      slug,
      figure,
      title: story.title,
      prompt: buildScenePrompt(slug, story.title),
      webp,
      source,
      missing: !existsSync(join(storyDir, webp)),
    });
  }
}

scenes.sort((a, b) => a.slug.localeCompare(b.slug));

const missingOnly = process.argv.includes("--missing");
const out = missingOnly ? scenes.filter(s => s.missing) : scenes;

console.log(JSON.stringify(out, null, 2));
console.error(`${out.length} scene(s)${missingOnly ? " missing webp" : ""}${slugFilter ? ` slug=${slugFilter}` : ""}`);

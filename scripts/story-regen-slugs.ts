/**
 * Selective story scene regen helpers.
 * Usage:
 *   bun scripts/story-regen-slugs.ts queue          # slugs in regenerate-queue.txt
 *   bun scripts/story-regen-slugs.ts regen           # slugs to regenerate (filtered)
 *   bun scripts/story-regen-slugs.ts write-regen     # update regenerate-queue.txt
 *   bun scripts/story-regen-slugs.ts prompts        # JSON prompts for queued slugs
 *   bun scripts/story-regen-slugs.ts prompts jobs-born
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  SCENE_BEATS,
  beatMentionsFigure,
  figureNameFromSlug,
  buildScenePrompt,
} from "./story-scene-visuals";
import { gatesStories } from "../src/stories/gates";
import { bezosStories } from "../src/stories/bezos";
import { huangStories } from "../src/stories/huang";
import { muskStories } from "../src/stories/musk";
import { pageStories } from "../src/stories/page";
import { zuckerbergStories } from "../src/stories/zuckerberg";
import { altmanStories } from "../src/stories/altman";
import { jobsStories } from "../src/stories/jobs";

const root = join(import.meta.dir, "..");
const queuePath = join(root, "images/story/regenerate-queue.txt");
const FOUNDERS = new Set(["gates", "bezos", "huang", "musk", "page", "zuckerberg", "altman", "jobs"]);

/** No recognizable figure required — skip regen even if beat is anonymous. */
const SCENE_NO_FIGURE = new Set([
  "jobs-apple-ii",
  "gates-windows",
  "gates-win95",
  "bezos-first-book",
  "bezos-ipo",
  "bezos-aws",
  "bezos-whole-foods",
  "huang-cuda",
  "huang-deep-learning",
  "musk-dragon",
  "musk-landing",
  "musk-spacex-ipo",
  "page-ipo",
  "zuckerberg-newsfeed",
  "zuckerberg-ipo",
  "altman-chatgpt",
]);

const storyModules = [
  gatesStories,
  bezosStories,
  huangStories,
  muskStories,
  pageStories,
  zuckerbergStories,
  altmanStories,
  jobsStories,
];

function titleForSlug(slug: string): string {
  for (const mod of storyModules) {
    for (const story of Object.values(mod)) {
      const s = story.image.replace(/^images\/story\//, "").replace(/\.webp$/, "");
      if (s === slug) return story.title;
    }
  }
  return slug;
}

function readQueue(): string[] {
  if (!existsSync(queuePath)) return [];
  return readFileSync(queuePath, "utf8")
    .split("\n")
    .map(l => l.replace(/#.*$/, "").trim())
    .filter(Boolean);
}

function suspectSlugs(): string[] {
  const out: string[] = [];
  for (const [slug, beat] of Object.entries(SCENE_BEATS)) {
    const key = slug.split("-")[0];
    if (!FOUNDERS.has(key)) continue;
    if (!beatMentionsFigure(beat, figureNameFromSlug(slug), slug)) out.push(slug);
  }
  return out.sort();
}

/** Suspects that need a recognizable named figure (excludes birth + product/event-only). */
function regenSlugs(): string[] {
  return suspectSlugs().filter(slug => !slug.endsWith("-born") && !SCENE_NO_FIGURE.has(slug));
}

const cmd = process.argv[2] ?? "queue";
const slugArg = process.argv[3];

if (cmd === "suspect") {
  console.log(suspectSlugs().join("\n"));
  process.exit(0);
}

if (cmd === "regen") {
  console.log(regenSlugs().join("\n"));
  process.exit(0);
}

if (cmd === "write-regen") {
  const slugs = regenSlugs();
  const body = slugs.join("\n") + "\n";
  writeFileSync(queuePath, body);
  console.error(`Wrote ${slugs.length} slug(s) to ${queuePath}`);
  console.log(body);
  process.exit(0);
}

if (cmd === "queue") {
  console.log(readQueue().join("\n"));
  process.exit(0);
}

if (cmd === "prompts") {
  const slugs = slugArg ? [slugArg] : readQueue();
  const items = slugs.map(slug => ({
    slug,
    file: `${slug}-scene.png`,
    title: titleForSlug(slug),
    prompt: buildScenePrompt(slug, titleForSlug(slug)),
  }));
  console.log(JSON.stringify(items, null, 2));
  process.exit(0);
}

console.error(`Unknown command: ${cmd}`);
process.exit(1);

import { describe, expect, test } from "bun:test";
import { alexanderStories } from "./stories/alexander";
import { caesarStories } from "./stories/caesar";
import { cleopatraStories } from "./stories/cleopatra";
import { napoleonStories } from "./stories/napoleon";
import { lincolnStories } from "./stories/lincoln";
import { oppenheimerStories } from "./stories/oppenheimer";
import { leonardoStories } from "./stories/leonardo";
import { galileoStories } from "./stories/galileo";
import { beethovenStories } from "./stories/beethoven";
import { turingStories } from "./stories/turing";
import { jobsStories } from "./stories/jobs";
import { gatesStories } from "./stories/gates";
import { bezosStories } from "./stories/bezos";
import { huangStories } from "./stories/huang";
import { muskStories } from "./stories/musk";
import { pageStories } from "./stories/page";
import { zuckerbergStories } from "./stories/zuckerberg";
import { altmanStories } from "./stories/altman";
import { storyCopyIssues } from "./story-copy-lint";

const allStoryModules: Array<[string, Record<string, { title: string; body: string }>]> = [
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

describe("story copy lint", () => {
  for (const [figure, stories] of allStoryModules) {
    test(`${figure} stories pass language rules`, () => {
      for (const [key, story] of Object.entries(stories)) {
        const issues = storyCopyIssues(story);
        expect(issues).toEqual([]);
        if (issues.length) throw new Error(`${key}: ${issues.map(i => i.rule).join(", ")}`);
      }
    });
  }
});

describe("story copy lint rules", () => {
  test("flags em dashes", () => {
    expect(storyCopyIssues({ title: "T", body: "One thing\u2014another." })).toMatchObject([
      { rule: "no em dashes or en dashes" },
    ]);
  });

  test('flags "not X. It …" contrast', () => {
    expect(
      storyCopyIssues({ title: "T", body: "This was not a game. It was war." }),
    ).toMatchObject([{ rule: 'no "not X. It/That/The …" contrast' }]);
  });

  test('flags "not just … It …" contrast', () => {
    const issues = storyCopyIssues({ title: "T", body: "Bucephalus was not just a horse. It was a test." });
    expect(issues.some(i => i.rule.includes("not just/only"))).toBe(true);
  });
});

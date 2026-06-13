import { describe, expect, test } from "bun:test";
import { alexanderStories } from "./stories/alexander";
import { storyCopyIssues } from "./story-copy-lint";

describe("story copy lint", () => {
  test("Alexander stories pass language rules", () => {
    for (const [key, story] of Object.entries(alexanderStories)) {
      const issues = storyCopyIssues(story);
      expect(issues).toEqual([]);
      if (issues.length) throw new Error(`${key}: ${issues.map(i => i.rule).join(", ")}`);
    }
  });
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

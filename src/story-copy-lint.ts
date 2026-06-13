export type StoryCopy = {
  title: string;
  body: string;
};

export type StoryCopyIssue = {
  rule: string;
  match: string;
};

const EM_DASH_RE = /\u2014|\u2013/;

const FORBIDDEN_PATTERNS: Array<{ rule: string; re: RegExp }> = [
  { rule: "no em dashes or en dashes", re: EM_DASH_RE },
  {
    rule: 'no "not X. It/That/The …" contrast',
    re: /\b(?:was|is|were|are)\s+not\b[^.!?]{0,140}[.!?]\s+(?:It|That|The|He|She|They|This)\s+(?:was|is|were|are)\b/i,
  },
  {
    rule: 'no "not just/only …" followed by a reframing sentence',
    re: /\bnot\s+(?:just|only)\b[^.!?]{0,140}[.!?]\s+(?:It|That|The)\b/i,
  },
  {
    rule: 'no "never just/only …" setup',
    re: /\b(?:was|is|were|are|never)\s+never\s+(?:just|only)\b|\bis never (?:just|only|simply)\b/i,
  },
  {
    rule: 'no "The point is not …" pivot',
    re: /\b[Tt]he point is not\b/,
  },
  {
    rule: 'no "It is not … It is …" pivot',
    re: /\b[Ii]t is not\b[^.!?]{0,100}[.!?]\s+It is\b/,
  },
  {
    rule: 'no short-sentence "That was not … It was …" pivot',
    re: /\b[Tt]hat was not\b[^.!?]{0,80}[.!?]\s+It was\b/,
  },
];

export function storyCopyIssues(copy: StoryCopy): StoryCopyIssue[] {
  const text = `${copy.title}\n${copy.body}`;
  const issues: StoryCopyIssue[] = [];

  for (const { rule, re } of FORBIDDEN_PATTERNS) {
    const match = text.match(re);
    if (match) issues.push({ rule, match: match[0] });
  }

  return issues;
}

export function assertStoryCopy<T extends StoryCopy>(copy: T, label = "story"): T {
  const issues = storyCopyIssues(copy);
  if (issues.length) {
    const detail = issues.map(i => `${i.rule}: "${i.match}"`).join("; ");
    throw new Error(`${label} copy failed lint: ${detail}`);
  }
  return copy;
}

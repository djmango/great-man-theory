import { assertStoryCopy } from "../story-copy-lint";

export type EnhancedStory = {
  title: string;
  body: string;
  image: string;
  tags: string[];
};

export function defineStories<T extends Record<string, EnhancedStory>>(label: string, stories: T): T {
  for (const copy of Object.values(stories)) assertStoryCopy(copy, label);
  return stories;
}

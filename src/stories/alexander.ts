import { assertStoryCopy } from "../story-copy-lint";

export type EnhancedStory = {
  title: string;
  body: string;
  image: string;
  tags: string[];
};

function story(copy: EnhancedStory): EnhancedStory {
  return assertStoryCopy(copy, "Alexander");
}

export const alexanderStories = {
  "0": story({
    title: "Born into a house built for war",
    body: "Alexander enters the Argead dynasty at Pella, where family, legitimacy, and military command are already inseparable. Macedon was a hard northern kingdom with a royal house used to assassination, hostage politics, feuds, and sudden reversals. Olympias came from Epirus with her own dynastic claims; Philip was turning Macedon into a military machine. From the beginning, Alexander's life sits at the intersection of bloodline and battlefield.",
    image: "images/story/alexander-pella-birth.webp",
    tags: ["Pella", "Argead dynasty", "Olympias"],
  }),
  "10": story({
    title: "Taming Bucephalus",
    body: "In front of Philip's court, Alexander tames a horse no one else can ride. The story goes that the horse panicked at its shadow; he turned it toward the sun, calmed it, and mounted while the adults watched. Macedonian kingship rewards visible nerve. Philip supposedly told him to seek a kingdom equal to himself, and in a court built around war that lands as challenge as much as praise.",
    image: "images/story/alexander-bucephalus.webp",
    tags: ["Plutarch tradition", "Bucephalus", "Macedonian court"],
  }),
  "12": story({
    title: "Praise that sounds like a prophecy",
    body: "Philip's famous line after Bucephalus turns a childhood stunt into a public statement about scale. A father's compliment in a royal court is always political. When Philip says Macedon is too small for Alexander, he gives the boy a myth to live inside. Alexander grows up hearing that ordinary inheritance will not be enough. The empire is not yet real, but the emotional architecture of empire is already there: a father who built the weapon, a son being told the weapon needs a larger world.",
    image: "images/story/alexander-philip-prophecy.webp",
    tags: ["Philip II", "court performance", "prophecy"],
  }),
  "13": story({
    title: "Aristotle at Mieza",
    body: "At Mieza, Alexander receives Homer, medicine, philosophy, geography, and the Greek habit of dividing the world into civilized and barbarian. Aristotle's school trained an heir to rule. Alexander learned rhetoric, natural history, and the Iliad, a book he later carried like a private scripture. The tutor teaches measure, classification, and hierarchy, while the student dreams in Achilles. The education sharpens him and gives him language for destiny.",
    image: "images/story/alexander-aristotle.webp",
    tags: ["Mieza", "Aristotle", "Achilles complex"],
  }),
  "16": story({
    title: "Left behind, he acts like a king",
    body: "Philip campaigns away from Macedon and leaves teenage Alexander as regent. This is the part of the story that makes the later explosion less mysterious. Alexander was already acting before adulthood arrived. As regent he faces the Maedi, crushes them, and plants Alexandropolis in their country. Speed, punishment, renaming, settlement: a miniature version of the whole career.",
    image: "images/story/alexander-regent-alexandropolis.webp",
    tags: ["Regency", "Maedi revolt", "Alexandropolis"],
  }),
  "18": story({
    title: "Breaking the Sacred Band",
    body: "At eighteen, Alexander commands cavalry on the left at Chaeronea and helps destroy the elite Theban unit that had symbolized Greek military excellence. Philip wins the battle, but Alexander gets the line that matters to a dynasty. The Sacred Band of Thebes was one of the most famous fighting units in Greece, and breaking it in front of the Greek world announces that Macedon is no longer a northern outsider. The son is now proof of the father's system: sarissa, cavalry timing, discipline, and a royal family that fights at the point of decision.",
    image: "images/story/alexander-chaeronea.webp",
    tags: ["Chaeronea", "Sacred Band", "Companion cavalry"],
  }),
  "19": story({
    title: "The banquet where inheritance became a threat",
    body: "At Philip's wedding to Cleopatra Eurydice, Attalus prays for a legitimate heir. Alexander hears it as a public declaration that he is disposable. He throws a cup. Philip rises to strike him, but the drunk king stumbles. Alexander's reported line is brutal: here is the man preparing to cross from Europe into Asia, and he cannot cross from couch to couch. Soon after, Alexander and Olympias are in exile. The Persian campaign is still Philip's project, but the succession has become a live blade.",
    image: "images/story/alexander-wedding-banquet.webp",
    tags: ["Philip II", "Olympias", "succession crisis"],
  }),
  "20": story({
    title: "The machine changes hands",
    body: "Philip is murdered at Aegae, and Alexander inherits both the throne and a war machine already aimed at Asia. The assassination could have shattered Macedon. Instead Alexander moves with terrifying speed. Rivals are killed or neutralized, the army acknowledges him, and the Greek cities learn that Philip's death has not freed them from Macedonian power. Crisis becomes acceleration. He proves legitimacy by controlling the next hour before anyone else can organize it.",
    image: "images/story/alexander-crowned-after-murder.webp",
    tags: ["Aegae", "assassination", "accession"],
  }),
  "22": story({
    title: "The satraps choose the riverbank",
    body: "At the Granicus, Persian satraps try to stop him at the water's edge, exactly the kind of position older commanders would tell him to avoid. Parmenion is often cast as the voice of caution in Alexander's story, and whether the speeches are exact or literary, the pattern matters. Alexander repeatedly chooses speed before the enemy can turn size into certainty. At Granicus, the river makes the charge ugly and dangerous. He goes anyway. The first victory opens Asia Minor, kills or scatters local Persian leadership, and convinces Greek cities that the invasion is real.",
    image: "images/story/alexander-granicus.webp",
    tags: ["Granicus", "Persian satraps", "Parmenion"],
  }),
  "23": story({
    title: "Omens, knots, and the first king-to-king shock",
    body: "The Gordian Knot makes Alexander look chosen; Issus makes Darius look vulnerable. The knot story is propaganda gold: a problem wrapped in priestly mystery, solved by decisive violence rather than patience. Whether he sliced it or pulled the pin, Alexander turns ambiguity into theater. Then at Issus, the theater becomes military reality. Darius himself flees, leaving family and prestige behind. Alexander has humiliated the Great King in person.",
    image: "images/story/alexander-gordian-issus.webp",
    tags: ["Gordian Knot", "Issus", "Darius III"],
  }),
  "25-alexandria": story({
    title: "A city, an oracle, and a new scale of identity",
    body: "In Egypt, Alexander stops being only a Macedonian conqueror. He accepts older languages of kingship and plants a city meant to outlast him. Alexandria is a strategic port, a Greek city, and a monument to personal rule all at once. Then comes the journey to Siwa, where tradition says the oracle greeted him in language that could be heard as divine sonship. Conquest starts changing him here. Macedonian king, Greek avenger, Egyptian pharaoh, son of Zeus-Ammon: the identities stack rather than replace each other.",
    image: "images/story/alexander-alexandria.webp",
    tags: ["Alexandria", "Siwa", "pharaoh"],
  }),
  "25-gaugamela": story({
    title: "Gaugamela: he aims at the hinge",
    body: "Darius brings scale. Alexander answers with geometry, drawing the Persian line out until a gap opens near the king. Gaugamela is the mature Alexander pattern: refuse the obvious center, ride obliquely, stretch the enemy, then strike at the command nerve. The Persian army is larger, flatter, and prepared for chariots. Alexander turns the field into a question of timing. When the gap opens, the Companions drive toward Darius. The king flees, and the empire begins to come apart psychologically, not city by city.",
    image: "images/story/alexander-gaugamela.webp",
    tags: ["Gaugamela", "Darius III", "decisive battle"],
  }),
  "30": story({
    title: "The edge of the map fights back",
    body: "At the Hydaspes, Porus and his elephants force Alexander into one of his hardest battles, and his own army begins to imagine an end. The Indian campaign is where the legend starts grinding against human limits. Alexander wins through deception, night movement, and audacity, but the battle is costly and strange to Macedonian eyes. War elephants break the familiar grammar of combat. Porus impresses him enough to be restored as ruler. Soon after, at the Hyphasis, the army refuses to march farther. Alexander can defeat kings, but not endless distance, monsoon, exhaustion, and homesick veterans.",
    image: "images/story/alexander-hydaspes.webp",
    tags: ["Hydaspes", "Porus", "army mutiny"],
  }),
  "32": story({
    title: "Babylon: the empire has no heir equal to the appetite",
    body: "He dies young, feverish, surrounded by soldiers and generals who know the map is now larger than the system holding it together. The final scene is almost anti-climactic because the conquest has outrun every institution around it. There is no adult successor with uncontested legitimacy. The army has followed a person, not a constitution. The generals can salute the dying king, but they cannot inherit his momentum. Within a generation, the empire becomes kingdoms. The legend survives more cleanly than the thing he built.",
    image: "images/story/alexander-babylon-fever.webp",
    tags: ["Babylon", "succession", "Diadochi"],
  }),
} as const satisfies Record<string, EnhancedStory>;

export type AlexanderStoryKey = keyof typeof alexanderStories;

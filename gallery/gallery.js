// src/story-copy-lint.ts
var EM_DASH_RE = /\u2014|\u2013/;
var FORBIDDEN_PATTERNS = [
  { rule: "no em dashes or en dashes", re: EM_DASH_RE },
  {
    rule: 'no "not X. It/That/The …" contrast',
    re: /\b(?:was|is|were|are)\s+not\b[^.!?]{0,140}[.!?]\s+(?:It|That|The|He|She|They|This)\s+(?:was|is|were|are)\b/i
  },
  {
    rule: 'no "not just/only …" followed by a reframing sentence',
    re: /\bnot\s+(?:just|only)\b[^.!?]{0,140}[.!?]\s+(?:It|That|The)\b/i
  },
  {
    rule: 'no "never just/only …" setup',
    re: /\b(?:was|is|were|are|never)\s+never\s+(?:just|only)\b|\bis never (?:just|only|simply)\b/i
  },
  {
    rule: 'no "The point is not …" pivot',
    re: /\b[Tt]he point is not\b/
  },
  {
    rule: 'no "It is not … It is …" pivot',
    re: /\b[Ii]t is not\b[^.!?]{0,100}[.!?]\s+It is\b/
  },
  {
    rule: 'no short-sentence "That was not … It was …" pivot',
    re: /\b[Tt]hat was not\b[^.!?]{0,80}[.!?]\s+It was\b/
  }
];
function storyCopyIssues(copy) {
  const text = `${copy.title}
${copy.body}`;
  const issues = [];
  for (const { rule, re } of FORBIDDEN_PATTERNS) {
    const match = text.match(re);
    if (match)
      issues.push({ rule, match: match[0] });
  }
  return issues;
}
function assertStoryCopy(copy, label = "story") {
  const issues = storyCopyIssues(copy);
  if (issues.length) {
    const detail = issues.map((i) => `${i.rule}: "${i.match}"`).join("; ");
    throw new Error(`${label} copy failed lint: ${detail}`);
  }
  return copy;
}

// src/stories/alexander.ts
function story(copy) {
  return assertStoryCopy(copy, "Alexander");
}
var alexanderStories = {
  "0": story({
    title: "Born into a house built for war",
    body: "Alexander enters the Argead dynasty at Pella, where family, legitimacy, and military command are already inseparable. Macedon was a hard northern kingdom with a royal house used to assassination, hostage politics, feuds, and sudden reversals. Olympias came from Epirus with her own dynastic claims; Philip was turning Macedon into a military machine. From the beginning, Alexander's life sits at the intersection of bloodline and battlefield.",
    image: "images/story/alexander-pella-birth.webp",
    tags: ["Pella", "Argead dynasty", "Olympias"]
  }),
  "10": story({
    title: "Taming Bucephalus",
    body: "In front of Philip's court, Alexander tames a horse no one else can ride. The story goes that the horse panicked at its shadow; he turned it toward the sun, calmed it, and mounted while the adults watched. Macedonian kingship rewards visible nerve. Philip supposedly told him to seek a kingdom equal to himself, and in a court built around war that lands as challenge as much as praise.",
    image: "images/story/alexander-bucephalus.webp",
    tags: ["Plutarch tradition", "Bucephalus", "Macedonian court"]
  }),
  "12": story({
    title: "Praise that sounds like a prophecy",
    body: "Philip's famous line after Bucephalus turns a childhood stunt into a public statement about scale. A father's compliment in a royal court is always political. When Philip says Macedon is too small for Alexander, he gives the boy a myth to live inside. Alexander grows up hearing that ordinary inheritance will not be enough. The empire is not yet real, but the emotional architecture of empire is already there: a father who built the weapon, a son being told the weapon needs a larger world.",
    image: "images/story/alexander-philip-prophecy.webp",
    tags: ["Philip II", "court performance", "prophecy"]
  }),
  "13": story({
    title: "Aristotle at Mieza",
    body: "At Mieza, Alexander receives Homer, medicine, philosophy, geography, and the Greek habit of dividing the world into civilized and barbarian. Aristotle's school trained an heir to rule. Alexander learned rhetoric, natural history, and the Iliad, a book he later carried like a private scripture. The tutor teaches measure, classification, and hierarchy, while the student dreams in Achilles. The education sharpens him and gives him language for destiny.",
    image: "images/story/alexander-aristotle.webp",
    tags: ["Mieza", "Aristotle", "Achilles complex"]
  }),
  "16": story({
    title: "Left behind, he acts like a king",
    body: "Philip campaigns away from Macedon and leaves teenage Alexander as regent. This is the part of the story that makes the later explosion less mysterious. Alexander was already acting before adulthood arrived. As regent he faces the Maedi, crushes them, and plants Alexandropolis in their country. Speed, punishment, renaming, settlement: a miniature version of the whole career.",
    image: "images/story/alexander-regent-alexandropolis.webp",
    tags: ["Regency", "Maedi revolt", "Alexandropolis"]
  }),
  "18": story({
    title: "Breaking the Sacred Band",
    body: "At eighteen, Alexander commands cavalry on the left at Chaeronea and helps destroy the elite Theban unit that had symbolized Greek military excellence. Philip wins the battle, but Alexander gets the line that matters to a dynasty. The Sacred Band of Thebes was one of the most famous fighting units in Greece, and breaking it in front of the Greek world announces that Macedon is no longer a northern outsider. The son is now proof of the father's system: sarissa, cavalry timing, discipline, and a royal family that fights at the point of decision.",
    image: "images/story/alexander-chaeronea.webp",
    tags: ["Chaeronea", "Sacred Band", "Companion cavalry"]
  }),
  "19": story({
    title: "The banquet where inheritance became a threat",
    body: "At Philip's wedding to Cleopatra Eurydice, Attalus prays for a legitimate heir. Alexander hears it as a public declaration that he is disposable. He throws a cup. Philip rises to strike him, but the drunk king stumbles. Alexander's reported line is brutal: here is the man preparing to cross from Europe into Asia, and he cannot cross from couch to couch. Soon after, Alexander and Olympias are in exile. The Persian campaign is still Philip's project, but the succession has become a live blade.",
    image: "images/story/alexander-wedding-banquet.webp",
    tags: ["Philip II", "Olympias", "succession crisis"]
  }),
  "20": story({
    title: "The machine changes hands",
    body: "Philip is murdered at Aegae, and Alexander inherits both the throne and a war machine already aimed at Asia. The assassination could have shattered Macedon. Instead Alexander moves with terrifying speed. Rivals are killed or neutralized, the army acknowledges him, and the Greek cities learn that Philip's death has not freed them from Macedonian power. Crisis becomes acceleration. He proves legitimacy by controlling the next hour before anyone else can organize it.",
    image: "images/story/alexander-crowned-after-murder.webp",
    tags: ["Aegae", "assassination", "accession"]
  }),
  "22": story({
    title: "The satraps choose the riverbank",
    body: "At the Granicus, Persian satraps try to stop him at the water's edge, exactly the kind of position older commanders would tell him to avoid. Parmenion is often cast as the voice of caution in Alexander's story, and whether the speeches are exact or literary, the pattern matters. Alexander repeatedly chooses speed before the enemy can turn size into certainty. At Granicus, the river makes the charge ugly and dangerous. He goes anyway. The first victory opens Asia Minor, kills or scatters local Persian leadership, and convinces Greek cities that the invasion is real.",
    image: "images/story/alexander-granicus.webp",
    tags: ["Granicus", "Persian satraps", "Parmenion"]
  }),
  "23": story({
    title: "Omens, knots, and the first king-to-king shock",
    body: "The Gordian Knot makes Alexander look chosen; Issus makes Darius look vulnerable. The knot story is propaganda gold: a problem wrapped in priestly mystery, solved by decisive violence rather than patience. Whether he sliced it or pulled the pin, Alexander turns ambiguity into theater. Then at Issus, the theater becomes military reality. Darius himself flees, leaving family and prestige behind. Alexander has humiliated the Great King in person.",
    image: "images/story/alexander-gordian-issus.webp",
    tags: ["Gordian Knot", "Issus", "Darius III"]
  }),
  "25-alexandria": story({
    title: "A city, an oracle, and a new scale of identity",
    body: "In Egypt, Alexander stops being only a Macedonian conqueror. He accepts older languages of kingship and plants a city meant to outlast him. Alexandria is a strategic port, a Greek city, and a monument to personal rule all at once. Then comes the journey to Siwa, where tradition says the oracle greeted him in language that could be heard as divine sonship. Conquest starts changing him here. Macedonian king, Greek avenger, Egyptian pharaoh, son of Zeus-Ammon: the identities stack rather than replace each other.",
    image: "images/story/alexander-alexandria.webp",
    tags: ["Alexandria", "Siwa", "pharaoh"]
  }),
  "25-gaugamela": story({
    title: "Gaugamela: he aims at the hinge",
    body: "Darius brings scale. Alexander answers with geometry, drawing the Persian line out until a gap opens near the king. Gaugamela is the mature Alexander pattern: refuse the obvious center, ride obliquely, stretch the enemy, then strike at the command nerve. The Persian army is larger, flatter, and prepared for chariots. Alexander turns the field into a question of timing. When the gap opens, the Companions drive toward Darius. The king flees, and the empire begins to come apart psychologically, not city by city.",
    image: "images/story/alexander-gaugamela.webp",
    tags: ["Gaugamela", "Darius III", "decisive battle"]
  }),
  "30": story({
    title: "The edge of the map fights back",
    body: "At the Hydaspes, Porus and his elephants force Alexander into one of his hardest battles, and his own army begins to imagine an end. The Indian campaign is where the legend starts grinding against human limits. Alexander wins through deception, night movement, and audacity, but the battle is costly and strange to Macedonian eyes. War elephants break the familiar grammar of combat. Porus impresses him enough to be restored as ruler. Soon after, at the Hyphasis, the army refuses to march farther. Alexander can defeat kings, but not endless distance, monsoon, exhaustion, and homesick veterans.",
    image: "images/story/alexander-hydaspes.webp",
    tags: ["Hydaspes", "Porus", "army mutiny"]
  }),
  "32": story({
    title: "Babylon: the empire has no heir equal to the appetite",
    body: "He dies young, feverish, surrounded by soldiers and generals who know the map is now larger than the system holding it together. The final scene is almost anti-climactic because the conquest has outrun every institution around it. There is no adult successor with uncontested legitimacy. The army has followed a person, not a constitution. The generals can salute the dying king, but they cannot inherit his momentum. Within a generation, the empire becomes kingdoms. The legend survives more cleanly than the thing he built.",
    image: "images/story/alexander-babylon-fever.webp",
    tags: ["Babylon", "succession", "Diadochi"]
  })
};

// src/stories/shared.ts
function defineStories(label, stories) {
  for (const copy of Object.values(stories))
    assertStoryCopy(copy, label);
  return stories;
}

// src/stories/caesar.ts
var caesarStories = defineStories("Caesar", {
  "0": {
    title: "A patrician name in a republic of knives",
    body: "Caesar is born into the Julian clan, ancient in name but lately short on money and luck. Rome in 100 BC is a city of factions, street violence, and generals who treat the Senate like furniture. His aunt is married to Marius, the champion of the common soldiers. His uncle is the conservative lion Sulla. The boy inherits a famous name at the worst possible moment to need one.",
    image: "images/story/caesar-born.webp",
    tags: ["Julii", "Roman Republic", "Marius"]
  },
  "16": {
    title: "Refuses to divorce his wife for a dictator",
    body: "When Sulla seizes Rome, he orders the young Caesar to leave Cornelia, daughter of the defeated Marius. Caesar refuses. Sulla strips his priesthood, his inheritance, and his safety. Plutarch says Sulla warned aides that in Caesar they leave behind many Mariuses. For months he is a fugitive, bribing and hiding until friends and the Vestals win a pardon.",
    image: "images/story/caesar-sulla.webp",
    tags: ["Sulla", "Cornelia", "proscription"]
  },
  "20": {
    title: "Weeping before a statue of Alexander",
    body: "Serving as a junior magistrate in Spain, Caesar passes a town with a statue of Alexander the Great. He weeps in front of his staff. At his age Alexander had conquered the world. Caesar, he says, has done almost nothing. The story may be polished by later admirers, but it captures the hunger that will drive the rest of his life.",
    image: "images/story/caesar-alexander-statue.webp",
    tags: ["Hispania", "Alexander", "Plutarch"]
  },
  "25": {
    title: "Captured by pirates, promises crucifixion",
    body: "Sailing to study rhetoric in Rhodes, Caesar is seized by Cilician pirates who demand twenty talents. He laughs and insists they ask for fifty; he is worth more. For weeks he joins their games, writes poetry they mock, and tells them he will crucify them once ransomed. After payment he raises a fleet, returns, captures them, and carries out the threat after a brief mercy of throat-cutting.",
    image: "images/story/caesar-pirates.webp",
    tags: ["Cilician pirates", "ransom", "Plutarch"]
  },
  "30": {
    title: "Pontifex maximus on borrowed money",
    body: "Caesar runs for Rome's chief priest against a senior senator and wins by spending himself into terrifying debt. He tells his mother the night before that if he loses he will not come home. Bribery, spectacle, and nerve beat pedigree. The office gives him a house, prestige, and a platform. Debt becomes a habit: he will keep buying futures with money he does not yet have.",
    image: "images/story/caesar-pontifex.webp",
    tags: ["pontifex maximus", "debt", "election"]
  },
  "36": {
    title: "Aedile games that drown Rome in wonder",
    body: "As aedile he stages games so lavish rivals accuse him of buying the crowd. He rebuilds monuments, parades exotic animals, and fills the Forum with gladiators and pageantry. Crassus and Pompey watch a man who turns public office into personal theater. Romans learn that Caesar does not do anything small, including debt.",
    image: "images/story/caesar-aedile-games.webp",
    tags: ["aedile", "games", "spectacle"]
  },
  "40": {
    title: "The First Triumvirate in a back room",
    body: "Caesar, Pompey the Great, and Crassus the rich divide the Roman world in a private pact. Pompey wants land for his veterans. Crassus wants a profitable command. Caesar wants the consulship and then Gaul. The Senate is not consulted. Rome learns again that law follows whoever can pair legions with money.",
    image: "images/story/caesar-triumvirate.webp",
    tags: ["Pompey", "Crassus", "First Triumvirate"]
  },
  "42": {
    title: "Gaul will make him or break Rome",
    body: "Caesar takes proconsular command of Cisalpine and Transalpine Gaul for five years. On paper he is defending the frontier. In practice he will spend the next decade turning tribal wars into personal legend. Helvetii, Ariovistus, the Belgae: each campaign extends Roman reach and his own debt of glory. His Commentaries are propaganda so elegant Romans quote them like history.",
    image: "images/story/caesar-gaul.webp",
    tags: ["Gallic War", "Commentaries", "legions"]
  },
  "48": {
    title: "Alesia: engineering as domination",
    body: "At Alesia, Vercingetorix retreats to a hill fort hoping to outlast Caesar. Caesar builds a double wall: one facing the hill, one facing relief armies coming to rescue Gaul. Starvation and Roman shovel work decide the war. Vercingetorix rides out in armor and surrenders. Gaul becomes a Roman province. Caesar becomes a man who can no longer be kept out of Rome.",
    image: "images/story/caesar-alesia.webp",
    tags: ["Alesia", "Vercingetorix", "siege works"]
  },
  "50": {
    title: "The Rubicon is a line in a politician's mind",
    body: "The Senate orders Caesar to disband his army. Pompey waits in Italy with the Republic's prestige. On 10 January 49 BC Caesar leads the Thirteenth Legion across a shallow river boundary. Alea iacta est, the die is cast, he says in Greek according to Suetonius. There is no taking the step back. Civil war becomes the only grammar left.",
    image: "images/story/caesar-rubicon.webp",
    tags: ["Rubicon", "Thirteenth Legion", "civil war"]
  },
  "54": {
    title: "Pharsalus: Pompey flees the field",
    body: "In Greece, Pompey massed cavalry and senators who still called themselves the Republic. Caesar's veterans at Pharsalus held the line, then counterattacked where the cavalry buckled. Pompey rode away. Caesar pursued him to Egypt, where courtiers presented Pompey's severed head as a gift. Caesar wept, they say, at the insult to a Roman magnate.",
    image: "images/story/caesar-pharsalus.webp",
    tags: ["Pharsalus", "Pompey", "Egypt"]
  },
  "52-egypt": {
    title: "Alexandria burns while Caesar holds the palace",
    body: "Pursuing Pompey to Egypt, Caesar lands in a civil war between Cleopatra and her brother. He takes the palace, fights street by street, and burns ships in the harbor; smoke may have damaged the great library. Pompey's head arrives as a gift and offends him. Cleopatra reaches him by audacity. Egypt gives him a son, grain, and the title pharaoh. Rome notices he is collecting kingdoms, not only victories.",
    image: "images/story/caesar-alexandria.webp",
    tags: ["Alexandria", "Cleopatra", "library"]
  },
  "55": {
    title: "The Ides of March in the curia",
    body: "Dictator for life, Caesar plans reforms, a calendar, colonies, debt relief. He also plans a Parthian campaign. On 15 March 44 BC he enters the Theatre of Pompey for a Senate meeting. Twenty-three knives find him. Brutus, whom he may have treated as a son, strikes among the rest. The Republic dies with him, though men will keep using the word for years.",
    image: "images/story/caesar-ides.webp",
    tags: ["Ides of March", "Brutus", "assassination"]
  }
});

// src/stories/cleopatra.ts
var cleopatraStories = defineStories("Cleopatra", {
  "0": {
    title: "A Greek queen in an Egyptian crown",
    body: "Cleopatra VII is born into the Ptolemaic dynasty, Macedonian Greek rulers who play Egyptian pharaoh on the Nile. Alexandria is her city: libraries, ports, multilingual merchants, and court factions that murder siblings for the throne. She grows up knowing that in her family, family is a temporary alliance.",
    image: "images/story/cleopatra-born.webp",
    tags: ["Ptolemaic", "Alexandria", "dynasty"]
  },
  "14": {
    title: "Speaks like a diplomat, not a decoration",
    body: "Plutarch lists her languages: Egyptian, Greek, Ethiopian, Troglodyte, Hebrew, Arabic, Syriac, Median, Parthian, and others. In a court where rulers often needed translators, Cleopatra can negotiate in the tongues of her subjects and rivals. Politics in Alexandria rewards whoever can speak directly to the person holding the knife.",
    image: "images/story/cleopatra-languages.webp",
    tags: ["languages", "Plutarch", "diplomacy"]
  },
  "18": {
    title: "Co-ruler with a brother who wants her dead",
    body: "She inherits the throne with Ptolemy XIII, her younger brother, under Roman pressure. Court eunuchs and generals pick sides. Cleopatra tries to outmaneuver them and is driven into exile. Egypt becomes a civil war in miniature while Rome's own civil war decides which faction on the Nile will survive.",
    image: "images/story/cleopatra-exile.webp",
    tags: ["Ptolemy XIII", "civil war", "exile"]
  },
  "21": {
    title: "Smuggled to Caesar in a carpet",
    body: "Caesar arrives chasing Pompey and finds a sibling war instead. Cleopatra cannot reach him through her brother's guards. She has herself rolled in a bedroll or carpet and carried into the palace. The audacity works. Within days she is Caesar's ally, lover, and path back to the throne. Romance here is also logistics.",
    image: "images/story/cleopatra-carpet.webp",
    tags: ["Caesar", "Alexandria", "carpet"]
  },
  "22": {
    title: "Caesarion and the title of King of Kings",
    body: "She bears Caesar a son, Caesarion. Propaganda on both sides of the Mediterranean now has a living link between Roman power and pharaonic line. After Caesar's assassination she flees Rome's danger and returns to Egypt to rebuild. Every child of a god-king is a claim on the future.",
    image: "images/story/cleopatra-caesarion.webp",
    tags: ["Caesarion", "heir", "propaganda"]
  },
  "25": {
    title: "In Rome when the knives come out",
    body: "Cleopatra is in the city when Caesar falls on the Ides of March. She had been negotiating for recognition of Caesarion. With Caesar dead, her alliance is a liability. She slips away before Roman mobs can treat an Egyptian queen as another foreign problem. Survival means returning to Alexandria and rebuilding power from the Nile up.",
    image: "images/story/cleopatra-caesar-death.webp",
    tags: ["Ides of March", "Rome", "Caesarion"]
  },
  "21-siege": {
    title: "Alexandria in flames around the palace",
    body: "After the carpet gambit, civil war returns to Alexandria. Caesar and Cleopatra hold the palace while her brother's forces and the city burn around them. Ships in the harbor catch fire; scholars still argue what happened to library scrolls in the smoke. She stays beside Caesar through a siege that feels more Greek tragedy than diplomacy. When they win, she is queen again and Rome has a foothold on the Nile.",
    image: "images/story/cleopatra-alexandria-siege.webp",
    tags: ["Alexandria", "siege", "Caesar"]
  },
  "28": {
    title: "Antony and the alliance of the East",
    body: "In Tarsus, Cleopatra meets Mark Antony on the river in a gilded barge with purple sails and musicians. Antony controls the eastern Roman world and needs Egypt's grain and gold. She needs Roman legions to protect her throne. Their partnership becomes a household, a war plan, and a scandal in Rome.",
    image: "images/story/cleopatra-tarsus.webp",
    tags: ["Mark Antony", "Tarsus", "East"]
  },
  "34": {
    title: "Donations of Alexandria enrage Rome",
    body: "Antony distributes eastern kingdoms to Cleopatra and their children in a public ceremony. To Octavian in Italy, this looks like treason dressed as pageantry. Propaganda paints Cleopatra as a foreign sorceress stealing Roman empire. The final war between Antony and Octavian becomes a war against her name.",
    image: "images/story/cleopatra-donations.webp",
    tags: ["Donations of Alexandria", "Octavian", "propaganda"]
  },
  "39-actium": {
    title: "Actium: the fleet that chose flight",
    body: "Off the coast of Greece, Octavian's admiral Agrippa outmaneuvers Antony and Cleopatra's combined fleet. Mid-battle Cleopatra's squadron breaks through and sails for Egypt. Antony follows her. The fighting men see commanders leave the line. Morale collapses. Actium is less a annihilation than a psychological surrender.",
    image: "images/story/cleopatra-actium.webp",
    tags: ["Actium", "Agrippa", "naval battle"]
  },
  "39-death": {
    title: "The last pharaoh of Egypt",
    body: "Octavian closes in on Alexandria. Antony falls on his sword but dies slowly in Cleopatra's arms. She negotiates with Octavian, then chooses poison, tradition says by asp. Egypt becomes a Roman province. Rome will tell her story for centuries, often as cautionary myth about luxury and foreign women. The real woman was a strategist who nearly held the Mediterranean.",
    image: "images/story/cleopatra-death.webp",
    tags: ["Octavian", "asp", "last pharaoh"]
  }
});

// src/stories/napoleon.ts
var napoleonStories = defineStories("Napoleon", {
  "0": {
    title: "Corsican outsider in French uniform",
    body: "Napoleone Buonaparte is born in Ajaccio, one year after Corsica joins France. His family is minor nobility with more pride than money. He grows up speaking Corsican first, French with an accent that Paris will mock, and hunger for a world larger than an island. Military school is his ladder out.",
    image: "images/story/napoleon-born.webp",
    tags: ["Corsica", "Ajaccio", "Buonaparte"]
  },
  "9": {
    title: "Mocked at Brienne for his accent",
    body: "At Brienne military academy, classmates from mainland France tease the short Corsican for speech and manners. He retreats into mathematics, history, and solitary ambition. Teachers note his gift for artillery. The boy learns early that humiliation can be stored like gunpowder.",
    image: "images/story/napoleon-brienne.webp",
    tags: ["Brienne", "cadet", "artillery"]
  },
  "24": {
    title: "Toulon: the young general with the plan",
    body: "Royalist Toulon invites British ships into port. The Revolution needs a victory. Captain Bonaparte proposes artillery positions that drive the fleet off. He is wounded in the thigh and promoted to brigadier general at twenty-four. For the first time, French power and his personal fate align on a map.",
    image: "images/story/napoleon-toulon.webp",
    tags: ["Toulon", "artillery", "Revolution"]
  },
  "27": {
    title: "The Italian campaign: speed as doctrine",
    body: "In Italy he inherits an army that is hungry, unpaid, and skeptical. He promises them glory and plunder, then moves faster than Austrian commanders expect. Rivoli, Mantua, Lodi: each battle sells the myth of Bonaparte before it sells the Republic. Soldiers begin to cheer the man, not only the revolution.",
    image: "images/story/napoleon-italy.webp",
    tags: ["Italian campaign", "Lodi", "Austrians"]
  },
  "29": {
    title: "Egypt: science, loot, and a fleet on fire",
    body: "He invades Egypt to threaten British India and win immortal fame. Scholars catalog temples while soldiers march in desert heat. At the Nile he wins a battle that makes European newspapers call him a new Alexander. Then Nelson destroys his fleet at Aboukir. Napoleon is stranded in Africa with an army and a story that must continue in Paris.",
    image: "images/story/napoleon-egypt.webp",
    tags: ["Egypt", "Nile", "Aboukir"]
  },
  "26": {
    title: "A whiff of grapeshot on the streets of Paris",
    body: "Royalist mobs march on the National Convention in October 1795. The government gives Bonaparte command of the defense. He loads cannon with grapeshot and fires into the crowd at close range. Hundreds fall in minutes. The Directory survives because a Corsican artilleryman chose violence over negotiation. Paris learns his name as a man who will shoot.",
    image: "images/story/napoleon-vendemiaire.webp",
    tags: ["13 Vendémiaire", "Paris", "grapeshot"]
  },
  "45": {
    title: "Elba: emperor of an island",
    body: "After Leipzig and the collapse of his alliance system, allied armies enter Paris. He abdicates and keeps the title emperor only over Elba, a Mediterranean rock with a few thousand people. He reorganizes mines, watches the Bourbons stumble, and plans. Exile looks like retirement to fools who forget how fast he moves.",
    image: "images/story/napoleon-elba.webp",
    tags: ["Elba", "abdication", "1814"]
  },
  "30-coup": {
    title: "18 Brumaire: coup in a parliamentary fog",
    body: "He slips back to France where the Directory is bankrupt in prestige and cash. With allies he stages the coup of 18 Brumaire, using soldiers and procedural chaos to dissolve one government and replace it with the Consulate. He is First Consul at thirty. The Republic survives in name. Power concentrates in one pair of hands.",
    image: "images/story/napoleon-brumaire.webp",
    tags: ["18 Brumaire", "Consulate", "coup"]
  },
  "35": {
    title: "Crowns himself before the Pope",
    body: "At Notre-Dame he takes the imperial crown from Pius VII and places it on his own head, then crowns Joséphine. The gesture tells Europe that his legitimacy comes from victory, not altar. France gets a new nobility, a Code, and an emperor who still reads artillery manuals for pleasure.",
    image: "images/story/napoleon-coronation.webp",
    tags: ["coronation", "Notre-Dame", "empire"]
  },
  "36": {
    title: "Austerlitz: the sun of Austerlitz",
    body: "Against Russia and Austria, he feigns weakness on the Pratzen heights, invites attack, then cuts the allied center. The Third Coalition breaks. He sleeps in a captured palace and writes to Joséphine that night. Austerlitz becomes the battle other generals study and never quite reproduce.",
    image: "images/story/napoleon-austerlitz.webp",
    tags: ["Austerlitz", "Third Coalition", "Pratzen"]
  },
  "43": {
    title: "Moscow burns and the Grande Armée freezes",
    body: "He invades Russia with nearly half a million men. Borodino is a bloody draw. Moscow is empty and on fire. Winter, distance, and Cossacks devour the retreat. The army that straggles back is a ghost of the force that crossed the Niemen. Empire peaks and begins to crack in the same season.",
    image: "images/story/napoleon-moscow.webp",
    tags: ["Russia", "Moscow", "retreat"]
  },
  "46": {
    title: "Waterloo: the hundred days end",
    body: "Escaped from Elba, he rallies France for a hundred days. At Waterloo, Wellington holds a ridge until Blücher's Prussians arrive. The Old Guard advances uphill in columns and breaks. Napoleon abdicates again and trusts the British with his exile. They send him to a volcanic rock in the South Atlantic.",
    image: "images/story/napoleon-waterloo.webp",
    tags: ["Waterloo", "Wellington", "Old Guard"]
  },
  "51": {
    title: "St. Helena: the emperor in a small room",
    body: "On St. Helena he paces, argues with governors, and dictates memoirs that reshape how Europe remembers him. He dies in 1821, likely of stomach cancer, though poison theories persist. His body returns to Paris in triumph decades later. The age he dominated will be named for him whether admirers or enemies like it.",
    image: "images/story/napoleon-st-helena.webp",
    tags: ["St. Helena", "memoirs", "legacy"]
  }
});

// src/stories/lincoln.ts
var lincolnStories = defineStories("Lincoln", {
  "0": {
    title: "Born in a one-room cabin on the frontier",
    body: "Abraham Lincoln enters the world in a log cabin in Hardin County, Kentucky. His father is a farmer and carpenter moving from claim to claim. Books are scarce; work is not. The frontier teaches him early that law, land titles, and violence often arrive in the same wagon.",
    image: "images/story/lincoln-born.webp",
    tags: ["Kentucky", "frontier", "log cabin"]
  },
  "9": {
    title: "His mother dies of milk sickness",
    body: "Nancy Hanks Lincoln dies after drinking milk from cows that ate white snakeroot. Abraham is nine. His father leaves him and his sister with Nancy's cousin while he goes to find a new wife in Kentucky. Sarah Bush Johnston arrives with books, kindness, and stability. Grief and replacement shape the boy who will later call strangers a jury of peers.",
    image: "images/story/lincoln-mother.webp",
    tags: ["Nancy Hanks", "milk sickness", "Sarah Bush"]
  },
  "19": {
    title: "Flatboat to New Orleans",
    body: "He helps take a load of produce down the Mississippi to New Orleans. Frontier lore later claims he saw a slave auction there and vowed hatred of slavery. The trip matters either way: he sees the river economy that binds North and South, and he learns he can leave the farm for a wider world.",
    image: "images/story/lincoln-flatboat.webp",
    tags: ["New Orleans", "Mississippi", "flatboat"]
  },
  "22": {
    title: "New Salem and the wrestling match",
    body: "In New Salem, Illinois, he works as clerk, postmaster, and surveyor. Townspeople remember him winning a wrestling match against a local bully, studying law by firelight, and telling stories that made rooms quiet. He loses his first race for the legislature, then wins the second. Politics begins as neighborliness with ballots.",
    image: "images/story/lincoln-new-salem.webp",
    tags: ["New Salem", "Illinois", "wrestling"]
  },
  "27": {
    title: "Self-taught lawyer on the Eighth Circuit",
    body: "Licensed to practice law, he rides the muddy circuit of central Illinois with judges and rivals who become friends. He wins farmers and merchants with plain speech and odd humor. Law pays better than farming and teaches him argument without shouting. The courtroom is rehearsal for the country.",
    image: "images/story/lincoln-lawyer.webp",
    tags: ["Eighth Circuit", "lawyer", "Illinois"]
  },
  "49": {
    title: "Debates with Douglas under open sky",
    body: "Running for Senate against Stephen Douglas, he joins seven debates across Illinois that draw thousands into fields and fairgrounds. He argues slavery must not spread, though he stops short of abolition where crowds fear it. Douglas wins the seat. Lincoln wins the argument that will matter when the nation scales up.",
    image: "images/story/lincoln-debates.webp",
    tags: ["Douglas debates", "slavery", "Illinois"]
  },
  "51": {
    title: "Elected with less than forty percent of the vote",
    body: "In a four-way presidential race, Lincoln wins the Electoral College without a southern state. Secession begins before he takes office. He arrives in Washington secretly after a plot to kill him in Baltimore. The Republic he inherits is already pulling apart at the seams.",
    image: "images/story/lincoln-elected.webp",
    tags: ["1860 election", "secession", "Baltimore plot"]
  },
  "52": {
    title: "Fort Sumter and the war he hoped to avoid",
    body: "Confederates fire on Fort Sumter in Charleston harbor. Lincoln calls for volunteers. Four more states leave the Union. He thought secession would collapse from internal disagreement. Instead he must become a war president while learning strategy from books and generals who move too slowly.",
    image: "images/story/lincoln-sumter.webp",
    tags: ["Fort Sumter", "Civil War", "volunteers"]
  },
  "54": {
    title: "Gettysburg and the Emancipation Proclamation",
    body: "After Antietam he issues the Emancipation Proclamation, freeing slaves in rebel territory as a war measure. At Gettysburg he dedicates a cemetery in two minutes. The address reframes the war as a test whether any nation built on liberty can endure. Garry Wills later calls those words the new Constitution Americans hear in memory.",
    image: "images/story/lincoln-gettysburg.webp",
    tags: ["Gettysburg Address", "Emancipation", "1863"]
  },
  "53": {
    title: "Grant and the long search for a general",
    body: "For years Lincoln fires and hires generals who will not pursue the enemy. McClellan, Burnside, Hooker: caution and slaughter by turns. He backs Ulysses S. Grant after Vicksburg splits the Confederacy in half. Grant fights. Lincoln's line to critics is simple: I cannot spare this man; he fights. The war finally gets a commander who matches its brutality.",
    image: "images/story/lincoln-grant.webp",
    tags: ["Grant", "Vicksburg", "generals"]
  },
  "55-surrender": {
    title: "Appomattox and five days of peace",
    body: "Lee surrenders at Appomattox Court House in April 1865. Lincoln asks the band to play Dixie. He speaks publicly of malice toward none and charity for all. For five days the country breathes like a patient after surgery. Then Booth walks into Ford's Theatre with a derringer. Victory and martyrdom arrive in the same week.",
    image: "images/story/lincoln-appomattox.webp",
    tags: ["Appomattox", "Lee", "1865"]
  },
  "56": {
    title: "Victory, then Ford's Theatre",
    body: "Lee surrenders at Appomattox. Five days later Lincoln attends Our American Cousin at Ford's Theatre. John Wilkes Booth, actor and Confederate sympathizer, shoots him in the head. He dies across the street at dawn. The war ends with a martyr and a country that must reconstruct itself without the man who held the center.",
    image: "images/story/lincoln-assassination.webp",
    tags: ["Ford's Theatre", "Booth", "assassination"]
  }
});

// src/stories/oppenheimer.ts
var oppenheimerStories = defineStories("Oppenheimer", {
  "0": {
    title: "Born rich in New York, hungry for depth",
    body: "Julius Oppenheimer makes a fortune in textiles; his son Robert grows up in an apartment with Van Gogh and Picasso on the walls and tutors for Greek, French, and chemistry. Wealth removes material worry and leaves intellectual restlessness. He collects minerals, reads poetry, and learns early that brilliance without direction can curdle into loneliness.",
    image: "images/story/oppenheimer-born.webp",
    tags: ["New York", "childhood", "minerals"]
  },
  "14": {
    title: "The mineral club lecture at fourteen",
    body: "He writes the New York Mineralogical Club about his collection. They invite the author to lecture, expecting an adult. A tall, thin boy walks in and delivers a competent talk on crystal structure. The anecdote follows him forever as proof of precocity, and as the first sign he will live inside institutions that reward the mind more than the body.",
    image: "images/story/oppenheimer-mineral-club.webp",
    tags: ["mineralogy", "precocity", "lecture"]
  },
  "25": {
    title: "Berkeley and the school he builds",
    body: "At Berkeley he turns a backwater into a world center of theoretical physics. Students say his lectures feel like revelation and terror. He reads Sanskrit, learns Dutch to read a paper, and juggles affairs, politics, and quantum theory with the same restless intensity. California becomes his kingdom of equations.",
    image: "images/story/oppenheimer-berkeley.webp",
    tags: ["Berkeley", "theoretical physics", "lectures"]
  },
  "35": {
    title: "Black holes before the name exists",
    body: "In 1939 he and Hartland Snyder publish a paper showing that a massive enough star could collapse past any limit, trapping light. The physics is ahead of its time. Decades later the word black hole arrives and the idea becomes central. Oppenheimer moves on to war before the cosmos gives him credit.",
    image: "images/story/oppenheimer-black-holes.webp",
    tags: ["Hartland Snyder", "collapse", "1939 paper"]
  },
  "39": {
    title: "Los Alamos: a town built to destroy cities",
    body: "General Groves picks him to lead the secret laboratory in the New Mexico desert. Scientists who hated each other in peacetime now share one goal: build a bomb before Nazi Germany. Oppenheimer learns project management by force of personality, guilt, and eighteen-hour days. The mesa becomes a monastery whose god is fission.",
    image: "images/story/oppenheimer-los-alamos.webp",
    tags: ["Los Alamos", "Manhattan Project", "Groves"]
  },
  "41": {
    title: "Trinity: now I am become Death",
    body: "Before dawn on 16 July 1945 the Gadget detonates at Trinity Site. The desert flash turns sand to glass. He remembers the Bhagavad Gita: Now I am become Death, the destroyer of worlds. Weeks later Hiroshima and Nagasaki burn. Victory tastes like ash. He will spend the rest of his life arguing with what he helped create.",
    image: "images/story/oppenheimer-trinity.webp",
    tags: ["Trinity", "Bhagavad Gita", "1945"]
  },
  "43": {
    title: "Institute director in Princeton's quiet",
    body: "After the war he directs the Institute for Advanced Study, recruiting Einstein and others. He advises on atomic policy, then clashes with officials who want more bombs and tighter secrecy. The man who built the weapon becomes a public voice for international control. Washington grows suspicious of his past associations.",
    image: "images/story/oppenheimer-ias.webp",
    tags: ["Institute for Advanced Study", "Princeton", "atomic policy"]
  },
  "50": {
    title: "The security hearing that strips his clearance",
    body: "In 1954 a secret board revokes his security clearance over old Communist contacts and his opposition to the hydrogen bomb. Edward Teller testifies against him. Colleagues divide. The verdict humiliates a national hero in quasi-judicial silence. He keeps teaching, keeps speaking, and lives with the label traitor in rooms that once cheered him.",
    image: "images/story/oppenheimer-hearing.webp",
    tags: ["security hearing", "Teller", "1954"]
  },
  "52": {
    title: "Einstein's letter and the weapon he did not want to build alone",
    body: "In 1939 Leó Szilárd and others persuade Einstein to warn Roosevelt that Nazi Germany might build a bomb first. The letter reaches the president; committees form; money flows. Oppenheimer is not the author, but the chain leads to Los Alamos and to him. Physics becomes a race where second place may mean annihilation.",
    image: "images/story/oppenheimer-einstein-letter.webp",
    tags: ["Einstein", "Szilárd", "1939"]
  },
  "59": {
    title: "The Fermi Award and a partial apology",
    body: "Nine years after the security hearing humiliated him, Kennedy awards the Enrico Fermi Prize. Johnson hands him the medal in 1963 while clearance stays revoked. Colleagues stand; cameras flash. The government honors the man it barred from secrets. Rehabilitation arrives late, like forgiveness written in bureaucratic ink.",
    image: "images/story/oppenheimer-fermi-award.webp",
    tags: ["Fermi Award", "1963", "Kennedy"]
  },
  "62": {
    title: "Throat cancer and the look when the sky turned white",
    body: "He dies of throat cancer in 1967, a chain smoker to the end. The arc of his life runs from wunderkind to destroyer to cautionary prophet. Physicists still quote him less for equations than for the look on his face when the desert flash turned sand to glass.",
    image: "images/story/oppenheimer-death.webp",
    tags: ["legacy", "1967", "Trinity"]
  }
});

// src/stories/leonardo.ts
var leonardoStories = defineStories("Leonardo", {
  "0": {
    title: "Illegitimate in Vinci, legitimate in talent",
    body: "Leonardo is born out of wedlock in Vinci, which bars him from guilds and university in Florence. That exclusion pushes him toward workshops where hands matter more than pedigree. He keeps notebooks no one fully reads in his lifetime. Paper becomes his true university.",
    image: "images/story/leonardo-born.webp",
    tags: ["Vinci", "illegitimate", "notebooks"]
  },
  "14": {
    title: "Apprentice in Verrocchio's bottega",
    body: "In Florence he joins Andrea del Verrocchio's workshop, painting, casting bronze, and learning anatomy from dissection when he can. Legend says he paints an angel so vivid Verrocchio never touches figures again. Whether true or not, the story captures a pupil who outgrows the master faster than etiquette allows.",
    image: "images/story/leonardo-verrocchio.webp",
    tags: ["Verrocchio", "Florence", "apprentice"]
  },
  "17": {
    title: "The angel that outshines the master",
    body: "In Verrocchio's Baptism of Christ, Leonardo paints the left angel and distant landscape. Vasari later claims Verrocchio never painted a figure again after seeing the pupil's work. The tale may be embroidery, but the panel survives: soft light, living flesh, a face that looks inward. Workshop training ends where individual vision begins.",
    image: "images/story/leonardo-baptism-angel.webp",
    tags: ["Verrocchio", "Baptism of Christ", "angel"]
  },
  "30": {
    title: "Milan: engineer to the Duke",
    body: "He writes Ludovico Sforza a letter offering war machines, architecture, and art, burying painter near the bottom. Milan gives him decades of patronage, court spectacle, and problems worth drawing. The Last Supper and horse monuments live here. So do hundreds of pages on water, flight, and the human heart.",
    image: "images/story/leonardo-milan.webp",
    tags: ["Ludovico Sforza", "Milan", "patronage"]
  },
  "50": {
    title: "Engineer for Cesare Borgia",
    body: "Leonardo serves Cesare Borgia as military architect, mapping fortresses and planning siege works across the Romagna. He meets Machiavelli on the road. For a year art and war share the same notebook margins. When Borgia falls, Leonardo moves on, leaving maps that armies will still use.",
    image: "images/story/leonardo-borgia.webp",
    tags: ["Cesare Borgia", "Romagna", "fortifications"]
  },
  "43": {
    title: "The Last Supper on a dry wall",
    body: "He paints Christ and the apostles reacting to betrayal on a refectory wall in Milan, experimenting with oil on dry plaster. The technique fails and the image begins flaking within his lifetime. Even as a ruin it teaches painters how to stage emotion like theatre. Judas reaches for bread while disciples explode in gesture.",
    image: "images/story/leonardo-last-supper.webp",
    tags: ["Last Supper", "Santa Maria delle Grazie", "fresco"]
  },
  "51": {
    title: "Mona Lisa and the sfumato smile",
    body: "He works on a portrait of Lisa del Giocondo across years, layering thin glazes until edges dissolve like smoke. Sfumato makes her smile refuse a single reading. He keeps the painting with him until death. Crowds today queue for a small panel because one face learned how to hide its own certainty.",
    image: "images/story/leonardo-mona-lisa.webp",
    tags: ["Mona Lisa", "sfumato", "portrait"]
  },
  "58": {
    title: "Dissections by candlelight",
    body: "In hospitals and morgues he cuts open corpses to see how tendons pull fingers and how the heart moves blood. His drawings surpass contemporary medicine. The church and custom limit what he can publish. Knowledge piles in notebooks while Europe still argues ancient Galen.",
    image: "images/story/leonardo-anatomy.webp",
    tags: ["anatomy", "dissection", "notebooks"]
  },
  "61": {
    title: "Flying machines on paper",
    body: "He studies birds, bats, and airflow, sketching ornithopters and screw-driven helicopters centuries before materials exist to build them. Failure does not discourage him; it refines the drawing. His genius is often the question beautifully posed rather than the device that flies.",
    image: "images/story/leonardo-flight.webp",
    tags: ["flight", "ornithopter", "engineering"]
  },
  "64": {
    title: "King Francis calls him master",
    body: "In 1516 Francis I of France invites Leonardo to Amboise and gives him Clos Lucé manor. The king calls him master, though the hands that painted are stiffening. Leonardo brings the Mona Lisa and unfinished projects across the Alps. France buys the legend; Italy keeps the workshops he left behind.",
    image: "images/story/leonardo-francis.webp",
    tags: ["Francis I", "Amboise", "Clos Lucé"]
  },
  "67": {
    title: "Dies in France with notebooks unfinished",
    body: "King Francis I gives him a manor at Amboise. Leonardo dies in 1519 with stacks of unpublished pages: mirrors, maps, weapons, hydraulics, faces. He apologizes to God and man for leaving so much undone. Later collectors scatter the notebooks. Every sheet suggests a life wider than any single profession could hold.",
    image: "images/story/leonardo-death.webp",
    tags: ["Amboise", "notebooks", "Renaissance"]
  }
});

// src/stories/galileo.ts
var galileoStories = defineStories("Galileo", {
  "0": {
    title: "Born in Pisa the year Shakespeare will never see",
    body: "Galileo Galilei is born in Pisa in 1564, the same year Michelangelo dies and Shakespeare is born. His father wants him in medicine; the son prefers mathematics and motion. Tuscany gives him a merchant's practicality and a habit of measuring what priests prefer to declare.",
    image: "images/story/galileo-born.webp",
    tags: ["Pisa", "1564", "childhood"]
  },
  "22": {
    title: "The hydrostatic balance that embarrasses professors",
    body: "As a young mathematician he writes on the hydrostatic balance and shows how to weigh alloys to expose fraud in crown metal. The work wins patronage from the Medici and annoys Aristotelians who trust theory over scales. Galileo's career begins by proving experts wrong with a bucket and a beam.",
    image: "images/story/galileo-hydrostatic.webp",
    tags: ["hydrostatic balance", "Medici", "1586"]
  },
  "19": {
    title: "The lamp in Pisa cathedral",
    body: "Watching a chandelier swing in the cathedral, he compares its rhythm to his pulse and notices the period stays steady even as the arc shrinks. The story may be partly legend, but it captures how he sees physics in ordinary motion. Pendulums later guide clocks. The cathedral becomes a laboratory without permission.",
    image: "images/story/galileo-pendulum.webp",
    tags: ["Pisa", "pendulum", "cathedral"]
  },
  "25": {
    title: "Falls out with professors over motion",
    body: "At Pisa he challenges Aristotelian teaching that heavier objects fall faster. Rumors say he drops weights from the Leaning Tower; evidence is thin, but his experiments with inclined planes are real and decisive. Universities prefer ancient authority. Galileo prefers what rolls down a ramp and leaves marks.",
    image: "images/story/galileo-inclined-plane.webp",
    tags: ["Pisa", "motion", "Aristotle"]
  },
  "45": {
    title: "Builds the telescope that changes the sky",
    body: "Hearing about Dutch spyglasses, he grinds lenses until magnification reaches twenty times. Pointing it at the Moon reveals mountains. Jupiter shows moons. The Milky Way becomes stars. The heavens stop being perfect spheres and turn into places you can map. Venice gives him a raise; Copernicus gets evidence.",
    image: "images/story/galileo-telescope.webp",
    tags: ["telescope", "Venice", "observation"]
  },
  "46": {
    title: "Medici stars around Jupiter",
    body: "He discovers four moons orbiting Jupiter and names them the Medici stars to flatter his patron. The finding kills the old idea that everything circles Earth. If moons circle Jupiter, Earth can circle the Sun without being special in the wrong way. Theology will hate the implication.",
    image: "images/story/galileo-jupiter-moons.webp",
    tags: ["Jupiter", "Medici", "moons"]
  },
  "48": {
    title: "Sunspots and the phases of Venus",
    body: "His observations show blemishes on the Sun and phases of Venus that fit Copernicus, not Ptolemy. He publishes in Italian so merchants and artisans can read him, not only Latin scholars. He writes with sarcasm sharp enough to make enemies who outrank him.",
    image: "images/story/galileo-venus-phases.webp",
    tags: ["sunspots", "Venus", "Copernicus"]
  },
  "52": {
    title: "First warning from the Inquisition",
    body: "Church authorities tell him to treat Copernicanism as math, not truth. He stays quiet for years, then friends become pope and he thinks the sky clears. He will test that hope with a book that puts church arguments in the mouth of a fool named Simplicio. Rome remembers.",
    image: "images/story/galileo-inquisition-warning.webp",
    tags: ["Inquisition", "1616", "Copernicanism"]
  },
  "68": {
    title: "Dialogue and the trial",
    body: "His Dialogue Concerning the Two Chief World Systems argues for Earth in motion. Pope Urban VIII feels mocked. Galileo is called to Rome to face the Inquisition.",
    image: "images/story/galileo-dialogue.webp",
    tags: ["Dialogue", "1632", "Urban VIII"]
  },
  "69": {
    title: "Condemned and made to kneel",
    body: "He is shown instruments of torture and abjures Copernicanism on his knees. Legend says he mutters and yet it moves. House arrest follows for the rest of his life.",
    image: "images/story/galileo-trial.webp",
    tags: ["trial", "recant", "Inquisition"]
  },
  "74": {
    title: "Smuggles out Two New Sciences",
    body: "Under arrest in Arcetri he finishes work on strength of materials and accelerated motion, dictating when blind. The book is published in Leiden beyond Rome's reach. Modern physics walks out in prose while the man who wrote it stays in a villa overlooking Florence.",
    image: "images/story/galileo-two-sciences.webp",
    tags: ["Two New Sciences", "Arcetri", "physics"]
  },
  "77": {
    title: "Blind, under arrest, still arguing",
    body: "He dies in 1642 under house arrest, still corresponding with students across Europe. The Church eventually apologizes centuries later. His real verdict was already written in the sky anyone could see with glass and nerve.",
    image: "images/story/galileo-death.webp",
    tags: ["Arcetri", "legacy", "1642"]
  }
});

// src/stories/beethoven.ts
var beethovenStories = defineStories("Beethoven", {
  "0": {
    title: "Born in Bonn between two musical worlds",
    body: "Ludwig van Beethoven is born in Bonn in 1770 while Mozart is still a teenager and Haydn is shaping Vienna. His grandfather was Kapellmeister; his father is a failed singer with drink. The boy inherits talent and a household where music is both ladder and weapon.",
    image: "images/story/beethoven-born.webp",
    tags: ["Bonn", "1770", "family"]
  },
  "46": {
    title: "Late quartets while the world goes quiet",
    body: "In his forties he is functionally deaf, quarreling with relatives over a nephew, and writing string quartets that listeners call incomprehensible and then sacred. Opus 131 and 132 treat suffering as material. Players still argue over them in rehearsal rooms. Deafness did not shorten ambition; it deepened it.",
    image: "images/story/beethoven-late-quartets.webp",
    tags: ["late quartets", "deafness", "Op. 131"]
  },
  "4": {
    title: "His father drills him like a prodigy act",
    body: "Johann van Beethoven advertises his son as a young Mozart, pounding keyboard drills and beating him when practice falters. Neighbors in Bonn hear the child weeping through walls. The abuse forges technique and resentment. Ludwig will spend adulthood proving music is choice, not coercion.",
    image: "images/story/beethoven-father.webp",
    tags: ["Bonn", "Johann van Beethoven", "childhood"]
  },
  "21": {
    title: "Vienna and the shadow of Haydn",
    body: "He moves to Vienna to study with Haydn and others, quickly outgrowing teachers. Aristocrats hire him as pianist and composer. He insults patrons and keeps getting hired because rooms change when he plays. The capital of classical music becomes his arena.",
    image: "images/story/beethoven-vienna.webp",
    tags: ["Vienna", "Haydn", "patrons"]
  },
  "28": {
    title: "The deafness begins in secret",
    body: "He notices ringing and muffled speech in his late twenties. Doctors fail him. He hides it from audiences while crashing pianos to feel vibration through the floor. A man whose life is sound starts living inside his skull. The cruelest joke in music history begins quietly.",
    image: "images/story/beethoven-deafness.webp",
    tags: ["deafness", "Heiligenstadt", "illness"]
  },
  "32": {
    title: "Heiligenstadt testament to his brothers",
    body: "In a letter near Vienna he confesses despair over deafness and thoughts of suicide, then vows to live for art. The Heiligenstadt Testament reads like a will and a rebirth on the same page. He chooses composition over silence. What follows is louder than hearing ever was.",
    image: "images/story/beethoven-heiligenstadt.webp",
    tags: ["Heiligenstadt Testament", "1802", "resolve"]
  },
  "34": {
    title: "Eroica: Napoleon breaks the dedication",
    body: "He writes a symphony of heroic scale and dedicates it to Napoleon, the consul who seemed to embody Enlightenment. When Napoleon crowns himself emperor, Beethoven tears the dedication in rage. The music remains revolutionary even when politics disappoints. Form expands to fit anger and hope.",
    image: "images/story/beethoven-eroica.webp",
    tags: ["Eroica", "Napoleon", "Symphony No. 3"]
  },
  "38": {
    title: "Fifth and Sixth: fate and pasture",
    body: "In one concert he premieres the Fifth Symphony with its four-note knock of fate and the Pastoral Sixth with brooks and storms painted in sound. Critics complain length and difficulty. Audiences later treat both as birth certificates of modern music. He conducts while deafness advances.",
    image: "images/story/beethoven-fifth.webp",
    tags: ["Fifth Symphony", "Pastoral", "1808"]
  },
  "54": {
    title: "Ninth: Ode to Joy while stone deaf",
    body: "At the Ninth's premiere he stands between conductor and orchestra, turning pages he cannot fully hear. When the chorus ends, he keeps conducting until a singer turns him to face applause he cannot hear but can see. Schiller's ode to human brotherhood becomes Europe's unofficial anthem. Deafness did not win.",
    image: "images/story/beethoven-ninth.webp",
    tags: ["Ninth Symphony", "Ode to Joy", "1824"]
  },
  "56": {
    title: "Thunderstorm over Vienna",
    body: "He dies in 1827 during a thunderstorm, fists clenched, manuscripts scattered. Thousands attend the funeral. His development from Classical clarity to Romantic storm rewired what music could express. Late quartets still baffle and move players two centuries later.",
    image: "images/story/beethoven-death.webp",
    tags: ["Vienna", "funeral", "legacy"]
  }
});

// src/stories/turing.ts
var turingStories = defineStories("Turing", {
  "0": {
    title: "Born in London before the century of machines",
    body: "Alan Mathison Turing is born in 1912 in London, the second son of a civil servant in India and a woman who reads science for pleasure. Nannies raise him while parents work abroad. He grows up precise, lonely, and already treating the world as a puzzle with hidden rules.",
    image: "images/story/turing-born.webp",
    tags: ["London", "1912", "childhood"]
  },
  "16": {
    title: "Christopher Morcom and the ghost in the equations",
    body: "At Sherborne he bonds with Christopher Morcom, a brilliant schoolmate who shares his love of mathematics and chemistry. Morcom dies of tuberculosis at eighteen. Turing keeps writing to Morcom's mother and later says he carried on their work as if the dead boy were still beside him. Grief becomes fuel for thought.",
    image: "images/story/turing-morcom.webp",
    tags: ["Christopher Morcom", "Sherborne", "grief"]
  },
  "13": {
    title: "Cycles sixty miles when the trains stop",
    body: "When a general strike cancels trains to his first day at Sherborne School, Alan Turing rides a bicycle sixty miles with a tin of scientific equipment. Headmaster reports him for looking like a tramp. The episode previews a life that treats physical inconvenience as irrelevant compared to the problem waiting at the desk.",
    image: "images/story/turing-bicycle-school.webp",
    tags: ["Sherborne", "bicycle", "school"]
  },
  "24": {
    title: "The universal machine on paper",
    body: "In 1936 he publishes On Computable Numbers and imagines a machine that reads symbols on a tape and performs any logical procedure. The Turing machine is theory, not hardware, yet it defines what computers are. At twenty-four he proves some problems cannot be solved by any algorithm. Limits become as important as powers.",
    image: "images/story/turing-universal-machine.webp",
    tags: ["Turing machine", "1936", "computability"]
  },
  "27": {
    title: "Bletchley Park and the Enigma war",
    body: "When war begins he joins the codebreaking center at Bletchley Park. Nazi Enigma machines scramble messages daily. Breaking them saves convoys and lives. Turing works in Hut 8 on naval codes, thinking in diagrams and silence while Britain tells the world nothing.",
    image: "images/story/turing-bletchley.webp",
    tags: ["Bletchley Park", "Enigma", "Hut 8"]
  },
  "27-bombe": {
    title: "The Bombe that searches possibilities",
    body: "He designs the Bombe, an electromechanical device that eliminates Enigma settings faster than human clerks. Each improvement shortens the Atlantic war. Historians argue over exact casualty numbers saved; the direction is clear. Industrial cryptography is born in a Victorian mansion of crossword puzzle minds.",
    image: "images/story/turing-bombe.webp",
    tags: ["Bombe", "cryptanalysis", "Enigma"]
  },
  "30": {
    title: "Atlantic convoys start getting through",
    body: "By 1942 his methods and machines help locate U-boats before they cluster on convoys. Merchant ships reach Britain with food and materiel. The work stays secret for decades. Turing returns to civilian science without parade or pension worthy of what he did.",
    image: "images/story/turing-atlantic.webp",
    tags: ["U-boats", "convoys", "war"]
  },
  "38": {
    title: "Can machines think?",
    body: "In 1950 he proposes the imitation game: if a machine converses well enough to fool a judge, treat it as intelligent for practical purposes. The Turing test names an era's anxiety about minds and metal. He also writes on morphogenesis, chess programs, and whether souls need biology.",
    image: "images/story/turing-test.webp",
    tags: ["Turing test", "1950", "AI"]
  },
  "40": {
    title: "Prosecuted for homosexuality",
    body: "After a burglary investigation he reports a relationship with a man. Britain convicts him of gross indecency. He chooses chemical castration over prison. Security clearance vanishes. The state he helped save dismantles his career because of who he loves.",
    image: "images/story/turing-prosecution.webp",
    tags: ["prosecution", "1952", "indecency"]
  },
  "41": {
    title: "Cyanide apple at forty-one",
    body: "He dies in 1954 from cyanide poisoning, an apple by the bed. Inquest rules suicide; some colleagues suspect accident. He was working on morphogenesis until the end. Apologies and pardons arrive after he cannot read them. Every computer is a footnote to a man Britain betrayed.",
    image: "images/story/turing-death.webp",
    tags: ["1954", "legacy", "computing"]
  }
});

// src/stories/jobs.ts
var jobsStories = defineStories("Jobs", {
  "0": {
    title: "Adopted in the Bay Area with a contract on his future",
    body: "Steven Paul Jobs is born in San Francisco and placed for adoption the same week. His biological mother insists the parents be college graduates; Paul and Clara Jobs are working class but promise she will attend college. They raise him in Mountain View as the valley is turning from orchards into something stranger. He grows up feeling chosen and slightly special, which can cut both ways.",
    image: "images/story/jobs-born.webp",
    tags: ["adoption", "Mountain View", "1955"]
  },
  "13": {
    title: "Twelve years old and on the phone with Bill Hewlett",
    body: "Jobs wants parts for a frequency counter and finds Hewlett-Packard's number in the phone book. He calls the house and Bill Hewlett himself answers. The boy asks for parts; Hewlett laughs, sends them, and offers a summer job on the assembly line. Silicon Valley before the myth learns that audacity plus a polite voice can open doors adults assume are locked.",
    image: "images/story/jobs-hewlett.webp",
    tags: ["HP", "Bill Hewlett", "1968"]
  },
  "17": {
    title: "Calligraphy at Reed after dropping out",
    body: "Jobs enrolls at Reed College, burns through his working-class parents' savings, and drops out rather than waste their money. He keeps sleeping on dorm floors and auditing classes for free. A calligraphy course teaches him about serif and sans-serif, kerning, and beautiful whitespace. Years later he will say you cannot connect the dots looking forward. The Mac will ship with multiple typefaces because a dropout once cared about letterforms.",
    image: "images/story/jobs-calligraphy.webp",
    tags: ["Reed College", "calligraphy", "1972"]
  },
  "18": {
    title: "Blue Boxes in a dorm room with Woz",
    body: "With Steve Wozniak he builds Blue Boxes that mimic phone tones and trick the long-distance network. They almost call the Vatican. Jobs later says if not for those illegal boxes there would be no Apple. The partnership is set early: Woz as wizard, Jobs as the one who sees product and nerve where others see a prank.",
    image: "images/story/jobs-blue-box.webp",
    tags: ["Wozniak", "Blue Box", "phone phreaking"]
  },
  "19": {
    title: "India, ashrams, and a shaved head",
    body: "He travels to India with a Reed friend seeking enlightenment after the death of his hero Kobun Chino's teacher. He treks barefoot, gets dysentery, and returns with robes, a shaved head, and skepticism toward orthodox religion but hunger for experience. Eastern aesthetics will later show up in Apple packaging and in the way he talks about intuition over market research.",
    image: "images/story/jobs-india.webp",
    tags: ["India", "1974", "spiritual search"]
  },
  "21": {
    title: "The garage, the order, the first Apple Computer",
    body: "In his parents' Los Altos garage he and Woz sell fifty Apple I boards to a local store. Jobs haggles, Woz wires, neither sleeps much. They are twenty and twenty-five, long hair and no suits, betting that ordinary people might want machines only engineers currently touch. The name is friendly on purpose. The myth of the two Steves starts here, in a suburban driveway.",
    image: "images/story/jobs-garage.webp",
    tags: ["Apple I", "garage", "1976"]
  },
  "22": {
    title: "VisiCalc turns the Apple II into a business machine",
    body: "The Apple II is open, colorful, and underpowered for skeptics until VisiCalc arrives: the first spreadsheet runs on Jobs and Woz's box and suddenly finance departments need one on every desk. Apple goes from hobbyist darling to company with revenue. Jobs learns that killer applications, not specs alone, can redefine what a machine is for.",
    image: "images/story/jobs-apple-ii.webp",
    tags: ["Apple II", "VisiCalc", "1977"]
  },
  "29": {
    title: "Macintosh and the hammer on the screen",
    body: "After years of internal war between the Apple II camp and the Mac team, Jobs unveils a machine with a mouse and icons. The Super Bowl ad shows a woman shattering conformity with a hammer. Inside Apple he has screamed at engineers to make the rectangle rounded until it feels friendly. The Mac is a statement that computers should speak human, not only engineer.",
    image: "images/story/jobs-macintosh.webp",
    tags: ["Macintosh", "1984 ad", "Xerox PARC"]
  },
  "30": {
    title: "Ousted from the company he built",
    body: "CEO John Sculley, whom Jobs recruited from Pepsi, joins the board in turning against him. The Macintosh team fractures; sales disappoint. In 1985 the board strips his operating role. Jobs tells friends he has been rejected by his own creation. He sells all but one share out of spite, then walks out into exile with money, rage, and nothing to manage.",
    image: "images/story/jobs-exile.webp",
    tags: ["Sculley", "1985", "board coup"]
  },
  "31": {
    title: "Pixar: buying George Lucas's unwanted computer division",
    body: "He buys the graphics group Lucasfilm no longer wants, renames it Pixar, and bleeds cash for years on expensive workstations. He negotiates with Disney while nearly going broke. The bet is that storytelling plus software might matter more than beige boxes. When Toy Story finally renders, he will have been right in a field he did not plan to own.",
    image: "images/story/jobs-pixar.webp",
    tags: ["Pixar", "Lucasfilm", "1986"]
  },
  "40": {
    title: "Toy Story opens while Apple still bleeds",
    body: "Pixar releases Toy Story, the first feature-length computer animated film, to raves and box office. Jobs owns most of a studio suddenly worth billions while Apple, the company that fired him, stumbles toward bankruptcy without him. The exile decade ends with proof he can build culture, not only circuits. NeXT software waits in the wings for a reunion he does not yet know is coming.",
    image: "images/story/jobs-toy-story.webp",
    tags: ["Toy Story", "Pixar", "1995"]
  },
  "42": {
    title: "Return to an Apple nine weeks from broke",
    body: "Apple buys NeXT for its operating system and gets Jobs as advisor. Within months he is interim CEO of a company losing a billion dollars a year, mocked as a corpse. He kills dozens of products in one stroke, makes a deal with Microsoft on stage to gasps, and launches Think Different ads that sound like autobiography. Survival comes before glory.",
    image: "images/story/jobs-return.webp",
    tags: ["NeXT", "1997", "turnaround"]
  },
  "46": {
    title: "A thousand songs in your pocket",
    body: "After the iMac saves the desktop, Jobs bets Apple can own music after Napster terrified the labels. The iPod is smaller than rivals, paired with white headphones that become a status signal, and synced through iTunes on a Mac. He demos on stage like a magician pulling a hard drive from jeans. Apple is no longer only a computer company; it sells taste in your ear.",
    image: "images/story/jobs-ipod.webp",
    tags: ["iPod", "2001", "iTunes"]
  },
  "52": {
    title: "One device: iPhone and the poisoned QWERTY",
    body: "On stage in 2007 he teases three devices, then reveals one phone that is also a widescreen iPod and internet communicator. The crowd understands before competitors do that screens will eat keyboards. He has been sick; the rehearsal perfectionism is fiercer than ever. The phone in your pocket becomes the platform that remakes maps, photos, news, and how humans ignore each other at dinner.",
    image: "images/story/jobs-iphone.webp",
    tags: ["iPhone", "2007", "keynote"]
  },
  "56": {
    title: "Death with Apple the most valuable company on earth",
    body: "Pancreatic cancer diagnosed in 2003 returns after a liver transplant and years of thin, fierce keynotes. He steps down as CEO in August 2011 and dies at home in Palo Alto in October. Apple outlives him as the firm he wanted: closed gardens, beautiful objects, and customers who camp overnight for glass rectangles. The garage kid becomes the era's defining taste-maker, loved and feared in equal measure.",
    image: "images/story/jobs-death.webp",
    tags: ["2011", "legacy", "Apple"]
  }
});

// src/stories/gallery-items.ts
var MODULES = [
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
  ["Jobs", jobsStories]
];
function storyGalleryItems() {
  const items = [];
  const seen = new Set;
  for (const [figure, stories] of MODULES) {
    for (const story2 of Object.values(stories)) {
      if (seen.has(story2.image))
        continue;
      seen.add(story2.image);
      const slug = story2.image.replace(/^images\/story\//, "").replace(/\.webp$/, "");
      items.push({
        figure,
        slug,
        title: story2.title,
        image: story2.image,
        tags: story2.tags
      });
    }
  }
  return items.sort((a, b) => a.figure.localeCompare(b.figure) || a.slug.localeCompare(b.slug));
}

// src/gallery.ts
var items = storyGalleryItems();
var figures = [...new Set(items.map((i) => i.figure))].sort();
var grid = document.getElementById("galleryGrid");
var stats = document.getElementById("galleryStats");
var chips = document.getElementById("galleryChips");
var q = document.getElementById("gallerySearch");
var activeFigure = "all";
var query = "";
function assetUrl(image) {
  return `../${image}`;
}
function matches(item) {
  if (activeFigure !== "all" && item.figure !== activeFigure)
    return false;
  if (!query)
    return true;
  const hay = `${item.figure} ${item.slug} ${item.title} ${item.tags.join(" ")}`.toLowerCase();
  return hay.includes(query);
}
function renderStats(ready) {
  stats.textContent = `${ready} ready · ${items.length - ready} missing · ${items.length} total`;
}
function renderChips() {
  chips.replaceChildren();
  for (const label of ["all", ...figures]) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = label === "all" ? "All" : label;
    btn.setAttribute("aria-pressed", String(activeFigure === label));
    btn.addEventListener("click", () => {
      activeFigure = label;
      renderChips();
      renderGrid();
    });
    chips.appendChild(btn);
  }
}
function updateStats() {
  renderStats(grid.querySelectorAll(".card.ready").length);
}
function renderGrid() {
  grid.replaceChildren();
  const visible = items.filter(matches);
  for (const item of visible) {
    const card = document.createElement("article");
    card.className = "card";
    const media = document.createElement("div");
    media.className = "media";
    const img = document.createElement("img");
    img.alt = item.title;
    img.loading = "lazy";
    img.decoding = "async";
    img.src = assetUrl(item.image);
    img.addEventListener("load", () => {
      card.classList.add("ready");
      updateStats();
    });
    img.addEventListener("error", () => {
      card.classList.add("missing");
      media.classList.add("missing");
      updateStats();
    });
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = "missing";
    media.append(img, badge);
    const body = document.createElement("div");
    body.className = "body";
    const figure = document.createElement("div");
    figure.className = "figure";
    figure.textContent = item.figure;
    const title = document.createElement("h2");
    title.textContent = item.title;
    const slug = document.createElement("code");
    slug.textContent = item.slug;
    body.append(figure, title, slug);
    card.append(media, body);
    grid.append(card);
    if (img.complete && img.naturalWidth > 0) {
      card.classList.add("ready");
    }
  }
  updateStats();
}
q.addEventListener("input", () => {
  query = q.value.trim().toLowerCase();
  renderGrid();
});
renderChips();
renderGrid();

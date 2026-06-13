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

// src/stories/gates.ts
var gatesStories = defineStories("Gates", {
  "0": {
    title: "Born in Seattle to a lawyer and a school board leader",
    body: "William Henry Gates III arrives in 1955, the same year as Steve Jobs, in a city of Boeing engineers and rainy ambition. His father is a prominent attorney; his mother serves on corporate boards and charity committees. The family expects achievement without much warmth. Young Bill will learn to compete at dinner tables and on school playgrounds before he learns to compete in markets.",
    image: "images/story/gates-born.webp",
    tags: ["Seattle", "1955", "childhood"]
  },
  "13": {
    title: "Lakeside School buys a teletype and changes his life",
    body: "A mothers' club fundraiser puts a computer terminal in his private school. Gates and Paul Allen burn hours on it, trading bugs for more machine time. When the school runs out of budget, they find bugs in the commercial software and offer to fix them for free access. A thirteen-year-old discovers that code is leverage and that the adults who own the hardware can be outsmarted by kids who understand it.",
    image: "images/story/gates-lakeside.webp",
    tags: ["Lakeside", "teletype", "1968"]
  },
  "15": {
    title: "A scheduling program and a deliberate imbalance of girls",
    body: "He writes software to assign students to classes at Lakeside. The program works, but Gates tweaks the code so he lands in sections with more girls. Teachers eventually notice the bias. The anecdote becomes legend because it captures the whole career early: brilliant engineering married to naked self-interest, defended later as a joke everyone remembers.",
    image: "images/story/gates-scheduler.webp",
    tags: ["Lakeside", "1970", "programming"]
  },
  "17": {
    title: "Traf-O-Data reads traffic tapes for pocket money",
    body: "With Allen he starts Traf-O-Data, a company that processes raw traffic-counter tapes for municipal planners. The hardware barely works at a demo; the business fails. Gates keeps the lesson anyway: software tied to a real customer problem beats hobby projects. Within eight years he will sell operating systems to the biggest computer company on earth.",
    image: "images/story/gates-traf-o-data.webp",
    tags: ["Traf-O-Data", "1972", "startup"]
  },
  "19": {
    title: "Harvard dorm, Altair cover, and the Microsoft bet",
    body: "Gates drops out of Harvard in 1975 after Paul Allen waves an Popular Electronics cover showing the Altair kit computer. They call the maker claiming to have a BASIC interpreter ready; they do not. They write it in a panic, deliver it, and form Micro-Soft. The name will lose its hyphen. The strategy will not: be first on every new platform and charge for the layer everyone else needs.",
    image: "images/story/gates-microsoft.webp",
    tags: ["Harvard", "Altair", "1975"]
  },
  "25": {
    title: "The IBM deal that made DOS the default",
    body: "IBM wants an operating system for its personal computer but will not buy his company outright. Gates licenses DOS, which Microsoft bought cheaply from Seattle Computer Products, and keeps the right to sell it to others. IBM's brand puts PCs on every desk; clones follow; Microsoft collects on all of them. He is twenty-five and has turned a one-time purchase into a toll booth on the industry.",
    image: "images/story/gates-ibm.webp",
    tags: ["IBM", "DOS", "1980"]
  },
  "30": {
    title: "Windows 1.0 ships after years of vapor and mockery",
    body: "Apple's Macintosh has shown the world icons and mice. Gates announces Windows repeatedly before it exists, enraging Steve Jobs and confusing customers. Version 1.0 finally ships in 1985 to yawns. The product is clumsy but the direction is correct. Microsoft can afford to iterate while rivals sell hardware. The GUI war becomes a war of attrition, and Gates has the longer bank account.",
    image: "images/story/gates-windows.webp",
    tags: ["Windows", "1985", "GUI"]
  },
  "31": {
    title: "Microsoft goes public and mints a young billionaire",
    body: "The 1986 IPO values the company at hundreds of millions on day one. Gates retains a huge stake. Within a year he is the youngest billionaire in America, still looking like a college kid in glasses. Employees with stock options buy boats and houses in Seattle suburbs. The culture is brutal hours, sharp emails, and the belief that the next release matters more than sleep.",
    image: "images/story/gates-ipo.webp",
    tags: ["IPO", "1986", "billionaire"]
  },
  "40": {
    title: "Windows 95 and the sound of the startup chime",
    body: "After years of delay, Windows 95 launches with a Rolling Stones song and lines around Blockbuster stores. The Start button teaches millions to click instead of type commands. The internet is arriving at the same moment; Gates pivots the company hard toward the web. A forty-year-old nerd in a sweater becomes the face of the PC age at its peak, before the antitrust lawyers close in.",
    image: "images/story/gates-win95.webp",
    tags: ["Windows 95", "1995", "internet"]
  },
  "43": {
    title: "The United States sues the company he built",
    body: "The Justice Department accuses Microsoft of crushing Netscape and tying Internet Explorer to Windows. Gates videotaped depositions show him evasive and technical, which plays badly on television. The trial dominates the late nineties tech press. Whatever the legal outcome, the public story shifts: the boy genius is now a monopolist who must be checked.",
    image: "images/story/gates-antitrust.webp",
    tags: ["antitrust", "1998", "DOJ"]
  },
  "45": {
    title: "The foundation and the turn toward giving it away",
    body: "With his wife Melinda he launches the Bill and Melinda Gates Foundation, initially focused on libraries and global health. Vaccines, malaria, and sanitation replace product cycles as his obsession. Colleagues notice he reads WHO reports the way he once read BYTE magazine. The richest man on earth begins planning to die much poorer on purpose.",
    image: "images/story/gates-foundation.webp",
    tags: ["foundation", "2000", "philanthropy"]
  },
  "53": {
    title: "Leaves daily Microsoft to chase polio and toilets",
    body: "In 2008 he steps back from day-to-day operations at Microsoft to work full time on philanthropy. Ballmer runs the company; Gates flies to Africa and India with notebooks full of epidemiology. Critics say it is reputation laundering; admirers say he applies the same competitive focus to saving lives. Either way the era of Gates as software tyrant ends and Gates as global health financier begins.",
    image: "images/story/gates-retirement.webp",
    tags: ["2008", "philanthropy", "Microsoft exit"]
  },
  "66": {
    title: "Pledges to fall off the richest list while still alive",
    body: "In 2021 he announces he will give away nearly all his fortune and drop off the Forbes ranking. Divorce from Melinda complicates the public story but not the scale of the pledge. He spends hours on calls about climate tech and pandemic preparedness. The Lakeside kid who wanted machine time ends as the world's most famous donor, still arguing about spreadsheets at seventy.",
    image: "images/story/gates-pledge.webp",
    tags: ["2021", "pledge", "wealth"]
  }
});

// src/stories/bezos.ts
var bezosStories = defineStories("Bezos", {
  "0": {
    title: "Born in Albuquerque to a teenage mother",
    body: "Jeffrey Preston Jorgensen arrives in 1964 in a desert city that will later host his rocket pads. His mother Jacklyn is seventeen; his father leaves early. The family is scrappy, moving often, living on grit more than money. He will later say his grandfather on a Texas ranch taught him that problems are solvable if you stay calm and take them apart.",
    image: "images/story/bezos-born.webp",
    tags: ["Albuquerque", "1964", "childhood"]
  },
  "4": {
    title: "Miguel Bezos adopts him and gives him a new name",
    body: "His mother remarries a Cuban immigrant who fled Castro on a Operation Pedro Pan flight. Miguel Bezos adopts four-year-old Jeff and gives him his surname. The household becomes bilingual and disciplined. Jeff inherits a story about starting over in America with nothing but education and work. That narrative will later justify long hours and big bets.",
    image: "images/story/bezos-name.webp",
    tags: ["adoption", "1968", "family"]
  },
  "12": {
    title: "A bedroom alarm to keep siblings out of his space",
    body: "As a kid he rigs an electric alarm on his bedroom door to stop younger siblings from entering. He takes apart appliances to see how they work and puts some back together. Neighbors remember a intense, polite boy who already treats the house like a laboratory. The pattern is control of access, which becomes the business model of a lifetime.",
    image: "images/story/bezos-bedroom.webp",
    tags: ["childhood", "1976", "inventor"]
  },
  "18": {
    title: "Valedictorian speech dreaming of space colonies",
    body: "At Miami Palmetto High he graduates first in his class and tells classmates humanity should move industry off Earth and turn the planet into a park. Teachers think the speech is odd; he is serious. He goes to Princeton to study electrical engineering and computer science, not literature, because he wants tools to build systems, not essays about them.",
    image: "images/story/bezos-valedictorian.webp",
    tags: ["valedictorian", "1982", "space"]
  },
  "22": {
    title: "Princeton and the pull toward Wall Street",
    body: "He finishes Princeton summa cum laude in 1986 and joins a quant hedge fund called D.E. Shaw in New York. The firm uses computers to find edges in markets. Bezos rises fast because he combines math with operational hunger. He will later leave at thirty to start an internet bookstore, which colleagues think is insane. The safe path was already lucrative.",
    image: "images/story/bezos-princeton.webp",
    tags: ["Princeton", "1986", "D.E. Shaw"]
  },
  "30": {
    title: "Quits finance and drives west to start Amazon",
    body: "In 1994 he reads that web usage grows 2,300 percent a year and makes a list of products to sell online. Books win because there are millions of SKUs. He tells his boss he is leaving; his wife MacKenzie drives them to Seattle while he writes the business plan in the passenger seat. The company is named after the world's largest river. He expects it might fail.",
    image: "images/story/bezos-amazon.webp",
    tags: ["Amazon", "1994", "Seattle"]
  },
  "31": {
    title: "The first book sold from a garage with a bell",
    body: "Amazon.com goes live in July 1995. The first order is for Fluid Concepts and Creative Analogies. Employees ring a bell on every sale until sales volume makes it unbearable. Bezos packs boxes on the floor of a Bellevue garage. The site promises every book in print. Customers in rural towns discover a catalog bigger than any local shop.",
    image: "images/story/bezos-first-book.webp",
    tags: ["first sale", "1995", "books"]
  },
  "33": {
    title: "Amazon IPOs while skeptics call it Amazon.bomb",
    body: "The 1997 public offering raises capital to expand warehouses and lose money on purpose. Barron's later mocks the stock as Amazon.bomb. Bezos tells shareholders he cares about long-term market share, not quarterly profit. The letter becomes a cult document for founders who want permission to burn cash. Many will burn cash without building Amazon.",
    image: "images/story/bezos-ipo.webp",
    tags: ["IPO", "1997", "long term"]
  },
  "36": {
    title: "Blue Origin founded in secret like a hedge against Earth",
    body: "After watching Apollo documentaries as a child, he founds Blue Origin in 2000 with the motto Gradatim Ferociter, step by step ferociously. The goal is reusable rockets and eventually millions living in space. For years it is quieter than SpaceX. He sells Amazon stock to fund it. The bookstore king secretly wants to die on Mars, or at least launch there.",
    image: "images/story/bezos-blue-origin.webp",
    tags: ["Blue Origin", "2000", "rockets"]
  },
  "42": {
    title: "AWS turns spare server capacity into the cloud",
    body: "Amazon Web Services launches in 2006, renting the infrastructure built for retail to any developer with a credit card. The idea seems boring compared to shopping. It becomes the profit engine that funds everything else. Startups stop buying servers; the CIA buys cloud too. Bezos turns an internal efficiency hack into the operating system of the internet economy.",
    image: "images/story/bezos-aws.webp",
    tags: ["AWS", "2006", "cloud"]
  },
  "49": {
    title: "Buys The Washington Post with personal cash",
    body: "In 2013 he purchases the Post for $250 million personally, not through Amazon. Journalists worry the everything store owner will soften coverage. He installs new leadership and pushes digital subscriptions. The paper survives the collapse of print ads partly because a billionaire hobbyist treats news like a long-term Prime membership for democracy.",
    image: "images/story/bezos-wapo.webp",
    tags: ["Washington Post", "2013", "media"]
  },
  "53": {
    title: "Whole Foods and the conquest of the grocery aisle",
    body: "Amazon buys Whole Foods in 2017 for $13.7 billion, shocking brick-and-mortar rivals. Prime members get discounts; Alexa sits in kitchens. Critics see vertical integration of shopping from click to organic kale. Bezos sees another category to absorb. The company that started with books now wants everything in your house to arrive tomorrow.",
    image: "images/story/bezos-whole-foods.webp",
    tags: ["Whole Foods", "2017", "retail"]
  },
  "54": {
    title: "Passes Gates as the world's richest person",
    body: "Rising Amazon stock makes Bezos the wealthiest human on Forbes lists in 2018. Tabloids cover his biceps and his divorce. He remains awkward in interviews but ruthless in negotiations. The valedictorian who wanted space colonies now has money comparable to small nations. He will say the fortune is for Blue Origin. Investors say it is for everything.",
    image: "images/story/bezos-richest.webp",
    tags: ["2018", "wealth", "Forbes"]
  },
  "57": {
    title: "Steps down as CEO and rides New Shepard to space",
    body: "In 2021 he hands Amazon's CEO role to Andy Jassy and flies on Blue Origin's first crewed suborbital flight days later. Hat critics call it a vanity ride; he calls it proof of concept. He leaves daily retail operations to focus on rockets, climate fund grants, and owning a century-old newspaper. The garage bell has become a rocket roar.",
    image: "images/story/bezos-space.webp",
    tags: ["2021", "New Shepard", "CEO exit"]
  }
});

// src/stories/huang.ts
var huangStories = defineStories("Huang", {
  "0": {
    title: "Born in Tainan as Taiwan's chip age begins",
    body: "Jen-Hsun Huang arrives in 1963 in a southern Taiwanese city while the island is turning into an electronics factory for the world. His family will soon send him abroad for opportunity they cannot find at home. He grows up between cultures before Silicon Valley has a name for that experience. The boy who will sell GPUs to every AI lab starts where fabs are dreams and rice fields are real.",
    image: "images/story/huang-born.webp",
    tags: ["Tainan", "1963", "Taiwan"]
  },
  "9": {
    title: "Shipped to Kentucky with a dictionary and a suitcase",
    body: "At nine he and his brother join an uncle in the United States and land at a Oneida Baptist boarding school in Kentucky. He knows little English and cleans toilets while classmates play sports. Years later he jokes that Nvidia's leather jacket persona was forged in a southern dorm where he learned to survive by working harder than everyone else in the room.",
    image: "images/story/huang-kentucky.webp",
    tags: ["Kentucky", "1973", "immigration"]
  },
  "15": {
    title: "Dishwasher at Denny's before he designs chips",
    body: "In high school he works the graveyard shift at Denny's, scrubbing plates and watching short-order cooks move fast under pressure. He meets his future wife Lori in a lab at Oregon State. The future CEO of a trillion-dollar company learns service industry humility before he learns semiconductor layout. He will later say no task is beneath you if you want to lead engineers.",
    image: "images/story/huang-dennys.webp",
    tags: ["Denny's", "1978", "Oregon State"]
  },
  "21": {
    title: "Electrical engineering degree and the LSI Logic path",
    body: "He graduates Oregon State in 1984 with a degree in electrical engineering and joins AMD designing microprocessors. Later he moves to LSI Logic, a hot Silicon Valley chip design house. Sun Microsystems founder Scott McNealy becomes a mentor. Huang learns that the right architecture at the right moment matters more than incremental speed. The lesson will define Nvidia decades later.",
    image: "images/story/huang-oregon.webp",
    tags: ["AMD", "1984", "LSI Logic"]
  },
  "30": {
    title: "Three founders at a Denny's booth sketch Nvidia",
    body: "In 1993 he co-founds Nvidia with Chris Malachowsky and Curtis Priem at a Denny's in San Jose, ironically the same chain where he washed dishes. They bet on accelerated 3D graphics for PCs. The name suggests envy, as in to envy someone's frame rate. Early products nearly kill the company. Huang survives by firing half the staff and betting everything on a new chip called RIVA 128.",
    image: "images/story/huang-nvidia-diner.webp",
    tags: ["Nvidia", "1993", "Denny's"]
  },
  "36": {
    title: "Invents the GPU category and takes Nvidia public",
    body: "The GeForce 256 ships in 1999 marketed as the world's first GPU, a processor built to render triangles fast. Gamers want it; PC makers need it. Nvidia IPOs and rides the gaming boom. Huang talks about parallel processing while investors think about Quake frame rates. The chip is a toy engine that secretly trains for a war about matrices and neural nets.",
    image: "images/story/huang-gpu.webp",
    tags: ["GPU", "1999", "GeForce"]
  },
  "43": {
    title: "CUDA opens the GPU to scientists and madmen",
    body: "In 2006 Nvidia launches CUDA, software that lets researchers run general compute on graphics chips. Wall Street yawns; academics experiment. Oil companies simulate reservoirs; physicists model particles. Huang keeps funding the platform through years when it does not pay off on earnings calls. He is betting that parallel math will matter more than faster pixels. He will be right on a delay of six years.",
    image: "images/story/huang-cuda.webp",
    tags: ["CUDA", "2006", "parallel compute"]
  },
  "49": {
    title: "AlexNet on Nvidia hardware wakes the industry",
    body: "In 2012 a Toronto team wins ImageNet using deep learning on Nvidia GPUs. Error rates plunge; the AI winter ends. Huang puts Nvidia sales teams on every university lab door. What was a gaming company becomes the shovel seller in a gold rush nobody fully sees yet. He tells engineers to optimize for tensor operations before most CEOs know what a tensor is.",
    image: "images/story/huang-deep-learning.webp",
    tags: ["AlexNet", "2012", "deep learning"]
  },
  "53": {
    title: "Hand-delivers the first DGX supercomputer to OpenAI",
    body: "In 2016 Huang personally delivers the first DGX-1 AI supercomputer to OpenAI's San Francisco office. Photos show him in his leather jacket beside Elon Musk and Sam Altman. The box is marketed as an AI appliance the size of a suitcase stack. The gesture is marketing and strategy: bind the hottest lab to your hardware before Google builds its own chips.",
    image: "images/story/huang-openai-delivery.webp",
    tags: ["DGX", "2016", "OpenAI"]
  },
  "59": {
    title: "ChatGPT mania empties shelves of H100 chips",
    body: "After ChatGPT explodes in 2022, every hyperscaler orders Nvidia data-center GPUs faster than TSMC can fab them. Lead times stretch; prices soar. Huang keynotes in a black jacket like a rock star explaining H100 bandwidth to stadium crowds. Competitors announce rivals years late. Nvidia becomes the choke point of the AI age the way Intel once was for PCs.",
    image: "images/story/huang-ai-boom.webp",
    tags: ["H100", "2022", "ChatGPT boom"]
  },
  "60": {
    title: "Nvidia crosses toward a trillion-dollar valuation",
    body: "In 2023 the stock more than triples on AI demand forecasts. Nvidia briefly joins Apple and Microsoft in the trillion-dollar club. A dishwasher kid from Denny's now runs the company every government and startup must court for chips. Huang warns about export controls and China risk while taking victory laps on stage. The GPU was a toy until the world needed a brain.",
    image: "images/story/huang-trillion.webp",
    tags: ["2023", "trillion", "AI chips"]
  }
});

// src/stories/musk.ts
var muskStories = defineStories("Musk", {
  "0": {
    title: "Born in Pretoria to a model and an engineer",
    body: "Elon Reeve Musk arrives in 1971 in apartheid South Africa, son of Errol Musk, an electromechanical engineer, and Maye, a dietitian and model. The family is sharp and volatile. Young Elon reads encyclopedias for fun and drifts into daydreams teachers mistake for rudeness. He will later say the books he devoured as a child were escape routes from a childhood he does not romanticize.",
    image: "images/story/musk-born.webp",
    tags: ["Pretoria", "1971", "childhood"]
  },
  "10": {
    title: "Teaches himself to code and sells Blastar for five hundred dollars",
    body: "At ten he gets a Commodore VIC-20 and learns programming from manuals. By twelve he writes Blastar, a space shooter, and sells the source code to a PC magazine for five hundred dollars. The game is primitive but the transaction matters: he discovers software can be product. Space themes and commerce arrive in the same package before puberty ends.",
    image: "images/story/musk-blastar.webp",
    tags: ["Blastar", "1983", "programming"]
  },
  "12": {
    title: "Hospitalized after a gang beating at school",
    body: "Bullies at Bryanston High ambush him, throw him down stairs, and beat him until he is hospitalized. His father later moves him to Pretoria Boys. Musk will cite the violence as one reason he learned to endure pain and perform under threat. The same stubbornness that kept him on the floor will later keep rockets on the pad after explosions.",
    image: "images/story/musk-bullied.webp",
    tags: ["bullying", "1983", "South Africa"]
  },
  "17": {
    title: "Leaves South Africa to avoid apartheid military service",
    body: "At seventeen he emigrates to Canada using his mother's citizenship, working odd jobs on farms and lumber mills before reaching university. He avoids compulsory service in an army enforcing apartheid, which he opposed. The move is the first of many all-in bets on a future far from where he started. America is still one hop away.",
    image: "images/story/musk-canada.webp",
    tags: ["Canada", "1988", "emigration"]
  },
  "24": {
    title: "Drops out of Stanford after two days for the internet gold rush",
    body: "He enrolls at Stanford for a PhD in applied physics in 1995 and leaves after forty-eight hours to chase the dot-com wave. With his brother Kimbal he founds Zip2, putting Yellow Pages businesses online when many merchants still lack email. They sleep at the office and shower at the YMCA. Investors later call it grim; Musk calls it normal.",
    image: "images/story/musk-zip2.webp",
    tags: ["Zip2", "1995", "Stanford dropout"]
  },
  "28": {
    title: "Sells Zip2, then builds what becomes PayPal",
    body: "Compaq buys Zip2 for $307 million in 1999; Musk gets $22 million and immediately starts X.com, an online bank. It merges with Confinity and becomes PayPal. He fights internally over Windows versus Unix and branding. eBay buys PayPal for $1.5 billion in 2002. At thirty-one he is rich enough to fund rockets personally, which is exactly what he does.",
    image: "images/story/musk-paypal.webp",
    tags: ["PayPal", "1999", "eBay sale"]
  },
  "31": {
    title: "Founds SpaceX because rockets cost too much",
    body: "After failing to buy refurbished Russian rockets for a Mars payload stunt, he founds SpaceX in 2002 to cut launch costs by building in-house. Engineers think he is a rich tourist. He hires aggressively, demands impossible schedules, and learns orbital mechanics from textbooks on planes. The first three Falcon 1 flights fail. A fourth success in 2008 saves the company from bankruptcy.",
    image: "images/story/musk-spacex.webp",
    tags: ["SpaceX", "2002", "Falcon"]
  },
  "33": {
    title: "Leads the Series A that saves Tesla from dying in the crib",
    body: "Martin Eberhard and Marc Tarpenning founded Tesla; Musk leads the 2004 investment round and becomes chairman. He pushes a luxury Roadster first to fund a mass-market car later. Silicon Valley VCs laugh at hardware. He does not care. Tesla becomes his second full-time obsession alongside SpaceX, two companies that could kill each other for his attention.",
    image: "images/story/musk-tesla.webp",
    tags: ["Tesla", "2004", "Roadster"]
  },
  "37": {
    title: "Christmas 2008 when both companies nearly die",
    body: "SpaceX fails launches; Tesla burns cash during the financial crisis. Musk is down to personal loans and divorce stress. On December 23 SpaceX's Falcon 1 reaches orbit; days later Tesla closes a NASA cargo contract and a funding round. He calls it the worst year of his life. Surviving it convinces him he can walk through fire if the mission is big enough.",
    image: "images/story/musk-2008.webp",
    tags: ["2008", "near bankruptcy", "NASA"]
  },
  "41": {
    title: "Dragon docks with the space station",
    body: "In 2012 SpaceX's Dragon capsule berths with the International Space Station, the first commercial spacecraft to do so. NASA astronauts grab it with a robotic arm. A company founded by a PayPal millionaire now resupplies orbit. Musk tweets and cries on camera. The milestone proves private rocketry can do what only governments did before.",
    image: "images/story/musk-dragon.webp",
    tags: ["Dragon", "2012", "ISS"]
  },
  "44": {
    title: "Lands an orbital booster upright on a barge",
    body: "After years of explosions mocked online as Rapid Unscheduled Disassembly, Falcon 9's first stage lands on a drone ship in 2016. Reusability was the whole economic thesis. Competitors said impossible; Musk said math. The landed booster becomes a museum piece and a meme. Launch costs begin to fall toward the dream of making humanity multiplanetary affordable.",
    image: "images/story/musk-landing.webp",
    tags: ["reusable rocket", "2016", "Falcon 9"]
  },
  "47": {
    title: "Model 3 production hell and the tent in Fremont",
    body: "Tesla bets the company on a $35,000 electric sedan for masses. Manufacturing breaks; Musk sleeps on the factory floor and builds a line in a tent to hit quotas. Short sellers predict bankruptcy; fans camp in parking lots to buy cars. By 2018 Tesla is shipping Model 3s at volume that forces every legacy automaker to announce EV plans years late.",
    image: "images/story/musk-model3.webp",
    tags: ["Model 3", "2018", "production hell"]
  },
  "51": {
    title: "Buys Twitter and renames the town square X",
    body: "In 2022 he completes a $44 billion purchase of Twitter after months of legal warfare over whether to walk away. He fires executives by tweet, renames the platform X, and declares himself a free speech absolutist while advertisers flee. Fans see a culture war weapon; critics see chaos. Either way he owns the megaphone he used to build Tesla and SpaceX without ads.",
    image: "images/story/musk-twitter.webp",
    tags: ["Twitter", "2022", "X"]
  },
  "52": {
    title: "Launches xAI as a counterweight in the model wars",
    body: "In 2023 he forms xAI to build artificial intelligence outside what he calls woke safety culture at OpenAI, which he co-founded and left. He positions Grok as a truth-seeking chatbot with fewer guardrails. The move reunites his interests in chips, data, and narrative control. The man who warned AI could end civilization now races to ship his own model.",
    image: "images/story/musk-xai.webp",
    tags: ["xAI", "2023", "Grok"]
  },
  "55-spacex-ipo": {
    title: "SpaceX goes public in the largest IPO in history",
    body: "In 2026 SpaceX lists on Nasdaq as SPCX in a $75 billion offering that shocks Wall Street. Starlink subscribers and Starship contracts finally meet public-market hunger for the company Musk kept private for decades. Trading opens to retail frenzy and institutional fights for allocation. The boy who sold Blastar now runs a public rocket empire.",
    image: "images/story/musk-spacex-ipo.webp",
    tags: ["SpaceX IPO", "2026", "SPCX"]
  },
  "55-trillionaire": {
    title: "First person worth a trillion dollars on paper",
    body: "SPCX surges past a $2 trillion market cap and Musk's combined stakes make him history's first trillionaire on paper. Tabloids recycle Mars quotes from his valedictorian-era dreams. Critics see concentration of power; fans see proof that physics plus will can rewrite wealth charts. The Pretoria kid who read Isaac Asimov now owns numbers previously reserved for nations.",
    image: "images/story/musk-trillionaire.webp",
    tags: ["trillionaire", "2026", "wealth"]
  }
});

// src/stories/page.ts
var pageStories = defineStories("Page", {
  "0": {
    title: "Born in East Lansing among Michigan State computers",
    body: "Lawrence Edward Page arrives in 1973 in a college town where his father is a computer science professor and his mother teaches programming. The house smells of punch cards and late grading. He grows up believing invention is a normal job, not a miracle. Quiet and curious, he will later say he wanted to build things that matter at scale, not win arguments in seminars.",
    image: "images/story/page-born.webp",
    tags: ["East Lansing", "1973", "childhood"]
  },
  "6": {
    title: "Grows up playing in university labs",
    body: "As a boy he tinkers in Michigan State labs while his parents work. He sees machines as toys with consequences. Friends remember a kid who asked how everything worked, then took it apart. The Midwestern upbringing keeps him less flashy than coastal peers but no less ambitious. He learns patience before he learns PageRank.",
    image: "images/story/page-michigan.webp",
    tags: ["Michigan State", "1979", "childhood"]
  },
  "12": {
    title: "Reads about Nikola Tesla and chooses invention",
    body: "At twelve he reads a biography of Nikola Tesla and fixates on the tragedy of genius without business impact. He decides he will not let inventions die in notebooks. The story becomes personal mythology he repeats in speeches. Tesla's arc warns him; Edison's distribution wins his sympathy. Search will later be his grid.",
    image: "images/story/page-tesla-book.webp",
    tags: ["Nikola Tesla", "1985", "inspiration"]
  },
  "22": {
    title: "Meets Sergey Brin at Stanford orientation",
    body: "Page enrolls at Stanford for a PhD in computer science in 1995 and meets Brin, an outgoing Moscow-born mathematician. They argue in grad student social circles, then collaborate. Brin challenges every idea; Page refines them. The odd couple dynamic produces more honesty than politeness. Their first project is not search but a citation web for academic papers.",
    image: "images/story/page-brin.webp",
    tags: ["Stanford", "1995", "Sergey Brin"]
  },
  "23": {
    title: "PageRank treats links as votes of trust",
    body: "Page's dissertation idea ranks web pages by treating inbound links as endorsements, like academic citations scaled to the whole internet. He codes BackRub on Stanford servers until the crawl threatens campus bandwidth. The math is elegant: important pages are linked by important pages. He does not yet know he has found the organizing principle of the web.",
    image: "images/story/page-pagerank.webp",
    tags: ["PageRank", "1996", "BackRub"]
  },
  "25": {
    title: "Google incorporated in a Menlo Park garage",
    body: "In 1998 they incorporate Google, a name borrowed from googol, the digit one followed by a hundred zeros. Sun co-founder Andy Bechtolsheim writes a $100,000 check before incorporation papers exist. They operate out of Susan Wojcicki's garage on Santa Margarita Avenue. The homepage stays sparse on purpose: one box, one button, speed above all.",
    image: "images/story/page-garage.webp",
    tags: ["Google", "1998", "garage"]
  },
  "28": {
    title: "Brings in Eric Schmidt as adult supervision",
    body: "Venture capitalists demand experienced management as Google grows chaotic and brilliant. Page and Brin hire Eric Schmidt, a Novell CEO, as chairman in 2001 and later CEO while they learn to scale. Page keeps product vision; Schmidt runs the business machine. The arrangement lets founders stay weird while revenue compounds from AdWords auctions nobody outside the building fully understood yet.",
    image: "images/story/page-schmidt.webp",
    tags: ["Eric Schmidt", "2001", "CEO"]
  },
  "31": {
    title: "Google IPO and the don't-be-evil era",
    body: "The 2004 IPO uses a Dutch auction to spread shares beyond Wall Street favorites. Founders write a letter about making the world better without doing evil, which ages into irony as scrutiny grows. Page becomes a billionaire overnight but still prefers whiteboards to galas. Search is now the front door of the internet; Google becomes a verb.",
    image: "images/story/page-ipo.webp",
    tags: ["IPO", "2004", "don't be evil"]
  },
  "32": {
    title: "Buys Android before smartphones dominate",
    body: "In 2005 Google acquires a small Palo Alto startup building a mobile operating system. Page sees that phones will become pocket computers and cannot let Microsoft or Nokia own the layer. Android launches free to manufacturers, fracturing the iPhone-only future Apple wanted. The bet looks generous until ads inside mobile apps repay the investment a thousand times over.",
    image: "images/story/page-android.webp",
    tags: ["Android", "2005", "mobile"]
  },
  "38": {
    title: "Returns as CEO to unify a sprawling empire",
    body: "Page retakes the CEO role in 2011 as Google sprawls into maps, video, email, and self-driving cars. He kills stagnant products ruthlessly and pushes moonshots into the same house as search ads. Larry Page the shy engineer must now manage politics Larry Page the founder avoided. He bets the company can invent the future without breaking the cash machine.",
    image: "images/story/page-return.webp",
    tags: ["CEO return", "2011", "moonshots"]
  },
  "42": {
    title: "Alphabet restructuring separates bets from search",
    body: "In 2015 he announces Alphabet, a holding company where Google is one subsidiary alongside Waymo, Verily, and Other Bets. Investors get transparency; founders get freedom to fail loudly. Page steps up as Alphabet CEO while Sundar Pichai runs Google. The move codifies what insiders already knew: search pays for everything else they want to try.",
    image: "images/story/page-alphabet.webp",
    tags: ["Alphabet", "2015", "restructuring"]
  },
  "46": {
    title: "Steps back from daily leadership but keeps control",
    body: "In 2019 Page and Brin leave executive roles while retaining voting control through special shares. Pichai runs Google and Alphabet day to day. Page retreats to kite surfing, flying cars, and quiet investing. He remains one of the most influential people on earth while rarely speaking in public. The garage kid achieved scale beyond Tesla's dreams and then vanished from the stage.",
    image: "images/story/page-step-back.webp",
    tags: ["2019", "retirement", "control"]
  }
});

// src/stories/zuckerberg.ts
var zuckerbergStories = defineStories("Zuckerberg", {
  "0": {
    title: "Born in White Plains to a dentist and a psychiatrist",
    body: "Mark Elliot Zuckerberg arrives in 1984 in suburban New York, the second of four children. His father runs a dental practice downstairs; his mother is a psychiatrist. They hire tutors for math and Latin. Mark builds games and messaging tools before most kids have email. The household rewards building over sports, which shapes a founder who treats social life like an engineering problem.",
    image: "images/story/zuckerberg-born.webp",
    tags: ["White Plains", "1984", "childhood"]
  },
  "12": {
    title: "ZuckNet wires the house before the world",
    body: "At twelve he writes ZuckNet, a messaging program linking his father's dental office computers to the family home. Patients hear pings when appointments change. It is primitive social networking in a Victorian house. His father shows it off to patients. Mark learns that connecting people digitally feels like magic even when the network is only two rooms apart.",
    image: "images/story/zuckerberg-zucknet.webp",
    tags: ["ZuckNet", "1996", "messaging"]
  },
  "18": {
    title: "Synapse and the AOL job he never took",
    body: "In high school he builds Synapse, a music player that learns your taste. Microsoft and AOL offer jobs and acquisition talks. He goes to Harvard instead, reputation already preceding him as a hacker who might drop out later. Synapse foreshadows feeds that predict what you want before you ask. The pattern is capture attention with software, then let giants come knocking.",
    image: "images/story/zuckerberg-synapse.webp",
    tags: ["Synapse", "2002", "Harvard"]
  },
  "19": {
    title: "Facemash, then thefacebook in Kirkland House",
    body: "A hot-or-not site called Facemash gets him in trouble with administration. Months later he launches thefacebook from his dorm for Harvard students only, verifying users with .edu emails. Roommates help spread it to Yale and Stanford. The name drops the the eventually; the exclusivity drops faster. Within a year the network effect is a physics problem he cannot stop.",
    image: "images/story/zuckerberg-harvard.webp",
    tags: ["Facebook", "2004", "Harvard"]
  },
  "20": {
    title: "Drops out and moves to Silicon Valley",
    body: "He leaves Harvard for Palo Alto summer housing with servers in the living room. Investors like Peter Thiel write checks; Sean Parker plays cool advisor. Lawsuits from Cameron and Tyler Winklevoss claim he stole their idea. Zuckerberg says ideas are cheap and execution is everything. The legal fight will drag for years while Facebook becomes the campus he never graduated from.",
    image: "images/story/zuckerberg-dropout.webp",
    tags: ["dropout", "2005", "Palo Alto"]
  },
  "22": {
    title: "Opens to everyone and launches News Feed",
    body: "Facebook drops the college-only requirement in 2006 and adds News Feed, an algorithmic river of friends' updates. Users revolt with groups titled RIP News Feed; Zuckerberg apologizes and keeps the product. Engagement explodes. The feed teaches him that people say they want privacy but click on gossip. The business model of attention begins to take shape.",
    image: "images/story/zuckerberg-newsfeed.webp",
    tags: ["News Feed", "2006", "open signup"]
  },
  "23": {
    title: "Turns down a billion dollars from Yahoo",
    body: "Yahoo offers roughly $1 billion to buy Facebook in 2007. Zuckerberg, barely twenty-three, declines. Board members and executives disagree; he holds firm believing the social graph will be worth more. The decision enters startup lore as either genius or luck. Within five years the company is worth many times that offer and still growing.",
    image: "images/story/zuckerberg-yahoo.webp",
    tags: ["Yahoo offer", "2007", "billion"]
  },
  "28": {
    title: "IPO and the Instagram purchase for a billion",
    body: "Facebook goes public in 2012 in a messy first day of trading but still the biggest tech IPO of its era. Weeks earlier it buys Instagram for $1 billion when the photo app has thirteen employees. Critics call it panic; Zuckerberg calls it buying the future of mobile photos. The acquisition may be the best bargain in Silicon Valley history.",
    image: "images/story/zuckerberg-ipo.webp",
    tags: ["IPO", "2012", "Instagram"]
  },
  "30": {
    title: "WhatsApp and Oculus in the same shopping spree",
    body: "In 2014 Facebook pays $19 billion for WhatsApp and $2 billion for Oculus VR. Messaging and virtual reality land under one roof. Zuckerberg says he is building a family of apps and preparing for a platform shift beyond phones. Wall Street questions the prices; users keep tapping. He is assembling pieces of a metaverse before the word is fashionable.",
    image: "images/story/zuckerberg-whatsapp.webp",
    tags: ["WhatsApp", "Oculus", "2014"]
  },
  "34": {
    title: "Congressional hearings after Cambridge Analytica",
    body: "In 2018 revelations about Cambridge Analytica harvesting user data for political targeting force Zuckerberg to testify before Congress. He wears a suit instead of a hoodie and answers slowly. Senators ask how Facebook makes money if it is free. The line becomes a meme. Trust erodes globally; regulators circle. He promises fixes while engagement stays high.",
    image: "images/story/zuckerberg-congress.webp",
    tags: ["Cambridge Analytica", "2018", "Congress"]
  },
  "37": {
    title: "Renames the company Meta and bets on VR",
    body: "In 2021 Facebook Inc becomes Meta Platforms, signaling a pivot toward the metaverse. He demos legless avatars in Horizon Worlds while Reality Labs burns billions. Employees question the timing as TikTok eats attention. Zuckerberg believes the next platform after mobile is immersive. The bet is either visionary or an expensive distraction from aging blue app growth.",
    image: "images/story/zuckerberg-meta.webp",
    tags: ["Meta", "2021", "metaverse"]
  },
  "39": {
    title: "Open-sources Llama and races toward AI",
    body: "By 2023 Meta releases Llama family models to researchers and pivots hard into generative AI after being late to mobile payments and almost late to stories format. Zuckerberg posts training cluster photos and efficiency benchmarks. The company that connected friends now wants to power chatbots inside every app it owns. Social and intelligence merge on his roadmap.",
    image: "images/story/zuckerberg-ai.webp",
    tags: ["Llama", "2023", "AI pivot"]
  }
});

// src/stories/altman.ts
var altmanStories = defineStories("Altman", {
  "0": {
    title: "Born in Chicago, raised in St. Louis",
    body: "Samuel Harris Altman arrives in 1985 in Chicago and grows up in St. Louis, Missouri, the eldest of four siblings in a middle-class Jewish family. His parents are dermatologists. He shows early talent with computers and debate. The Midwest upbringing keeps him polite in person while his ambitions scale to planetary stakes later.",
    image: "images/story/altman-born.webp",
    tags: ["Chicago", "St. Louis", "1985"]
  },
  "8": {
    title: "First Macintosh and a childhood on the keyboard",
    body: "At eight he gets an Apple Macintosh and learns to program on it. The machine becomes his favorite toy and escape. While other kids play sports he builds worlds in code. The Mac brand will circle back when he later partners with Apple on AI products worth billions. The through-line is a kid who trusted computers more than institutions.",
    image: "images/story/altman-mac.webp",
    tags: ["Macintosh", "1993", "childhood"]
  },
  "16": {
    title: "Comes out as gay at a conservative Missouri school",
    body: "In high school he comes out publicly at a school assembly in a state where that takes nerve in 2001. He becomes an advocate for LGBTQ students and learns to speak calmly under hostile attention. The experience trains him for boardrooms and Senate hearings where everyone watches how he holds his face. Courage becomes a management style.",
    image: "images/story/altman-coming-out.webp",
    tags: ["coming out", "2001", "high school"]
  },
  "19": {
    title: "Drops out of Stanford to start Loopt",
    body: "He enters Stanford in 2003, studies computer science, and leaves in 2005 to found Loopt, a location-sharing app for phones before smartphones were ubiquitous. Y Combinator funds the company in its first batch. Loopt never becomes Facebook-scale but sells for $43 million. Altman learns startup mechanics from the inside: pitch, ship, pivot, exit.",
    image: "images/story/altman-loopt.webp",
    tags: ["Loopt", "2005", "Stanford dropout"]
  },
  "26": {
    title: "Joins Y Combinator as a partner",
    body: "Paul Graham invites him back to Y Combinator as a partner in 2011. Altman reads thousands of applications and writes essays about startup ethics and nuclear energy. Founders see him as young but frighteningly direct. He pushes them toward ambition bigger than SaaS widgets. The job is kingmaker before he becomes emperor of AI.",
    image: "images/story/altman-yc-partner.webp",
    tags: ["Y Combinator", "2011", "partner"]
  },
  "28": {
    title: "Named president of Y Combinator at twenty-eight",
    body: "In 2014 he succeeds Graham as YC president while still under thirty. He expands batches, starts continuity funds, and preaches that hard tech matters again. Silicon Valley listens because YC minted Airbnb and Dropbox. Altman uses the bully pulpit to argue about basic income experiments and AI risk years before ChatGPT. He is building a network graph of founders who owe him favors.",
    image: "images/story/altman-yc-president.webp",
    tags: ["YC president", "2014", "startups"]
  },
  "30": {
    title: "Co-founds OpenAI with Musk and others",
    body: "In 2015 he co-founds OpenAI as a nonprofit research lab with Elon Musk, Ilya Sutskever, and others, fearing AGI could go wrong if only corporations build it. The mission is safe beneficial AI for humanity. Musk later departs; Altman stays. The lab publishes papers and trains models quietly while the world still thinks AI means Siri jokes.",
    image: "images/story/altman-openai-founded.webp",
    tags: ["OpenAI", "2015", "nonprofit"]
  },
  "34": {
    title: "Leaves YC to run OpenAI full time",
    body: "In 2019 he steps down as YC president to focus on OpenAI as CEO. The organization shifts toward a capped-profit structure to raise billions for compute. Purists accuse him of selling out the nonprofit dream; realists say GPUs cost more than ideals. Altman spends his days fundraising from Microsoft and touring data centers like cathedrals of the new religion.",
    image: "images/story/altman-openai-ceo.webp",
    tags: ["2019", "CEO", "Microsoft"]
  },
  "37": {
    title: "ChatGPT launches and breaks the internet",
    body: "On November 30, 2022 OpenAI releases ChatGPT to the public as a free research preview. Five days later a million people have tried it. Students write essays; programmers debug code; journalists panic. Altman tweets measured warnings while usage curves go vertical. A demo product becomes the fastest-growing consumer app in history and reorders every industry meeting agenda on earth.",
    image: "images/story/altman-chatgpt.webp",
    tags: ["ChatGPT", "2022", "launch"]
  },
  "38-fired": {
    title: "Fired by the board on a videoconference Friday",
    body: "On November 17, 2023 OpenAI's board fires Altman on a Google Meet call while he is at a developer conference. They cite lack of candor without public detail. Employees threaten mass resignation; Microsoft offers him a role; investors revolt. Five chaotic days follow with two interim CEOs and midnight negotiations. He returns as CEO with a new board. Silicon Valley has never seen a corporate coup reversed so fast.",
    image: "images/story/altman-fired.webp",
    tags: ["board coup", "2023", "reinstated"]
  },
  "38-face": {
    title: "Becomes the calm face of an anxious AI age",
    body: "After reinstatement Altman tours world capitals discussing regulation, superintelligence timelines, and OpenAI's partnership with Microsoft. He testifies, fundraises, and launches GPT-4 class models while critics ask if one company should hold the keys. He speaks in short sentences about exponential curves and long sentences about safety committees. Love him or fear him, he is the person journalists call when AI news breaks.",
    image: "images/story/altman-ai-face.webp",
    tags: ["2023", "AI policy", "public face"]
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
  ["Jobs", jobsStories],
  ["Gates", gatesStories],
  ["Bezos", bezosStories],
  ["Huang", huangStories],
  ["Musk", muskStories],
  ["Page", pageStories],
  ["Zuckerberg", zuckerbergStories],
  ["Altman", altmanStories]
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

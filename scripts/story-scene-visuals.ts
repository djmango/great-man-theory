/** One frozen moment per scene — no montages, no life-summary collages. */

export const SCENE_STYLE =
  "Style: hand-drawn colored-pencil and watercolor with fine ink linework, visible paper texture, muted earthy tones. One unified 19th-century history painting tableau by Gérôme or David: a single dramatic moment, one viewpoint, one shared light. NOT a montage, NOT collage, NOT multiple panels, NOT inset maps, NOT movie poster, NOT split screen. Dramatic but not photorealistic, no text, no letters, no border.";

export const SCENE_BEATS: Record<string, string> = {
  // Alexander (reference quality — keep if regenerating)
  "alexander-pella-birth":
    "a newborn prince in a Macedonian palace chamber at Pella, queen and attendants by lamplight",
  "alexander-bucephalus":
    "teenage Alexander calming a black horse before King Philip and the Macedonian court on a dusty training ground",
  "alexander-philip-prophecy":
    "King Philip speaking to young Alexander after the horse trial, courtiers listening in a palace courtyard",
  "alexander-aristotle":
    "Aristotle teaching Alexander and companions under trees at Mieza, scrolls and open air",
  "alexander-regent-alexandropolis":
    "teenage Alexander as regent pointing at a frontier settlement plan with Macedonian officers",
  "alexander-chaeronea":
    "eighteen-year-old Alexander leading Companion cavalry charge at Chaeronea, dust and spears",
  "alexander-wedding-banquet":
    "Alexander hurling a cup at Philip's wedding banquet as the drunk king rises in rage",
  "alexander-crowned-after-murder":
    "Alexander crowned before Macedonian soldiers hours after Philip's assassination at Aegae",
  "alexander-granicus":
    "Alexander wading the Granicus river at the head of cavalry against Persian satraps",
  "alexander-gordian-issus":
    "Alexander slicing the Gordian Knot with his sword before priests at Gordium",
  "alexander-alexandria":
    "Alexander founding Alexandria on the Mediterranean shore, surveyors and soldiers around him",
  "alexander-gaugamela":
    "Alexander charging at Gaugamela with Companion cavalry toward Darius's chariot",
  "alexander-hydaspes":
    "Alexander on Bucephalus facing war elephants across the Hydaspes river at dawn",
  "alexander-babylon-fever":
    "Alexander dying in a Babylon palace bedchamber, generals and physicians around him",

  // Caesar
  "caesar-born":
    "a Roman patrician woman holding a newborn boy by oil lamp in a modest atrium in Rome, 100 BC",
  "caesar-sulla":
    "young Caesar standing defiant before Sulla's soldiers who demand he divorce Cornelia, tense atrium",
  "caesar-alexander-statue":
    "Caesar weeping alone before a statue of Alexander in a Spanish town square, staff behind him",
  "caesar-pirates":
    "young Caesar laughing and dining with Cilician pirates on the deck of their ship at sea",
  "caesar-pontifex":
    "Caesar celebrating election as pontifex maximus at night, torches and exhausted supporters",
  "caesar-aedile-games":
    "Caesar's lavish aedile games in the Roman Forum, gladiators fighting before roaring crowds",
  "caesar-triumvirate":
    "Caesar, Pompey, and Crassus sealing a secret pact in a dim Roman back room, maps on table",
  "caesar-gaul":
    "Caesar on horseback addressing legions before marching into Gallic tribal country",
  "caesar-alesia":
    "Vercingetorix surrendering his weapons to Caesar before Roman double walls at Alesia",
  "caesar-rubicon":
    "Caesar on a white horse leading the Thirteenth Legion across the Rubicon at dawn",
  "caesar-pharsalus":
    "Caesar's veterans charging Pompey's cavalry line at Pharsalus in Greek hills",
  "caesar-alexandria":
    "burning ships in Alexandria harbor as Caesar and soldiers fight from the palace quay",
  "caesar-ides":
    "senators stabbing Caesar on the floor of the Theatre of Pompey, Ides of March",

  // Cleopatra
  "cleopatra-born":
    "a Ptolemaic princess as a girl learning scrolls in an Alexandria palace chamber",
  "cleopatra-languages":
    "Cleopatra speaking directly to foreign envoys in an Alexandria throne room without interpreters",
  "cleopatra-exile":
    "Cleopatra fleeing Egypt by boat at dusk, looking back at Alexandria's coast",
  "cleopatra-carpet":
    "servants unrolling a carpet before Caesar in an Alexandria palace as Cleopatra emerges",
  "cleopatra-caesarion":
    "Cleopatra presenting infant Caesarion to courtiers in an Egyptian throne room",
  "cleopatra-caesar-death":
    "Cleopatra leaving Rome by litter after Caesar's assassination, anxious attendants around her",
  "cleopatra-alexandria-siege":
    "smoke rising over Alexandria as Caesar's soldiers defend the palace waterfront",
  "cleopatra-tarsus":
    "Cleopatra's gilded barge arriving on the Cydnus river before Mark Antony on the shore",
  "cleopatra-donations":
    "Antony and Cleopatra on thrones distributing crowns in the Donations of Alexandria ceremony",
  "cleopatra-actium":
    "Cleopatra's galley breaking away from the battle of Actium at sunset, sails turning seaward",
  "cleopatra-death":
    "Cleopatra dead on a golden couch in Alexandria, an asp fallen from her arm, handmaids weeping",

  // Napoleon
  "napoleon-born":
    "a newborn boy in a modest Ajaccio Corsican bedroom, midwife and mother, Mediterranean light",
  "napoleon-brienne":
    "lonely Corsican cadet Napoleon studying alone at Brienne military academy while classmates mock",
  "napoleon-toulon":
    "wounded young Bonaparte directing artillery fire against British ships at Toulon",
  "napoleon-italy":
    "Bonaparte on horseback crossing the bridge at Lodi under Austrian fire, soldiers behind him",
  "napoleon-egypt":
    "Bonaparte and scholars measuring an Egyptian temple colossus in desert sunlight",
  "napoleon-vendemiaire":
    "Bonaparte ordering grapeshot fired into a royalist mob before the Paris Convention",
  "napoleon-elba":
    "Napoleon pacing a cliff on Elba island, looking toward the sea with folded arms",
  "napoleon-brumaire":
    "soldiers clearing a chaotic French council chamber during the coup of 18 Brumaire",
  "napoleon-coronation":
    "Napoleon placing the imperial crown on his own head before Pope Pius VII at Notre-Dame",
  "napoleon-austerlitz":
    "Napoleon watching allied columns collapse from the Pratzen heights at Austerlitz, mist below",
  "napoleon-moscow":
    "Napoleon standing before empty burning Moscow as snow begins to fall",
  "napoleon-waterloo":
    "the Old Guard advancing uphill at Waterloo into British fire, Napoleon in background",
  "napoleon-st-helena":
    "exiled Napoleon dictating memoirs at a small desk in a cramped St Helena room",

  // Lincoln
  "lincoln-born":
    "a newborn in a Kentucky log cabin, firelight and rough blankets, frontier winter",
  "lincoln-mother":
    "nine-year-old Abraham beside his dying mother Nancy in a Indiana cabin bed",
  "lincoln-flatboat":
    "young Lincoln poling a flatboat down the Mississippi toward New Orleans",
  "lincoln-new-salem":
    "Lincoln wrestling a bully in the dirt before cheering New Salem townspeople",
  "lincoln-lawyer":
    "Lincoln arguing before a judge on the muddy Illinois Eighth Circuit courthouse steps",
  "lincoln-debates":
    "Lincoln and Douglas debating on raised platforms before a huge outdoor Illinois crowd",
  "lincoln-elected":
    "Lincoln arriving secretly in Washington by train before inauguration, guards in rain",
  "lincoln-sumter":
    "Fort Sumter exploding under Confederate shelling across Charleston harbor at dawn",
  "lincoln-gettysburg":
    "Lincoln delivering the Gettysburg Address before a cemetery crowd, November 1863",
  "lincoln-grant":
    "Lincoln meeting General Grant in Washington war room, maps spread on table",
  "lincoln-appomattox":
    "Lee surrendering to Grant in the Appomattox courthouse parlor, officers standing",
  "lincoln-assassination":
    "Booth shooting Lincoln in Ford's Theatre box during the play, gaslight and panic",

  // Oppenheimer
  "oppenheimer-born":
    "precocious boy Robert Oppenheimer reading beside Van Gogh reproductions in a New York apartment",
  "oppenheimer-mineral-club":
    "fourteen-year-old Oppenheimer lecturing astonished adults at the New York Mineralogical Club",
  "oppenheimer-berkeley":
    "Oppenheimer at a chalkboard before rapt Berkeley physics students in the 1930s",
  "oppenheimer-black-holes":
    "Oppenheimer and Snyder at a blackboard sketching stellar collapse equations in 1939",
  "oppenheimer-los-alamos":
    "scientists building the Trinity gadget in a Los Alamos desert laboratory, 1940s",
  "oppenheimer-trinity":
    "the Trinity nuclear flash lighting the New Mexico desert before dawn, observers shielding eyes",
  "oppenheimer-ias":
    "Oppenheimer walking the Institute for Advanced Study grounds with Einstein in Princeton",
  "oppenheimer-hearing":
    "Oppenheimer sitting alone before the 1954 security board in a stripped hearing room",
  "oppenheimer-einstein-letter":
    "Einstein dictating the 1939 letter to Roosevelt about atomic weapons in Princeton study",
  "oppenheimer-fermi-award":
    "Oppenheimer receiving the Fermi medal in a formal hall, 1963, colleagues applauding",
  "oppenheimer-death":
    "elderly Oppenheimer smoking by a Princeton window, throat bandaged, autumn light",

  // Leonardo
  "leonardo-born":
    "illegitimate newborn Leonardo in a Tuscan farmhouse, mother and rural hills through window",
  "leonardo-verrocchio":
    "teenage Leonardo grinding pigments in Verrocchio's busy Florence workshop",
  "leonardo-baptism-angel":
    "Leonardo's luminous angel panel beside Verrocchio's Baptism of Christ in the workshop",
  "leonardo-milan":
    "Leonardo presenting war machines on parchment to Ludovico Sforza in Milan court",
  "leonardo-borgia":
    "Leonardo surveying a Borgia fortress from a hilltop with compass and map",
  "leonardo-last-supper":
    "Leonardo painting The Last Supper on a refectory wall, apostles reacting to betrayal",
  "leonardo-mona-lisa":
    "Leonardo painting Lisa del Giocondo's portrait alone in a Florence studio, sfumato light",
  "leonardo-anatomy":
    "Leonardo dissecting a cadaver by candlelight in a Milan hospital, notebook open",
  "leonardo-flight":
    "Leonardo studying a bird's wing and sketching a flying machine in his notebook",
  "leonardo-francis":
    "elderly Leonardo welcomed by Francis I at Amboise, king taking his arm",
  "leonardo-death":
    "Leonardo dying in bed at Clos Lucé, unfinished notebooks on the table",

  // Galileo
  "galileo-born":
    "Galileo as a boy watching craftsmen in Pisa, leaning over a workshop table",
  "galileo-hydrostatic":
    "young Galileo weighing alloys on a hydrostatic balance in a Florentine study",
  "galileo-pendulum":
    "Galileo timing a swinging cathedral lamp with his pulse in Pisa",
  "galileo-inclined-plane":
    "Galileo rolling bronze balls down an inclined plane in a Pisa lecture room",
  "galileo-telescope":
    "Galileo grinding a telescope lens at his bench by window light in Venice",
  "galileo-jupiter-moons":
    "Galileo peering through his telescope at Jupiter's moons on a clear Venetian night",
  "galileo-venus-phases":
    "Galileo sketching Venus phases at his desk, sunspots diagram beside him",
  "galileo-inquisition-warning":
    "Galileo receiving the 1616 Inquisition warning in a Vatican chamber, officials seated",
  "galileo-dialogue":
    "Galileo presenting his Dialogue manuscript to worried church censors in Rome",
  "galileo-trial":
    "Galileo kneeling before the Inquisition in 1633, abjuring on the floor",
  "galileo-two-sciences":
    "blind elderly Galileo dictating Two New Sciences to assistants at Arcetri window",
  "galileo-death":
    "Galileo on his deathbed at Arcetri, disciples at the foot of the bed",

  // Beethoven
  "beethoven-born":
    "a newborn in a Bonn musician's house, father drunk in the doorway, winter morning",
  "beethoven-father":
    "Johann van Beethoven forcing young Ludwig to practice piano, neighbors listening through wall",
  "beethoven-vienna":
    "young Beethoven playing piano for astonished Viennese aristocrats in a salon",
  "beethoven-deafness":
    "Beethoven holding an ear trumpet, alone at his piano, unable to hear the room",
  "beethoven-heiligenstadt":
    "Beethoven writing the Heiligenstadt Testament alone on a hill path above Vienna",
  "beethoven-eroica":
    "Beethoven tearing the Eroica dedication to Napoleon in rage at his desk",
  "beethoven-fifth":
    "Beethoven conducting the premiere of the Fifth Symphony, orchestra before him",
  "beethoven-ninth":
    "a singer turning deaf Beethoven to face the applauding crowd after the Ninth Symphony",
  "beethoven-late-quartets":
    "deaf elderly Beethoven scribbling a late quartet manuscript by candlelight",
  "beethoven-death":
    "Beethoven on his deathbed in Vienna during a thunderstorm, fist raised",

  // Turing
  "turing-born":
    "Alan Turing as a boy reading science alone in a London nursery while parents are abroad",
  "turing-morcom":
    "teenage Turing and Christopher Morcom studying mathematics together at Sherborne desk",
  "turing-bicycle-school":
    "Turing arriving muddy on a bicycle at Sherborne School gates after cycling sixty miles",
  "turing-universal-machine":
    "young Turing writing the Turing machine paper at a Cambridge desk, 1936",
  "turing-bletchley":
    "Turing working in silence at Hut 8, Bletchley Park, papers and tea cups",
  "turing-bombe":
    "the Bombe electromechanical machine whirring in a Bletchley Park hut, operators at dials",
  "turing-atlantic":
    "convoy ships crossing the Atlantic while radio operators decode messages below deck",
  "turing-test":
    "Turing lecturing about machine intelligence to colleagues at Manchester, 1950",
  "turing-prosecution":
    "Turing standing alone in a British courtroom after conviction for gross indecency, 1952",
  "turing-death":
    "Turing's study with a half-eaten apple on the bedside table, cyanide tragedy, 1954",

  // Jobs
  "jobs-born":
    "adoptive parents holding a newborn in a modest 1950s California home, warm window light",
  "jobs-hewlett":
    "a teenage boy on a kitchen telephone asking Bill Hewlett for electronic parts, 1960s",
  "jobs-calligraphy":
    "a young dropout auditing a calligraphy class at Reed College, letterforms on the chalkboard",
  "jobs-blue-box":
    "two young men in a dorm room with a blue box phone hacking device and tangled wires, 1973",
  "jobs-india":
    "a young traveler in robes on an Indian road, shaved head, dusty sunlight",
  "jobs-garage":
    "two long-haired young men assembling circuit boards in a suburban Los Altos garage, 1976",
  "jobs-apple-ii":
    "the Apple II computer on a desk beside a VisiCalc spreadsheet printout, early office",
  "jobs-macintosh":
    "a young CEO unveiling the Macintosh on stage, 1984, audience in darkness",
  "jobs-exile":
    "Steve Jobs walking out of Apple headquarters alone with a cardboard box, 1985",
  "jobs-pixar":
    "Jobs in a small Pixar office beside early computer animation frames and a Luxo lamp sketch",
  "jobs-toy-story":
    "a cinema premiere of Toy Story with Jobs in the audience, 1995",
  "jobs-return":
    "Jobs on stage announcing his return to Apple before a worried crowd, 1997",
  "jobs-ipod":
    "Jobs holding a white iPod on stage, white earphones, 2001 keynote",
  "jobs-iphone":
    "Jobs holding up the first iPhone on a dark keynote stage, 2007",
  "jobs-death":
    "a thin man in a black turtleneck seated by a window in Palo Alto, autumn light, 2011",
};

export function buildScenePrompt(slug: string, title: string): string {
  const beat = SCENE_BEATS[slug];
  if (!beat) {
    throw new Error(`Missing scene beat for slug: ${slug}`);
  }
  return `A cinematic historical illustration of ${beat}. ${SCENE_STYLE}`;
}

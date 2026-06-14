/**
 * One frozen moment per scene — no montages, no life-summary collages.
 *
 * TODO: Prefer real sources over generated art where they exist — photographs for
 * modern figures, historical paintings/engravings for earlier eras. See images/story/TODO.md.
 */

export const SCENE_STYLE =
  "Style: hand-drawn colored-pencil and watercolor with fine ink linework, visible paper texture, muted earthy tones. One unified 19th-century history painting tableau by Gérôme or David: a single dramatic moment, one viewpoint, one shared light. NOT a montage, NOT collage, NOT multiple panels, NOT inset maps, NOT movie poster, NOT split screen. Dramatic but not photorealistic, no text, no letters, no border. The named historical figure must be clearly recognizable as the central subject of the scene.";

/** Slug prefix → full name for image prompts (always name the person, never only describe them). */
export const FIGURE_NAMES: Record<string, string> = {
  alexander: "Alexander the Great",
  caesar: "Julius Caesar",
  cleopatra: "Cleopatra VII",
  napoleon: "Napoleon Bonaparte",
  lincoln: "Abraham Lincoln",
  oppenheimer: "J. Robert Oppenheimer",
  leonardo: "Leonardo da Vinci",
  galileo: "Galileo Galilei",
  beethoven: "Ludwig van Beethoven",
  turing: "Alan Turing",
  jobs: "Steve Jobs",
  gates: "Bill Gates",
  bezos: "Jeff Bezos",
  huang: "Jensen Huang",
  musk: "Elon Musk",
  page: "Larry Page",
  zuckerberg: "Mark Zuckerberg",
  altman: "Sam Altman",
  tesla: "Nikola Tesla",
  watt: "James Watt",
  carnegie: "Andrew Carnegie",
  rockefeller: "John D. Rockefeller",
  benz: "Karl Benz",
  edison: "Thomas Edison",
  bell: "Alexander Graham Bell",
  ford: "Henry Ford",
  porsche: "Ferdinand Porsche",
  marconi: "Guglielmo Marconi",
  wright: "Wilbur and Orville Wright",
  ferrari: "Enzo Ferrari",
  disney: "Walt Disney",
};

export function figureKeyFromSlug(slug: string): string {
  return slug.split("-")[0];
}

export function figureNameFromSlug(slug: string, figureKey?: string): string {
  const key = figureKey ?? figureKeyFromSlug(slug);
  return FIGURE_NAMES[key] ?? key;
}

/** True if the beat already names this figure (last name, first name, or slug token). */
export function beatMentionsFigure(beat: string, name: string, slug: string): boolean {
  const lower = beat.toLowerCase();
  for (const part of name.toLowerCase().split(/[\s.]+/)) {
    if (part.length >= 3 && lower.includes(part)) return true;
  }
  const key = figureKeyFromSlug(slug);
  if (key.length >= 4 && lower.includes(key)) return true;
  return false;
}

/** Inject the figure's name into beats that only describe anonymous people. */
export function ensureFigureNamedInBeat(slug: string, beat: string, name: string): string {
  if (beatMentionsFigure(beat, name, slug)) return beat;

  if (slug.endsWith("-born") || /\bnewborn\b/i.test(beat)) {
    const rest = beat
      .replace(/^a?\s*newborn\s+/i, "")
      .replace(/\badoptive parents holding a newborn,?\s*/i, "")
      .replace(/^an?\s+/i, "")
      .trim();
    return rest ? `infant ${name}, ${rest}` : `infant ${name} with family in the scene`;
  }

  if (/\bteenage boys\b/i.test(beat)) {
    return beat.replace(/\bteenage boys\b/i, `teenage ${name} with classmates`);
  }

  if (/\ba young adopted (son|daughter)\b/i.test(beat)) {
    return beat.replace(/\ba young adopted (son|daughter)\b/i, `young ${name} as adopted $1`);
  }

  const youngMatch = beat.match(
    /\b(a|the)\s+(teenage|young|twelve-year-old|nine-year-old|eight-year-old|elderly|thin|kindly)\s+(boy|girl|man|woman|CEO|traveler|engineer|dropout|programmer|valedictorian)\b/i,
  );
  if (youngMatch) {
    return beat.replace(youngMatch[0], `${youngMatch[2] ?? "young"} ${name}`);
  }

  if (/\btwo (young men|college-age programmers|brothers|long-haired young men)\b/i.test(beat)) {
    const partners: Record<string, string> = {
      "gates-traf-o-data": "Bill Gates and Paul Allen",
      "gates-microsoft": "Bill Gates and Paul Allen",
      "jobs-blue-box": "Steve Jobs and Steve Wozniak",
      "jobs-garage": "Steve Jobs and Steve Wozniak",
      "musk-zip2": "Elon Musk and Kimbal Musk",
      "huang-nvidia-diner": "Jensen Huang with Nvidia co-founders",
    };
    if (partners[slug]) return `${partners[slug]}, ${beat.charAt(0).toLowerCase()}${beat.slice(1)}`;
    return `${name} among them, ${beat.charAt(0).toLowerCase()}${beat.slice(1)}`;
  }

  if (/\ba (boy|girl|couple|teenager)\b/i.test(beat)) {
    return beat.replace(/\ba (boy|girl|couple|teenager)\b/i, `${name}, a $1`);
  }

  return `${name} as the clearly recognizable central figure: ${beat}`;
}

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

  // Gates
  "gates-born":
    "a newborn in a 1950s Seattle home, lawyer father and civic-minded mother nearby, rainy window",
  "gates-lakeside":
    "teenage boys hunched over a teletype terminal in a private school computer room, 1968",
  "gates-scheduler":
    "a teenage programmer showing class scheduling printouts to puzzled teachers at Lakeside School",
  "gates-traf-o-data":
    "two young men demoing a traffic tape reader machine to bored municipal officials, early 1970s",
  "gates-microsoft":
    "two college-age programmers celebrating beside an Altair kit computer cover in a Harvard dorm",
  "gates-ibm":
    "young Bill Gates signing an IBM DOS licensing contract in a sterile corporate conference room, 1980",
  "gates-windows":
    "early Windows 1.0 on a PC screen with mouse, skeptical reviewers in a tech office, 1985",
  "gates-ipo":
    "Microsoft IPO celebration on a trading floor, young Gates in glasses holding stock certificate, 1986",
  "gates-win95":
    "crowds lined outside a store for Windows 95 launch, Start button on posters, 1995",
  "gates-antitrust":
    "Bill Gates testifying on video in a courtroom antitrust trial, lawyers and monitors, 1998",
  "gates-foundation":
    "Bill and Melinda Gates reviewing global health charts in a foundation office, vaccines on wall",
  "gates-retirement":
    "Gates leaving Microsoft campus with philanthropy folders, employees waving, 2008",
  "gates-pledge":
    "elderly Gates at a podium announcing a massive giving pledge, 2021 press conference",

  // Bezos
  "bezos-born":
    "a newborn in 1960s Albuquerque with a young mother in a modest desert apartment",
  "bezos-name":
    "a Cuban immigrant father embracing a young adopted son in a 1960s American kitchen",
  "bezos-bedroom":
    "a boy installing an alarm on his bedroom door while siblings watch, suburban house",
  "bezos-valedictorian":
    "high school valedictorian at a podium describing space colonies to classmates, 1982",
  "bezos-princeton":
    "a young engineer graduating Princeton in cap and gown, computer science department banner",
  "bezos-amazon":
    "Jeff Bezos in the passenger seat writing a business plan on a legal pad while MacKenzie Bezos drives west on a long interstate highway toward Seattle, arid western landscape and distant mountains through the windshield, 1994 sedan",
  "bezos-first-book":
    "employees ringing a bell in a garage as the first Amazon book order prints, 1995",
  "bezos-ipo":
    "Amazon IPO on a trading floor with early dot-com era excitement, 1997",
  "bezos-blue-origin":
    "Jeff Bezos studying rocket sketches in a secret warehouse lab, early 2000s",
  "bezos-aws":
    "engineers presenting cloud server racks to developers in a Seattle conference room, 2006",
  "bezos-wapo":
    "Bezos meeting Washington Post journalists in a newsroom after purchase, 2013",
  "bezos-whole-foods":
    "Amazon and Whole Foods logos merging above a grocery store entrance, 2017",
  "bezos-richest":
    "Forbes richest list cover moment, Bezos beside rising stock chart, 2018",
  "bezos-space":
    "Bezos in a Blue Origin capsule after suborbital flight, desert landing site, 2021",

  // Huang
  "huang-born":
    "a newborn in 1960s Tainan Taiwan, family in a modest home, island light",
  "huang-kentucky":
    "a nine-year-old Taiwanese boy with a dictionary at a Kentucky boarding school dormitory",
  "huang-dennys":
    "a teenager washing dishes in a Denny's kitchen at night, fluorescent light",
  "huang-oregon":
    "young Jensen Huang at an electrical engineering lab bench at Oregon State, 1980s",
  "huang-nvidia-diner":
    "three founders sketching chip ideas on napkins in a San Jose Denny's booth, 1993",
  "huang-gpu":
    "Jensen Huang unveiling the first GeForce GPU on stage to gamers, 1999",
  "huang-cuda":
    "scientists running parallel code on early CUDA GPUs in a research lab, 2006",
  "huang-deep-learning":
    "researchers celebrating AlexNet results on monitors powered by Nvidia cards, 2012",
  "huang-openai-delivery":
    "Jensen Huang in leather jacket delivering a DGX supercomputer to OpenAI office, 2016",
  "huang-ai-boom":
    "Huang keynote before giant H100 chip visuals and a packed arena crowd, 2022",
  "huang-trillion":
    "Nvidia stock celebration on a trading floor, Huang on screens, trillion-dollar milestone, 2023",

  // Musk
  "musk-born":
    "a newborn in 1970s Pretoria South Africa, engineer father and model mother in hospital room",
  "musk-blastar":
    "twelve-year-old boy coding a space game on a Commodore computer in a bedroom, 1983",
  "musk-bullied":
    "a teenage boy recovering in a hospital bed after a school beating, South Africa",
  "musk-canada":
    "seventeen-year-old immigrant working on a Canadian farm with a suitcase, 1988",
  "musk-zip2":
    "two brothers sleeping under desks in a cramped dot-com startup office, mid 1990s",
  "musk-paypal":
    "young Musk in a Silicon Valley office during the PayPal merger era, laptops and coffee",
  "musk-spacex":
    "Musk in a hangar beside an early Falcon rocket prototype, engineers at work, 2002",
  "musk-tesla":
    "Musk inspecting an early Tesla Roadster in a workshop, investors watching, 2004",
  "musk-2008":
    "exhausted Musk in a factory on Christmas Eve as a rocket launch succeeds on a screen, 2008",
  "musk-dragon":
    "SpaceX Dragon capsule approaching the International Space Station, Earth below, 2012",
  "musk-landing":
    "a Falcon 9 booster landing upright on a drone ship at sea, fire and smoke, 2016",
  "musk-model3":
    "Musk sleeping on the Tesla factory floor beside Model 3 production line, 2018",
  "musk-twitter":
    "Musk carrying a sink into Twitter headquarters, photographers flashing, 2022",
  "musk-xai":
    "Musk unveiling xAI before a Grok logo on a dark stage, 2023",
  "musk-spacex-ipo":
    "SpaceX SPCX ringing the Nasdaq opening bell, Starship poster behind, 2026",
  "musk-trillionaire":
    "Musk before a stock ticker showing two trillion as crowds cheer on trading floor, 2026",

  // Page
  "page-born":
    "a newborn in East Lansing Michigan, computer science professor father nearby, 1973",
  "page-michigan":
    "a boy playing with punch cards in a university computer lab, Michigan State, 1970s",
  "page-tesla-book":
    "twelve-year-old Larry Page reading a Nikola Tesla biography in a Michigan bedroom",
  "page-brin":
    "Larry Page and Sergey Brin meeting at Stanford grad student orientation, 1995",
  "page-pagerank":
    "Page sketching PageRank link diagrams on a whiteboard in a Stanford dorm, 1996",
  "page-garage":
    "Google founders in Susan Wojcicki's Menlo Park garage with early servers, 1998",
  "page-schmidt":
    "Page, Brin, and Eric Schmidt together at Google headquarters press event, 2001",
  "page-ipo":
    "Google IPO Dutch auction celebration, founders in casual clothes, 2004",
  "page-android":
    "Page signing Android acquisition papers beside a prototype phone, 2005",
  "page-return":
    "Larry Page returning as CEO addressing Google employees in a town hall, 2011",
  "page-alphabet":
    "Page announcing Alphabet restructuring on stage with corporate logos, 2015",
  "page-step-back":
    "Page kite surfing alone, distant shore, after stepping back from daily leadership, 2019",

  // Zuckerberg
  "zuckerberg-born":
    "a newborn in White Plains suburban home, dentist father downstairs, 1984",
  "zuckerberg-zucknet":
    "twelve-year-old Mark wiring a home messaging system between dental office and house",
  "zuckerberg-synapse":
    "teenager demoing Synapse music software on a laptop to impressed adults, 2002",
  "zuckerberg-harvard":
    "college students launching thefacebook on laptops in a Harvard dorm room, 2004",
  "zuckerberg-dropout":
    "young Zuckerberg moving servers into a Palo Alto rental house, 2005",
  "zuckerberg-newsfeed":
    "Facebook News Feed protest groups on screens while engineers watch metrics climb, 2006",
  "zuckerberg-yahoo":
    "Zuckerberg declining a Yahoo acquisition offer in a tense boardroom, 2007",
  "zuckerberg-ipo":
    "Facebook IPO and Instagram acquisition celebration in Silicon Valley office, 2012",
  "zuckerberg-whatsapp":
    "Zuckerberg announcing WhatsApp and Oculus acquisitions on stage, 2014",
  "zuckerberg-congress":
    "Mark Zuckerberg in a suit testifying before US Congress, cameras and senators, 2018",
  "zuckerberg-meta":
    "Zuckerberg presenting Meta rebranding with VR headset demo, 2021",
  "zuckerberg-ai":
    "Zuckerberg beside Llama AI model training cluster photos on a keynote screen, 2023",

  // Altman
  "altman-born":
    "a newborn in 1980s Chicago, Midwest family home, soft winter light",
  "altman-mac":
    "eight-year-old Sam Altman typing on an Apple Macintosh in a St Louis bedroom, 1990s",
  "altman-coming-out":
    "teenage Altman speaking at a high school assembly about coming out, 2001",
  "altman-loopt":
    "college dropout pitching Loopt location app on early mobile phones, Y Combinator era",
  "altman-yc-partner":
    "Sam Altman reading startup applications at Y Combinator office, whiteboards, 2011",
  "altman-yc-president":
    "Altman addressing a Y Combinator batch on demo day stage, founders listening, 2014",
  "altman-openai-founded":
    "Sam Altman in casual clothes at a plain folding table in a shabby rented startup office with laptops, coffee mugs, mismatched chairs, and a simple whiteboard with ordinary meeting notes, San Francisco 2015, mundane not futuristic",
  "altman-openai-ceo":
    "Altman touring a data center aisle of GPU racks as OpenAI CEO, 2019",
  "altman-chatgpt":
    "ChatGPT launch night, usage graph spiking on a monitor, team celebrating, November 2022",
  "altman-fired":
    "Altman stunned on a video call as board members fire him, San Francisco hotel room, 2023",
  "altman-ai-face":
    "Altman testifying about AI safety before lawmakers with calm expression, 2023",
};

export function buildScenePrompt(slug: string, title: string, figureKey?: string): string {
  const beat = SCENE_BEATS[slug];
  if (!beat) {
    throw new Error(`Missing scene beat for slug: ${slug}`);
  }
  const name = figureNameFromSlug(slug, figureKey);
  const scene = ensureFigureNamedInBeat(slug, beat, name);
  return `A cinematic historical illustration featuring ${name}. Scene: ${scene}. ${SCENE_STYLE} ${name} must be the clearly identifiable central figure in the scene.`;
}

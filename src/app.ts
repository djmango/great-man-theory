import { alexanderStories } from "./stories/alexander";

type DomainKey = "power" | "state" | "science" | "art" | "invent";

type DomainConfig = {
  label: string;
  v: string;
  hex: string;
};

type LifeEvent = {
  a: number;
  y: string;
  t: string;
  big?: 1;
  death?: 1;
  story?: EnhancedEvent;
};

type Person = {
  n: string;
  s: string;
  slug: string;
  d: DomainKey;
  b: number;
  x: number | null;
  place: string;
  ev: LifeEvent[];
};

type TourStop = {
  p: Person;
  e: LifeEvent;
  idx: number;
  evIdx: number;
};

type EnhancedEvent = {
  title: string;
  body: string;
  image: string;
  tags: string[];
};

type StorySlide = TourStop & {
  story: EnhancedEvent;
};

function byId<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing required element #${id}`);
  return el as T;
}

const CUR=2026, AMAX=100;
let PPY=30, SX=30, TOP=44;

const DOMAINS: Record<DomainKey, DomainConfig>={
  power:  {label:"Conquest & Power",     v:"--d-power",   hex:"#8b4513"},
  state:  {label:"Statecraft & Liberty", v:"--d-state",   hex:"#2563eb"},
  science:{label:"Science & Discovery",  v:"--d-science", hex:"#2d5016"},
  art:    {label:"Art & Music",          v:"--d-art",     hex:"#4a7a2e"},
  invent: {label:"Invention & Industry", v:"--d-invent",  hex:"#1a1a1a"},
};

const P: Person[]=[
 {n:"Alexander the Great", s:"Alexander the Great", slug:"alexander", d:"power", b:-356, x:-323, place:"Pella, Macedon", ev:[
   {a:0,y:"356 BC",t:"Born to King Philip II in Pella",story:alexanderStories["0"]},
   {a:10,y:"346 BC",t:"Tames the wild horse Bucephalus that no one else could ride",story:alexanderStories["10"]},
   {a:12,y:"344 BC",t:"Philip boasts that Macedonia will find a greater king than himself",story:alexanderStories["12"]},
   {a:13,y:"343 BC",t:"Aristotle becomes his private tutor",story:alexanderStories["13"]},
   {a:16,y:"340 BC",t:"Made regent; founds his first city",story:alexanderStories["16"]},
   {a:18,y:"338 BC",t:"Shatters the Sacred Band at Chaeronea",story:alexanderStories["18"]},
   {a:19,y:"337 BC",t:"At Philip's wedding, an insult turns succession into a crisis",big:1,story:alexanderStories["19"]},
   {a:20,y:"336 BC",t:"Crowned king after his father is murdered",big:1,story:alexanderStories["20"]},
   {a:22,y:"334 BC",t:"Invades Persia; first win at Granicus",story:alexanderStories["22"]},
   {a:23,y:"333 BC",t:"Cuts the Gordian Knot; routs Darius at Issus",story:alexanderStories["23"]},
   {a:25,y:"331 BC",t:"Founds Alexandria; hailed pharaoh of Egypt",story:alexanderStories["25-alexandria"]},
   {a:25,y:"331 BC",t:"Destroys the Persian army at Gaugamela",big:1,story:alexanderStories["25-gaugamela"]},
   {a:30,y:"326 BC",t:"Reaches India; victory at the Hydaspes",story:alexanderStories["30"]},
   {a:32,y:"323 BC",t:"Dies of fever in Babylon, undefeated",death:1,story:alexanderStories["32"]}]},

 {n:"Cleopatra VII", s:"Cleopatra VII", slug:"cleopatra", d:"state", b:-69, x:-30, place:"Alexandria, Egypt", ev:[
   {a:0,y:"69 BC",t:"Born in Alexandria, of the Ptolemy line"},
   {a:14,y:"55 BC",t:"Studies Greek, Egyptian, and several other languages as a princess"},
   {a:18,y:"51 BC",t:"Becomes co-ruler of Egypt with her brother"},
   {a:21,y:"48 BC",t:"Exiled, then allies with Caesar; restored",big:1},
   {a:22,y:"47 BC",t:"Bears Caesar a son, Caesarion"},
   {a:25,y:"44 BC",t:"In Rome when Caesar is assassinated"},
   {a:28,y:"41 BC",t:"Allies with the charismatic Mark Antony"},
   {a:35,y:"34 BC",t:"Rome turns against her and Antony"},
   {a:39,y:"31 BC",t:"Her fleet is lost at Actium",big:1},
   {a:39,y:"30 BC",t:"Dies by her own hand; Egypt falls to Rome",death:1}]},

 {n:"Genghis Khan", s:"Genghis Khan", slug:"genghis-khan", d:"power", b:1162, x:1227, place:"Mongolian steppe", ev:[
   {a:0,y:"1162",t:"Born Temüjin on the open steppe"},
   {a:9,y:"1171",t:"His father is poisoned; the clan casts them out"},
   {a:10,y:"c.1172",t:"Kills his half-brother Begter in a fight over stolen food"},
   {a:15,y:"c.1177",t:"Captured and enslaved by a rival clan; escapes"},
   {a:27,y:"c.1189",t:"Rescues his wife Börte; begins to unite tribes"},
   {a:44,y:"1206",t:"Proclaimed Genghis Khan over all Mongols",big:1},
   {a:49,y:"1211",t:"Invades Jin China"},
   {a:53,y:"1215",t:"Sacks Zhongdu, the future Beijing"},
   {a:57,y:"1219",t:"Annihilates the vast Khwarazmian Empire",big:1},
   {a:64,y:"1226",t:"Returns to crush the Western Xia"},
   {a:65,y:"1227",t:"Dies; his empire spans most of Asia",death:1}]},

 {n:"Leonardo da Vinci", s:"Leonardo da Vinci", slug:"leonardo", d:"art", b:1452, x:1519, place:"Vinci, Tuscany", ev:[
   {a:0,y:"1452",t:"Born out of wedlock near Vinci"},
   {a:14,y:"1466",t:"Apprenticed to Verrocchio in Florence"},
   {a:17,y:"1469",t:"Helps paint an angel in Verrocchio's Baptism of Christ"},
   {a:20,y:"1472",t:"Admitted to Florence's guild of painters"},
   {a:30,y:"1482",t:"Enters the service of Milan as engineer and artist"},
   {a:43,y:"1495",t:"Begins The Last Supper",big:1},
   {a:50,y:"1502",t:"Military engineer and mapmaker for Borgia"},
   {a:51,y:"1503",t:"Begins the Mona Lisa",big:1},
   {a:58,y:"1510",t:"Dissects cadavers; fills anatomy notebooks"},
   {a:61,y:"1513",t:"Sketches flying machines and water studies"},
   {a:64,y:"1516",t:"Invited to France by King Francis I"},
   {a:67,y:"1519",t:"Dies at Clos Lucé, his notebooks unmatched",death:1}]},

 {n:"Galileo Galilei", s:"Galileo Galilei", slug:"galileo", d:"science", b:1564, x:1642, place:"Pisa, Italy", ev:[
   {a:0,y:"1564",t:"Born in Pisa"},
   {a:19,y:"1583",t:"Notices a swinging lamp in the cathedral; timing it with his pulse"},
   {a:22,y:"1586",t:"Writes a treatise on the hydrostatic balance"},
   {a:25,y:"1589",t:"Wins the chair of mathematics at Pisa"},
   {a:45,y:"1609",t:"Builds his own telescope",big:1},
   {a:46,y:"1610",t:"Discovers four moons orbiting Jupiter",big:1},
   {a:48,y:"1612",t:"Observes sunspots and the phases of Venus"},
   {a:52,y:"1616",t:"First warned by the Inquisition"},
   {a:68,y:"1632",t:"Publishes his Dialogue on the two systems"},
   {a:69,y:"1633",t:"Condemned; recants; placed under house arrest",big:1},
   {a:74,y:"1638",t:"Smuggles out Two New Sciences"},
   {a:77,y:"1642",t:"Dies blind, under house arrest",death:1}]},

 {n:"Isaac Newton", s:"Isaac Newton", slug:"newton", d:"science", b:1643, x:1727, place:"Woolsthorpe, England", ev:[
   {a:0,y:"1643",t:"Born prematurely in Woolsthorpe"},
   {a:12,y:"1655",t:"Sent to Grantham school; builds water clocks and windmills"},
   {a:17,y:"1660",t:"Returns to the farm; his mother is persuaded to send him back to school"},
   {a:18,y:"1661",t:"Enters Trinity College, Cambridge as a subsizar"},
   {a:22,y:"1665",t:"Plague year at home: calculus and gravity begin",big:1},
   {a:26,y:"1669",t:"Made Lucasian Professor at Cambridge"},
   {a:29,y:"1672",t:"Builds a reflecting telescope; joins the Royal Society"},
   {a:30,y:"1672",t:"Splits white light into the spectrum"},
   {a:44,y:"1687",t:"Publishes the Principia",big:1},
   {a:53,y:"1696",t:"Made Warden of the Royal Mint"},
   {a:60,y:"1703",t:"Elected President of the Royal Society"},
   {a:62,y:"1705",t:"Knighted by Queen Anne"},
   {a:84,y:"1727",t:"Dies; buried in Westminster Abbey",death:1}]},

 {n:"Napoleon Bonaparte", s:"Napoleon Bonaparte", slug:"napoleon", d:"power", b:1769, x:1821, place:"Ajaccio, Corsica", ev:[
   {a:0,y:"1769",t:"Born in Ajaccio, Corsica"},
   {a:9,y:"1779",t:"Sent to military school in mainland France; mocked for his accent"},
   {a:15,y:"1784",t:"Graduates from the École Militaire in Paris"},
   {a:16,y:"1785",t:"Commissioned an artillery officer"},
   {a:24,y:"1793",t:"Retakes Toulon; made a general at twenty-four"},
   {a:26,y:"1795",t:"Crushes a royalist revolt in Paris"},
   {a:27,y:"1796",t:"Triumphs in Italy; marries Joséphine"},
   {a:29,y:"1798",t:"Invades Egypt"},
   {a:30,y:"1799",t:"Seizes power as First Consul",big:1},
   {a:35,y:"1804",t:"Crowns himself Emperor of the French",big:1},
   {a:36,y:"1805",t:"His masterpiece victory at Austerlitz"},
   {a:43,y:"1812",t:"His invasion of Russia ends in ruin",big:1},
   {a:45,y:"1814",t:"Abdicates; exiled to Elba"},
   {a:46,y:"1815",t:"Returns for a hundred days; falls at Waterloo"},
   {a:51,y:"1821",t:"Dies in exile on St. Helena",death:1}]},

 {n:"Ludwig van Beethoven", s:"Ludwig van Beethoven", slug:"beethoven", d:"art", b:1770, x:1827, place:"Bonn, Germany", ev:[
   {a:0,y:"1770",t:"Born in Bonn"},
   {a:4,y:"1774",t:"His father drills him at the keyboard like a prodigy"},
   {a:11,y:"1781",t:"Leaves school to support the family as an assistant organist"},
   {a:12,y:"1782",t:"Publishes his first compositions"},
   {a:21,y:"1792",t:"Moves to Vienna; studies under Haydn"},
   {a:25,y:"1795",t:"Debuts as a virtuoso pianist"},
   {a:28,y:"1798",t:"Begins to lose his hearing",big:1},
   {a:30,y:"1800",t:"Premieres his First Symphony"},
   {a:32,y:"1802",t:"In despair, vows to live for his art"},
   {a:34,y:"1804",t:"The revolutionary Eroica Symphony",big:1},
   {a:38,y:"1808",t:"Fifth and Sixth Symphonies premiere"},
   {a:46,y:"1816",t:"Now almost completely deaf"},
   {a:54,y:"1824",t:"Premieres the Ninth Symphony, stone deaf",big:1},
   {a:56,y:"1827",t:"Dies in Vienna",death:1}]},

 {n:"Abraham Lincoln", s:"Abraham Lincoln", slug:"lincoln", d:"state", b:1809, x:1865, place:"Kentucky, USA", ev:[
   {a:0,y:"1809",t:"Born in a one-room Kentucky log cabin"},
   {a:7,y:"1816",t:"Family moves to Indiana after a land-title dispute"},
   {a:9,y:"1818",t:"His mother Nancy dies of milk sickness"},
   {a:19,y:"1828",t:"Helps take a flatboat of goods to New Orleans"},
   {a:22,y:"1831",t:"Strikes out on his own in New Salem, Illinois"},
   {a:25,y:"1834",t:"Elected to the state legislature"},
   {a:27,y:"1836",t:"Becomes a self-taught lawyer"},
   {a:33,y:"1842",t:"Marries Mary Todd"},
   {a:49,y:"1858",t:"Debates Stephen Douglas over slavery"},
   {a:51,y:"1860",t:"Elected 16th President of the United States",big:1},
   {a:52,y:"1861",t:"The Civil War begins",big:1},
   {a:54,y:"1863",t:"Emancipation Proclamation; the Gettysburg Address",big:1},
   {a:56,y:"1865",t:"Wins the war, then is assassinated days later",death:1}]},

 {n:"Charles Darwin", s:"Charles Darwin", slug:"darwin", d:"science", b:1809, x:1882, place:"Shrewsbury, England", ev:[
   {a:0,y:"1809",t:"Born in Shrewsbury"},
   {a:8,y:"1817",t:"His mother dies; he is raised by his sisters"},
   {a:16,y:"1825",t:"Sent to Edinburgh to study medicine; hates surgery"},
   {a:18,y:"1827",t:"Enrolls at Cambridge to become a clergyman-naturalist"},
   {a:22,y:"1831",t:"Sets sail as naturalist aboard HMS Beagle",big:1},
   {a:26,y:"1835",t:"Studies the finches of the Galápagos",big:1},
   {a:27,y:"1836",t:"Returns to England after five years at sea"},
   {a:30,y:"1839",t:"Marries Emma; publishes the Beagle journal"},
   {a:33,y:"1842",t:"Settles at Down House to think for decades"},
   {a:42,y:"1851",t:"His beloved daughter Annie dies"},
   {a:50,y:"1859",t:"Publishes On the Origin of Species",big:1},
   {a:62,y:"1871",t:"Publishes The Descent of Man"},
   {a:73,y:"1882",t:"Dies; buried in Westminster Abbey",death:1}]},

 {n:"Marie Curie", s:"Marie Curie", slug:"curie", d:"science", b:1867, x:1934, place:"Warsaw, Poland", ev:[
   {a:0,y:"1867",t:"Born Maria Skłodowska in Warsaw"},
   {a:10,y:"1877",t:"Her mother dies of tuberculosis"},
   {a:15,y:"1882",t:"Graduates high school with a gold medal"},
   {a:18,y:"1885",t:"Works as a governess to fund her sister's Paris studies"},
   {a:24,y:"1891",t:"Moves to Paris to study at the Sorbonne"},
   {a:26,y:"1893",t:"Finishes first in her physics degree"},
   {a:28,y:"1895",t:"Marries fellow scientist Pierre Curie"},
   {a:31,y:"1898",t:"Discovers polonium and radium",big:1},
   {a:36,y:"1903",t:"First woman to win a Nobel Prize, in Physics",big:1},
   {a:39,y:"1906",t:"Pierre is killed; she takes over his chair"},
   {a:44,y:"1911",t:"Wins a second Nobel, in Chemistry",big:1},
   {a:47,y:"1914",t:"Runs mobile X-ray units in the Great War"},
   {a:66,y:"1934",t:"Dies of long exposure to her own radiation",death:1}]},

 {n:"Nikola Tesla", s:"Nikola Tesla", slug:"tesla", d:"invent", b:1856, x:1943, place:"Smiljan, Croatia", ev:[
   {a:0,y:"1856",t:"Born at midnight during a lightning storm"},
   {a:7,y:"1863",t:"His brother Dane dies; Tesla later blames himself"},
   {a:17,y:"1873",t:"Contracts cholera; his father promises to send him to engineering school"},
   {a:19,y:"1875",t:"Enrolls at Graz to study physics and mathematics"},
   {a:26,y:"1882",t:"Imagines the AC motor while walking in a park",big:1},
   {a:28,y:"1884",t:"Emigrates to the United States"},
   {a:30,y:"1886",t:"Founds his own electric company"},
   {a:32,y:"1888",t:"Patents the alternating-current motor",big:1},
   {a:37,y:"1893",t:"Lights the World's Fair with AC"},
   {a:39,y:"1895",t:"His system harnesses Niagara Falls",big:1},
   {a:43,y:"1899",t:"Conjures man-made lightning at Colorado Springs"},
   {a:45,y:"1901",t:"Begins the doomed Wardenclyffe Tower"},
   {a:49,y:"1905",t:"Wardenclyffe collapses; backers walk away"},
   {a:86,y:"1943",t:"Dies alone and broke in a New York hotel",death:1}]},

 {n:"Albert Einstein", s:"Albert Einstein", slug:"einstein", d:"science", b:1879, x:1955, place:"Ulm, Germany", ev:[
   {a:0,y:"1879",t:"Born in Ulm, Germany"},
   {a:5,y:"1884",t:"Fascinated by a compass; wonders what steers the needle"},
   {a:15,y:"1894",t:"Family moves to Italy; he stays in Munich to finish school"},
   {a:16,y:"1895",t:"Fails the entrance exam for the Zurich Polytechnic"},
   {a:17,y:"1896",t:"Renounces German citizenship to avoid military service"},
   {a:21,y:"1900",t:"Graduates, but cannot find a teaching job"},
   {a:23,y:"1902",t:"Takes a clerk's post at the patent office"},
   {a:26,y:"1905",t:"Miracle year: relativity and E = mc²",big:1},
   {a:36,y:"1915",t:"Completes the General Theory of Relativity",big:1},
   {a:40,y:"1919",t:"An eclipse proves him right; world fame",big:1},
   {a:42,y:"1921",t:"Wins the Nobel Prize in Physics"},
   {a:54,y:"1933",t:"Flees Nazi Germany for America"},
   {a:60,y:"1939",t:"Warns Roosevelt that an atom bomb is possible"},
   {a:76,y:"1955",t:"Dies in Princeton",death:1}]},

 {n:"Mahatma Gandhi", s:"Mahatma Gandhi", slug:"gandhi", d:"state", b:1869, x:1948, place:"Porbandar, India", ev:[
   {a:0,y:"1869",t:"Born in Porbandar, India"},
   {a:13,y:"1882",t:"Marries Kasturba in an arranged childhood wedding"},
   {a:18,y:"1887",t:"Sails to London to study law"},
   {a:19,y:"1888",t:"Joins the Inner Temple and adopts Western dress"},
   {a:24,y:"1893",t:"Thrown off a train in South Africa for his race",big:1},
   {a:37,y:"1906",t:"Launches satyagraha, his nonviolent resistance",big:1},
   {a:45,y:"1915",t:"Returns to India to lead"},
   {a:50,y:"1919",t:"Leads his first nationwide protest"},
   {a:61,y:"1930",t:"Leads the 240-mile Salt March",big:1},
   {a:73,y:"1942",t:"Launches the Quit India movement"},
   {a:78,y:"1947",t:"India wins independence, and is partitioned",big:1},
   {a:78,y:"1948",t:"Assassinated in New Delhi",death:1}]},

 {n:"Archimedes", s:"Archimedes", slug:"archimedes", d:"science", b:-287, x:-212, place:"Syracuse, Sicily", ev:[
   {a:0,y:"c.287 BC",t:"Born in Syracuse, Sicily"},
   {a:18,y:"c.269 BC",t:"Studies at Alexandria under followers of Euclid"},
   {a:25,y:"c.262 BC",t:"Devises the screw pump to raise water"},
   {a:36,y:"c.251 BC",t:"Cries Eureka; finds the law of buoyancy",big:1},
   {a:45,y:"c.242 BC",t:"Masters the lever, the pulley, and compound machines",big:1},
   {a:50,y:"c.237 BC",t:"Approximates pi and squares the parabola"},
   {a:55,y:"c.232 BC",t:"Writes On the Sphere and Cylinder, his favorite work"},
   {a:73,y:"214 BC",t:"His war machines hold off the Roman siege",big:1},
   {a:75,y:"c.212 BC",t:"Slain by a soldier as Syracuse falls",death:1}]},

 {n:"Julius Caesar", s:"Julius Caesar", slug:"caesar", d:"power", b:-100, x:-44, place:"Rome, Italy", ev:[
   {a:0,y:"100 BC",t:"Born into the Julian clan in Rome"},
   {a:15,y:"85 BC",t:"His father dies; he becomes head of the family young"},
   {a:16,y:"84 BC",t:"Marries Cornelia; refuses Sulla's order to divorce her"},
   {a:17,y:"83 BC",t:"Hides from Sulla's men until a pardon"},
   {a:25,y:"75 BC",t:"Captured by pirates; jokes he will crucify them, and later does"},
   {a:30,y:"70 BC",t:"Elected pontifex maximus in a surprise upset"},
   {a:36,y:"64 BC",t:"Elected aedile; stages lavish public games"},
   {a:40,y:"60 BC",t:"Forms the First Triumvirate with Pompey and Crassus",big:1},
   {a:42,y:"58 BC",t:"Begins the conquest of Gaul",big:1},
   {a:49,y:"51 BC",t:"Writes his Commentaries on the Gallic War"},
   {a:50,y:"50 BC",t:"Crosses the Rubicon; civil war begins",big:1},
   {a:54,y:"46 BC",t:"Defeats Pompey at Pharsalus"},
   {a:55,y:"44 BC",t:"Assassinated on the Ides of March in the Senate",death:1}]},

 {n:"James Watt", s:"James Watt", slug:"watt", d:"invent", b:1736, x:1819, place:"Greenock, Scotland", ev:[
   {a:0,y:"1736",t:"Born in Greenock, Scotland"},
   {a:6,y:"1742",t:"Often ill at home; his aunt teaches him to read"},
   {a:18,y:"1754",t:"Trains as a mathematical-instrument maker in London"},
   {a:21,y:"1757",t:"Sets up as an instrument maker at Glasgow University"},
   {a:27,y:"1763",t:"Asked to repair a model Newcomen steam engine"},
   {a:29,y:"1765",t:"Conceives the separate condenser on a Sunday walk",big:1},
   {a:33,y:"1769",t:"Patents the far more efficient steam engine",big:1},
   {a:39,y:"1775",t:"Partners with Matthew Boulton to build engines",big:1},
   {a:48,y:"1784",t:"Patents a steam locomotive design"},
   {a:52,y:"1788",t:"Adds the flyball governor for steady speed"},
   {a:64,y:"1800",t:"Retires wealthy as his patents expire"},
   {a:83,y:"1819",t:"Dies near Birmingham; the watt is later named for him",death:1}]},

 {n:"Alexander Hamilton", s:"Alexander Hamilton", slug:"hamilton", d:"state", b:1755, x:1804, place:"Nevis & New York, USA", ev:[
   {a:0,y:"c.1755",t:"Born out of wedlock in the Caribbean"},
   {a:10,y:"1765",t:"His father leaves the family; hardship shapes his ambition"},
   {a:12,y:"1767",t:"His mother dies, leaving him an orphan"},
   {a:17,y:"1772",t:"Writes a hurricane account that helps send him to America",big:1},
   {a:18,y:"1773",t:"Enrolls at King's College in New York"},
   {a:20,y:"1775",t:"Writes revolutionary pamphlets and joins a militia company"},
   {a:22,y:"1777",t:"Becomes George Washington's aide-de-camp",big:1},
   {a:26,y:"1781",t:"Leads a charge at Yorktown as the war is won",big:1},
   {a:32,y:"1787",t:"Argues for a stronger union at the Constitutional Convention"},
   {a:33,y:"1788",t:"Helps write The Federalist Papers",big:1},
   {a:34,y:"1789",t:"Becomes the first US secretary of the treasury",big:1},
   {a:36,y:"1791",t:"Creates the First Bank of the United States"},
   {a:49,y:"1804",t:"Killed in a duel with Aaron Burr",death:1}]},

 {n:"Michael Faraday", s:"Michael Faraday", slug:"faraday", d:"science", b:1791, x:1867, place:"London, England", ev:[
   {a:0,y:"1791",t:"Born poor in south London"},
   {a:13,y:"1804",t:"Works as a newspaper delivery boy to help the family"},
   {a:14,y:"1805",t:"Apprenticed to a bookbinder; reads every science book he binds"},
   {a:21,y:"1812",t:"Hears Humphry Davy lecture, then becomes his assistant",big:1},
   {a:22,y:"1813",t:"Tours Europe's laboratories as Davy's aide"},
   {a:30,y:"1821",t:"Builds the first electric motor",big:1},
   {a:34,y:"1825",t:"Isolates benzene; begins the Christmas Lectures"},
   {a:40,y:"1831",t:"Discovers electromagnetic induction",big:1},
   {a:42,y:"1833",t:"States the laws of electrolysis"},
   {a:54,y:"1845",t:"Finds that magnetism can bend light"},
   {a:55,y:"1846",t:"Proposes invisible fields and lines of force"},
   {a:76,y:"1867",t:"Dies at Hampton Court",death:1}]},

 {n:"Ada Lovelace", s:"Ada Lovelace", slug:"lovelace", d:"science", b:1815, x:1852, place:"London, England", ev:[
   {a:0,y:"1815",t:"Born in London, daughter of Lord Byron"},
   {a:1,y:"1816",t:"Byron leaves England; she never meets her father"},
   {a:12,y:"1827",t:"Designs wings and studies bird flight in a detailed plan"},
   {a:18,y:"1833",t:"Meets Charles Babbage and his calculating engine",big:1},
   {a:20,y:"1835",t:"Marries; soon becomes Countess of Lovelace"},
   {a:25,y:"1840",t:"Studies advanced mathematics with De Morgan"},
   {a:28,y:"1843",t:"Annotates the Analytical Engine; writes its first program",big:1},
   {a:29,y:"1844",t:"Imagines machines that compose music and art"},
   {a:36,y:"1852",t:"Dies of cancer at thirty-six",death:1}]},

 {n:"Louis Pasteur", s:"Louis Pasteur", slug:"pasteur", d:"science", b:1822, x:1895, place:"Dole, France", ev:[
   {a:0,y:"1822",t:"Born in Dole, eastern France"},
   {a:15,y:"1837",t:"Draws pastel portraits to help pay for school"},
   {a:18,y:"1840",t:"Earns his baccalauréat at Besançon"},
   {a:26,y:"1848",t:"Discovers the handedness of molecules"},
   {a:32,y:"1854",t:"Made dean of sciences at Lille"},
   {a:35,y:"1857",t:"Shows that microbes drive fermentation",big:1},
   {a:39,y:"1861",t:"Disproves spontaneous generation"},
   {a:40,y:"1862",t:"Invents pasteurization"},
   {a:46,y:"1868",t:"A stroke leaves him partly paralyzed"},
   {a:57,y:"1879",t:"Turns germ theory into working vaccines",big:1},
   {a:63,y:"1885",t:"His rabies vaccine saves a bitten boy",big:1},
   {a:66,y:"1888",t:"Opens the Pasteur Institute in Paris"},
   {a:72,y:"1895",t:"Dies near Paris",death:1}]},

 {n:"Andrew Carnegie", s:"Andrew Carnegie", slug:"carnegie", d:"invent", b:1835, x:1919, place:"Dunfermline, Scotland", ev:[
   {a:0,y:"1835",t:"Born poor in Dunfermline, Scotland"},
   {a:12,y:"1847",t:"His father loses his weaving job to steam-powered looms"},
   {a:13,y:"1848",t:"Emigrates to Pennsylvania; works in a cotton mill"},
   {a:18,y:"1853",t:"Becomes a telegrapher for the Pennsylvania Railroad"},
   {a:30,y:"1865",t:"Strikes out on his own into iron and bridges"},
   {a:37,y:"1872",t:"Bets everything on steel after seeing Bessemer mills",big:1},
   {a:54,y:"1889",t:"Writes The Gospel of Wealth"},
   {a:57,y:"1892",t:"The bloody Homestead strike stains his name",big:1},
   {a:66,y:"1901",t:"Sells out to form US Steel, the first billion-dollar firm",big:1},
   {a:67,y:"1902",t:"Pours his fortune into libraries and peace"},
   {a:84,y:"1919",t:"Dies having given away most of his wealth",death:1}]},

 {n:"John D. Rockefeller", s:"John D. Rockefeller", slug:"rockefeller", d:"invent", b:1839, x:1937, place:"Richford, New York", ev:[
   {a:0,y:"1839",t:"Born in rural New York"},
   {a:7,y:"1846",t:"His father, a traveling salesman, is often absent"},
   {a:16,y:"1855",t:"Lands his first clerk job in Cleveland"},
   {a:20,y:"1859",t:"Starts a produce trading firm"},
   {a:24,y:"1863",t:"Builds his first oil refinery"},
   {a:31,y:"1870",t:"Founds Standard Oil",big:1},
   {a:43,y:"1882",t:"Forms the Standard Oil Trust, a near-monopoly",big:1},
   {a:62,y:"1901",t:"Among the richest men in modern history",big:1},
   {a:72,y:"1911",t:"The Supreme Court breaks up Standard Oil",big:1},
   {a:74,y:"1913",t:"Creates the Rockefeller Foundation"},
   {a:98,y:"1937",t:"Dies at ninety-seven, a famed philanthropist",death:1}]},

 {n:"Karl Benz", s:"Karl Benz", slug:"benz", d:"invent", b:1844, x:1929, place:"Karlsruhe, Germany", ev:[
   {a:0,y:"1844",t:"Born near Karlsruhe, Germany"},
   {a:2,y:"1846",t:"His father dies; his mother struggles to raise him alone"},
   {a:15,y:"1859",t:"Graduates from the Karlsruhe Polytechnic"},
   {a:27,y:"1871",t:"Starts an iron foundry and machine shop"},
   {a:34,y:"1878",t:"Develops a reliable two-stroke engine"},
   {a:39,y:"1883",t:"Founds Benz and Company"},
   {a:41,y:"1885",t:"Builds the first true automobile, the Motorwagen",big:1},
   {a:42,y:"1886",t:"Patents the petrol-powered motor car",big:1},
   {a:44,y:"1888",t:"His wife Bertha makes the first long road trip",big:1},
   {a:50,y:"1894",t:"The Velo becomes the first mass-produced car"},
   {a:82,y:"1926",t:"His firm merges to form Mercedes-Benz",big:1},
   {a:84,y:"1929",t:"Dies in Ladenburg, Germany",death:1}]},

 {n:"Thomas Edison", s:"Thomas Edison", slug:"edison", d:"invent", b:1847, x:1931, place:"Milan, Ohio", ev:[
   {a:0,y:"1847",t:"Born in Milan, Ohio"},
   {a:7,y:"1854",t:"Family moves to Port Huron, Michigan"},
   {a:12,y:"1859",t:"Sells papers and candy on the railroad"},
   {a:15,y:"1862",t:"Saves a station agent's child from an oncoming train"},
   {a:22,y:"1869",t:"Patents his first invention, a vote recorder"},
   {a:30,y:"1877",t:"Invents the phonograph; the world hears recorded sound",big:1},
   {a:32,y:"1879",t:"Perfects a practical electric light bulb",big:1},
   {a:35,y:"1882",t:"Lights Manhattan from the Pearl Street station",big:1},
   {a:44,y:"1891",t:"Patents a motion-picture camera"},
   {a:45,y:"1892",t:"His companies merge to form General Electric"},
   {a:54,y:"1901",t:"Loses the war of the currents to AC"},
   {a:84,y:"1931",t:"Dies holding over a thousand patents",death:1}]},

 {n:"Alexander Graham Bell", s:"Alexander Graham Bell", slug:"bell", d:"invent", b:1847, x:1922, place:"Edinburgh, Scotland", ev:[
   {a:0,y:"1847",t:"Born in Edinburgh, Scotland"},
   {a:12,y:"1859",t:"Takes the name Graham at his coming-of-age ceremony"},
   {a:16,y:"1863",t:"Begins teaching elocution alongside his father"},
   {a:23,y:"1870",t:"Emigrates to Canada with his family"},
   {a:24,y:"1871",t:"Begins teaching the deaf in Boston"},
   {a:28,y:"1875",t:"Transmits the first sounds over a wire"},
   {a:29,y:"1876",t:"Patents the telephone, days ahead of a rival",big:1},
   {a:29,y:"1876",t:"Mr. Watson, come here: the first phone call",big:1},
   {a:30,y:"1877",t:"Founds the Bell Telephone Company"},
   {a:33,y:"1880",t:"Wins the Volta Prize; funds new research"},
   {a:41,y:"1888",t:"Helps found the National Geographic Society"},
   {a:60,y:"1907",t:"Builds giant kites and early flying machines"},
   {a:75,y:"1922",t:"Dies in Nova Scotia; phones fall silent in tribute",death:1}]},

 {n:"Henry Ford", s:"Henry Ford", slug:"ford", d:"invent", b:1863, x:1947, place:"Michigan, USA", ev:[
   {a:0,y:"1863",t:"Born on a Michigan farm"},
   {a:12,y:"1875",t:"Given a pocket watch; learns to repair it"},
   {a:15,y:"1878",t:"Refuses farm work; obsessed with machines instead"},
   {a:16,y:"1879",t:"Leaves the farm for machine shops in Detroit"},
   {a:28,y:"1891",t:"Becomes an engineer at Edison Illuminating"},
   {a:33,y:"1896",t:"Builds his first car, the Quadricycle",big:1},
   {a:40,y:"1903",t:"Founds the Ford Motor Company",big:1},
   {a:45,y:"1908",t:"Launches the affordable Model T",big:1},
   {a:50,y:"1913",t:"The moving assembly line transforms industry",big:1},
   {a:51,y:"1914",t:"Doubles pay to five dollars a day"},
   {a:64,y:"1927",t:"Ends the Model T after fifteen million sold"},
   {a:64,y:"1927",t:"Opens the giant River Rouge plant"},
   {a:84,y:"1947",t:"Dies in Dearborn, Michigan",death:1}]},

 {n:"Ferdinand Porsche", s:"Ferdinand Porsche", slug:"porsche", d:"invent", b:1875, x:1951, place:"Bohemia, Austria-Hungary", ev:[
   {a:0,y:"1875",t:"Born in Bohemia, then Austria-Hungary"},
   {a:15,y:"1890",t:"Wires his family's home for electric lighting"},
   {a:18,y:"1893",t:"Gets a job at Béla Egger, an electrical firm in Vienna"},
   {a:23,y:"1898",t:"Builds an electric car driven by hub motors"},
   {a:25,y:"1900",t:"Unveils a petrol-electric hybrid, the Lohner-Porsche",big:1},
   {a:48,y:"1923",t:"Chief engineer at Daimler; designs the Mercedes SS"},
   {a:56,y:"1931",t:"Opens his own design firm in Stuttgart"},
   {a:59,y:"1934",t:"Commissioned to design the people's car",big:1},
   {a:63,y:"1938",t:"The Volkswagen Beetle takes its final shape",big:1},
   {a:70,y:"1945",t:"Imprisoned in France after the war"},
   {a:73,y:"1948",t:"The first Porsche 356 sports car appears",big:1},
   {a:76,y:"1951",t:"Dies in Stuttgart",death:1}]},

 {n:"Guglielmo Marconi", s:"Guglielmo Marconi", slug:"marconi", d:"invent", b:1874, x:1937, place:"Bologna, Italy", ev:[
   {a:0,y:"1874",t:"Born in Bologna, Italy"},
   {a:18,y:"1892",t:"Fails the naval academy entrance exam"},
   {a:20,y:"1894",t:"Reads of radio waves and starts experimenting in the attic",big:1},
   {a:21,y:"1895",t:"Sends a wireless signal over a mile"},
   {a:22,y:"1896",t:"Moves to Britain and patents wireless telegraphy",big:1},
   {a:25,y:"1899",t:"Sends signals across the English Channel"},
   {a:27,y:"1901",t:"Spans the Atlantic with a wireless signal",big:1},
   {a:35,y:"1909",t:"Shares the Nobel Prize in Physics",big:1},
   {a:38,y:"1912",t:"His wireless helps save Titanic survivors"},
   {a:49,y:"1923",t:"Pioneers shortwave and beam radio"},
   {a:63,y:"1937",t:"Dies in Rome; stations fall silent",death:1}]},

 {n:"Warner Brothers", s:"Warner Brothers", slug:"warner-brothers", d:"art", b:1881, x:1978, place:"Youngstown & Hollywood, USA", ev:[
   {a:0,y:"1881",t:"Harry Warner is born in Poland; Albert, Sam, and Jack follow later"},
   {a:11,y:"1892",t:"Jack, the youngest brother, is born in Ontario"},
   {a:22,y:"1903",t:"The brothers buy a projector and begin showing films"},
   {a:23,y:"1904",t:"Open an early nickelodeon in Pennsylvania"},
   {a:42,y:"1923",t:"Found Warner Bros. Pictures in Hollywood",big:1},
   {a:45,y:"1926",t:"Invest in Vitaphone sound-on-disc technology"},
   {a:46,y:"1927",t:"The Jazz Singer makes talking pictures impossible to ignore",big:1},
   {a:46,y:"1927",t:"Sam Warner dies just before the sound breakthrough"},
   {a:59,y:"1940",t:"The studio helps define animated shorts with Bugs Bunny"},
   {a:67,y:"1948",t:"The Paramount decision breaks the old studio system"},
   {a:85,y:"1966",t:"Jack Warner sells his controlling stake in the studio"},
   {a:97,y:"1978",t:"Jack Warner dies, the last of the founding brothers",death:1}]},

 {n:"Wright Brothers", s:"Wright Brothers", slug:"wright", d:"invent", b:1867, x:1912, place:"Dayton, Ohio", ev:[
   {a:0,y:"1867",t:"Wilbur is born in Indiana; Orville follows in 1871"},
   {a:4,y:"1871",t:"Orville is born; the brothers share a workshop and curiosity"},
   {a:18,y:"1885",t:"Wilbur, once bound for Yale, is sidelined by illness"},
   {a:22,y:"1889",t:"The brothers start a printing business"},
   {a:25,y:"1892",t:"Open a bicycle shop in Dayton, Ohio"},
   {a:32,y:"1899",t:"Turn their minds to the problem of flight",big:1},
   {a:33,y:"1900",t:"Begin glider tests at Kitty Hawk"},
   {a:34,y:"1901",t:"Build a wind tunnel to perfect their wings"},
   {a:36,y:"1903",t:"Achieve the first powered flight, twelve seconds",big:1},
   {a:38,y:"1905",t:"Fly the first practical airplane for 39 minutes",big:1},
   {a:41,y:"1908",t:"Stun Europe and win army contracts",big:1},
   {a:45,y:"1912",t:"Wilbur dies of typhoid; Orville lives to 1948",death:1}]},

 {n:"Niels Bohr", s:"Niels Bohr", slug:"bohr", d:"science", b:1885, x:1962, place:"Copenhagen, Denmark", ev:[
   {a:0,y:"1885",t:"Born in Copenhagen"},
   {a:16,y:"1901",t:"Enters the University of Copenhagen"},
   {a:20,y:"1905",t:"Wins a gold medal for a physics essay on surface tension"},
   {a:26,y:"1911",t:"Studies under Thomson and Rutherford in England"},
   {a:28,y:"1913",t:"Models the atom with quantized orbits",big:1},
   {a:31,y:"1916",t:"Becomes professor of physics at Copenhagen"},
   {a:37,y:"1922",t:"Wins the Nobel Prize in Physics",big:1},
   {a:42,y:"1927",t:"Debates Einstein over quantum reality",big:1},
   {a:54,y:"1939",t:"Carries news of nuclear fission to America"},
   {a:58,y:"1943",t:"Escapes Nazi-occupied Denmark by boat"},
   {a:59,y:"1944",t:"Joins the Manhattan Project as a consultant"},
   {a:65,y:"1950",t:"Pleads for an open world and arms control"},
   {a:77,y:"1962",t:"Dies in Copenhagen",death:1}]},

 {n:"Enzo Ferrari", s:"Enzo Ferrari", slug:"ferrari", d:"invent", b:1898, x:1988, place:"Modena, Italy", ev:[
   {a:0,y:"1898",t:"Born in Modena, Italy"},
   {a:10,y:"1908",t:"Sees a motor race at the Bologna circuit; dreams of speed"},
   {a:18,y:"1916",t:"His father and brother die in the flu epidemic"},
   {a:21,y:"1919",t:"Begins racing cars after the Great War"},
   {a:22,y:"1920",t:"Becomes a works driver for Alfa Romeo"},
   {a:31,y:"1929",t:"Founds Scuderia Ferrari as Alfa's race team",big:1},
   {a:49,y:"1947",t:"Builds the first car under his own name",big:1},
   {a:52,y:"1950",t:"Enters the new Formula One world championship"},
   {a:58,y:"1956",t:"His son Dino dies; a lasting grief"},
   {a:63,y:"1961",t:"Wins the F1 title amid a factory walkout"},
   {a:71,y:"1969",t:"Sells half the company to Fiat to survive"},
   {a:90,y:"1988",t:"Dies in Modena, a racing legend",death:1}]},

 {n:"Walt Disney", s:"Walt Disney", slug:"disney", d:"invent", b:1901, x:1966, place:"Chicago, USA", ev:[
   {a:0,y:"1901",t:"Born in Chicago"},
   {a:9,y:"1910",t:"Family moves to a Missouri farm; he draws and sells sketches"},
   {a:16,y:"1917",t:"Drops out of high school to join the Red Cross in France"},
   {a:18,y:"1919",t:"Works as a commercial artist in Kansas City"},
   {a:22,y:"1923",t:"Arrives in Hollywood with forty dollars"},
   {a:26,y:"1928",t:"Creates Mickey Mouse in Steamboat Willie",big:1},
   {a:31,y:"1932",t:"Wins his first Oscar; pioneers full color"},
   {a:36,y:"1937",t:"Releases Snow White, the first feature cartoon",big:1},
   {a:53,y:"1955",t:"Opens Disneyland in California",big:1},
   {a:63,y:"1964",t:"Mary Poppins and the New York World's Fair"},
   {a:64,y:"1965",t:"Begins planning his Florida theme park"},
   {a:65,y:"1966",t:"Dies of cancer in Burbank",death:1}]},

 {n:"John von Neumann", s:"John von Neumann", slug:"von-neumann", d:"science", b:1903, x:1957, place:"Budapest, Hungary", ev:[
   {a:0,y:"1903",t:"Born in Budapest, a child prodigy"},
   {a:6,y:"1909",t:"Divides two eight-digit numbers in his head for guests"},
   {a:15,y:"1918",t:"Enters the University of Budapest to study mathematics"},
   {a:23,y:"1926",t:"Earns a math doctorate and a chemistry degree at once",big:1},
   {a:29,y:"1932",t:"Lays mathematical foundations for quantum theory"},
   {a:30,y:"1933",t:"Among the first faculty at Princeton's Institute"},
   {a:41,y:"1944",t:"Founds game theory with Morgenstern",big:1},
   {a:42,y:"1945",t:"Describes the stored-program computer",big:1},
   {a:42,y:"1945",t:"Works on the bomb; designs implosion lenses"},
   {a:49,y:"1952",t:"Builds the IAS computer; helps father the H-bomb"},
   {a:51,y:"1954",t:"Advises the government on missiles and computing"},
   {a:53,y:"1957",t:"Dies of cancer in Washington",death:1}]},

 {n:"J. Robert Oppenheimer", s:"J. Robert Oppenheimer", slug:"oppenheimer", d:"science", b:1904, x:1967, place:"New York, USA", ev:[
   {a:0,y:"1904",t:"Born in New York to a wealthy family"},
   {a:11,y:"1915",t:"Collects minerals and writes to the New York Mineralogical Club"},
   {a:14,y:"1918",t:"Sends a letter that gets him invited to give a club lecture"},
   {a:18,y:"1922",t:"Enters Harvard; studies chemistry, then pivots to physics"},
   {a:21,y:"1925",t:"Graduates from Harvard in three years"},
   {a:23,y:"1927",t:"Earns his physics doctorate at Gottingen"},
   {a:25,y:"1929",t:"Builds American theoretical physics at Berkeley"},
   {a:35,y:"1939",t:"Predicts black holes from collapsing stars",big:1},
   {a:39,y:"1943",t:"Founds Los Alamos in the New Mexico desert",big:1},
   {a:41,y:"1945",t:"The Trinity test: now I am become Death",big:1},
   {a:43,y:"1947",t:"Heads the Institute for Advanced Study"},
   {a:50,y:"1954",t:"Stripped of clearance in a Red Scare hearing",big:1},
   {a:59,y:"1963",t:"Honored with the Enrico Fermi Award"},
   {a:62,y:"1967",t:"Dies of throat cancer",death:1}]},

 {n:"Alan Turing", s:"Alan Turing", slug:"turing", d:"science", b:1912, x:1954, place:"London, England", ev:[
   {a:0,y:"1912",t:"Born in London"},
   {a:6,y:"1918",t:"Sent to boarding school; letters home are full of puzzles"},
   {a:13,y:"1925",t:"Enters Sherborne; cycles 60 miles when a strike cancels trains"},
   {a:16,y:"1928",t:"A close school friendship shapes his later life"},
   {a:22,y:"1934",t:"Takes a first in mathematics at Cambridge"},
   {a:24,y:"1936",t:"Defines the universal computing machine",big:1},
   {a:26,y:"1938",t:"Earns his doctorate at Princeton"},
   {a:27,y:"1939",t:"Joins Bletchley Park to break Nazi codes",big:1},
   {a:27,y:"1939",t:"Designs the Bombe to crack the Enigma"},
   {a:30,y:"1942",t:"His methods help turn the Atlantic war",big:1},
   {a:33,y:"1945",t:"Designs a stored-program computer, the ACE"},
   {a:38,y:"1950",t:"Poses the imitation game, the Turing test",big:1},
   {a:39,y:"1951",t:"Elected a Fellow of the Royal Society"},
   {a:40,y:"1952",t:"Prosecuted for homosexuality; chemically punished"},
   {a:41,y:"1954",t:"Dies of cyanide poisoning",death:1}]},

 {n:"Richard Feynman", s:"Richard Feynman", slug:"feynman", d:"science", b:1918, x:1988, place:"New York, USA", ev:[
   {a:0,y:"1918",t:"Born in Queens, New York"},
   {a:4,y:"1922",t:"His father teaches him to question, not just name, things"},
   {a:12,y:"1930",t:"Sets up a home lab and repairs radios in the neighborhood"},
   {a:15,y:"1933",t:"Wins the New York University Math Championship"},
   {a:21,y:"1939",t:"Graduates from MIT, then on to Princeton"},
   {a:24,y:"1942",t:"Joins the Manhattan Project at Los Alamos",big:1},
   {a:27,y:"1945",t:"His wife Arline dies just before the Trinity test"},
   {a:30,y:"1948",t:"Reinvents quantum electrodynamics with his diagrams",big:1},
   {a:32,y:"1950",t:"Becomes a professor at Caltech"},
   {a:46,y:"1964",t:"Delivers the celebrated Lectures on Physics"},
   {a:47,y:"1965",t:"Shares the Nobel Prize in Physics",big:1},
   {a:68,y:"1986",t:"Exposes the Challenger O-ring flaw on live TV",big:1},
   {a:69,y:"1988",t:"Dies in Los Angeles",death:1}]},

 {n:"Rosalind Franklin", s:"Rosalind Franklin", slug:"franklin", d:"science", b:1920, x:1958, place:"London, England", ev:[
   {a:0,y:"1920",t:"Born in London"},
   {a:11,y:"1931",t:"Sent to St Paul's Girls' School; excels in science"},
   {a:18,y:"1938",t:"Wins a scholarship to Newnham College, Cambridge"},
   {a:21,y:"1941",t:"Graduates in chemistry from Cambridge"},
   {a:25,y:"1945",t:"Earns her doctorate on the structure of coal"},
   {a:27,y:"1947",t:"Masters X-ray crystallography in Paris"},
   {a:31,y:"1951",t:"Joins King's College London to study DNA"},
   {a:32,y:"1952",t:"Captures Photo 51, DNA's clearest image",big:1},
   {a:33,y:"1953",t:"Her data underpins the double-helix model",big:1},
   {a:33,y:"1953",t:"Moves to Birkbeck; turns to virus structure"},
   {a:36,y:"1956",t:"Maps the tobacco mosaic virus"},
   {a:37,y:"1958",t:"Dies of ovarian cancer at thirty-seven",death:1}]},

 {n:"Steve Jobs", s:"Steve Jobs", slug:"jobs", d:"invent", b:1955, x:2011, place:"San Francisco, USA", ev:[
   {a:0,y:"1955",t:"Born in San Francisco, given up for adoption"},
   {a:13,y:"1968",t:"Calls Bill Hewlett; lands a summer job at HP"},
   {a:17,y:"1972",t:"Drops out of Reed College but sits in on a calligraphy class"},
   {a:19,y:"1974",t:"Travels to India seeking spiritual enlightenment"},
   {a:21,y:"1976",t:"Co-founds Apple in his parents' garage",big:1},
   {a:22,y:"1977",t:"The Apple II becomes a home-computer hit"},
   {a:29,y:"1984",t:"Launches the Macintosh with a famous ad",big:1},
   {a:30,y:"1985",t:"Forced out of the company he founded",big:1},
   {a:31,y:"1986",t:"Buys the studio that becomes Pixar"},
   {a:42,y:"1997",t:"Returns to a near-bankrupt Apple",big:1},
   {a:43,y:"1998",t:"The iMac begins the turnaround"},
   {a:46,y:"2001",t:"The iPod puts a thousand songs in your pocket",big:1},
   {a:52,y:"2007",t:"Unveils the iPhone",big:1},
   {a:55,y:"2010",t:"Introduces the iPad"},
   {a:56,y:"2011",t:"Dies of cancer; Apple the world's most valued firm",death:1}]},

 {n:"Bill Gates", s:"Bill Gates", slug:"gates", d:"invent", b:1955, x:null, place:"Seattle, USA", ev:[
   {a:0,y:"1955",t:"Born in Seattle, Washington"},
   {a:13,y:"1968",t:"Starts programming on a school terminal"},
   {a:15,y:"1970",t:"Writes a program to schedule classes; tweaks it for more girls"},
   {a:17,y:"1972",t:"Co-founds Traf-O-Data to read traffic tapes"},
   {a:19,y:"1975",t:"Drops out of Harvard to found Microsoft",big:1},
   {a:25,y:"1980",t:"Licenses an operating system to IBM",big:1},
   {a:30,y:"1985",t:"Ships the first version of Windows",big:1},
   {a:31,y:"1986",t:"Takes Microsoft public; soon a billionaire"},
   {a:40,y:"1995",t:"Windows 95 and the internet arrive together",big:1},
   {a:43,y:"1998",t:"The US sues Microsoft over its monopoly"},
   {a:45,y:"2000",t:"Starts the Gates Foundation with his wife",big:1},
   {a:53,y:"2008",t:"Leaves daily work to give away his fortune",big:1},
   {a:66,y:"2021",t:"Pledges to drop off the world's richest list"}]},

 {n:"Jeff Bezos", s:"Jeff Bezos", slug:"bezos", d:"invent", b:1964, x:null, place:"Albuquerque, USA", ev:[
   {a:0,y:"1964",t:"Born in Albuquerque, New Mexico"},
   {a:4,y:"1968",t:"His mother remarries; he takes the name Bezos"},
   {a:12,y:"1976",t:"Installs an alarm on his bedroom to keep siblings out"},
   {a:18,y:"1982",t:"Valedictorian; dreams of space colonies in his speech"},
   {a:22,y:"1986",t:"Graduates from Princeton in computer science"},
   {a:30,y:"1994",t:"Quits Wall Street and founds Amazon",big:1},
   {a:31,y:"1995",t:"Amazon sells its first book online"},
   {a:33,y:"1997",t:"Takes Amazon public"},
   {a:36,y:"2000",t:"Founds the rocket company Blue Origin",big:1},
   {a:42,y:"2006",t:"Launches Amazon Web Services, the cloud",big:1},
   {a:49,y:"2013",t:"Buys The Washington Post"},
   {a:53,y:"2017",t:"Amazon buys Whole Foods and keeps climbing"},
   {a:54,y:"2018",t:"Becomes the world's richest person",big:1},
   {a:57,y:"2021",t:"Steps down as CEO and flies to space",big:1}]},

 {n:"Jensen Huang", s:"Jensen Huang", slug:"huang", d:"invent", b:1963, x:null, place:"Tainan, Taiwan", ev:[
   {a:0,y:"1963",t:"Born in Tainan, Taiwan"},
   {a:9,y:"1973",t:"Sent to the United States; arrives at a Kentucky boarding school"},
   {a:15,y:"1978",t:"Works as a dishwasher at Denny's while in high school"},
   {a:21,y:"1984",t:"Graduates in electrical engineering"},
   {a:30,y:"1993",t:"Co-founds Nvidia at a roadside diner",big:1},
   {a:36,y:"1999",t:"Coins the GPU and takes Nvidia public",big:1},
   {a:43,y:"2006",t:"Launches CUDA to compute on graphics chips",big:1},
   {a:49,y:"2012",t:"Nvidia chips power the deep-learning breakthrough",big:1},
   {a:53,y:"2016",t:"Hand-delivers the first AI supercomputer to OpenAI"},
   {a:59,y:"2022",t:"The AI boom makes Nvidia chips essential"},
   {a:60,y:"2023",t:"Nvidia rockets toward a trillion-dollar value",big:1}]},

 {n:"Elon Musk", s:"Elon Musk", slug:"musk", d:"invent", b:1971, x:null, place:"Pretoria, South Africa", ev:[
   {a:0,y:"1971",t:"Born in Pretoria, South Africa"},
   {a:10,y:"1981",t:"Teaches himself to program; sells a space game called Blastar"},
   {a:12,y:"1983",t:"Bullied at school; hospitalized after a beating"},
   {a:17,y:"1988",t:"Leaves South Africa to avoid military service"},
   {a:24,y:"1995",t:"Drops out of Stanford to start a web company"},
   {a:28,y:"1999",t:"Sells Zip2, then co-founds what becomes PayPal",big:1},
   {a:31,y:"2002",t:"Founds SpaceX to make rockets reusable",big:1},
   {a:33,y:"2004",t:"Leads and funds the young Tesla Motors",big:1},
   {a:37,y:"2008",t:"Both firms nearly fail, then are saved",big:1},
   {a:41,y:"2012",t:"SpaceX docks with the space station"},
   {a:44,y:"2015",t:"Lands an orbital rocket booster upright",big:1},
   {a:47,y:"2018",t:"Tesla scales the Model 3 to the mass market"},
   {a:51,y:"2022",t:"Buys Twitter for 44 billion dollars",big:1},
   {a:52,y:"2023",t:"Launches xAI amid the AI boom"},
   {a:55,y:"2026",t:"SpaceX goes public on Nasdaq as SPCX in a record $75 billion IPO",big:1},
   {a:55,y:"2026",t:"Becomes the world's first trillionaire as SPCX tops $2 trillion"}]},

 {n:"Larry Page", s:"Larry Page", slug:"page", d:"invent", b:1973, x:null, place:"Michigan, USA", ev:[
   {a:0,y:"1973",t:"Born in East Lansing, Michigan"},
   {a:6,y:"1979",t:"Grows up around Michigan State computer science"},
   {a:12,y:"1985",t:"Reads about Nikola Tesla and decides to invent things"},
   {a:22,y:"1995",t:"Meets Sergey Brin at Stanford"},
   {a:23,y:"1996",t:"Builds a search engine that ranks pages by links",big:1},
   {a:25,y:"1998",t:"Co-founds Google in a garage",big:1},
   {a:28,y:"2001",t:"Hands the CEO role to Eric Schmidt for a time"},
   {a:31,y:"2004",t:"Google goes public",big:1},
   {a:32,y:"2005",t:"Google buys a small startup called Android"},
   {a:38,y:"2011",t:"Returns as CEO of Google"},
   {a:42,y:"2015",t:"Restructures Google under a new parent, Alphabet",big:1},
   {a:46,y:"2019",t:"Steps back from daily leadership"}]},

 {n:"Mark Zuckerberg", s:"Mark Zuckerberg", slug:"zuckerberg", d:"invent", b:1984, x:null, place:"New York, USA", ev:[
   {a:0,y:"1984",t:"Born in White Plains, New York"},
   {a:12,y:"1996",t:"Builds ZuckNet, a messaging system for the family home"},
   {a:18,y:"2002",t:"Creates Synapse, a music recommendation program"},
   {a:19,y:"2004",t:"Launches Facebook from a Harvard dorm",big:1},
   {a:20,y:"2005",t:"Drops out and moves the company to Silicon Valley"},
   {a:22,y:"2006",t:"Opens Facebook to all; adds the News Feed"},
   {a:23,y:"2007",t:"Turns down a billion-dollar buyout"},
   {a:28,y:"2012",t:"Takes Facebook public; buys Instagram",big:1},
   {a:30,y:"2014",t:"Buys WhatsApp and the VR maker Oculus"},
   {a:34,y:"2018",t:"Testifies to Congress over data and privacy",big:1},
   {a:37,y:"2021",t:"Renames the company Meta and bets on the metaverse",big:1},
   {a:39,y:"2023",t:"Pivots hard toward artificial intelligence"}]},

 {n:"Sam Altman", s:"Sam Altman", slug:"altman", d:"invent", b:1985, x:null, place:"Chicago, USA", ev:[
   {a:0,y:"1985",t:"Born in Chicago, raised in St. Louis"},
   {a:8,y:"1993",t:"Gets his first computer, an Apple Macintosh"},
   {a:16,y:"2001",t:"Comes out as gay to his high school community"},
   {a:19,y:"2005",t:"Drops out of Stanford to start Loopt",big:1},
   {a:26,y:"2011",t:"Becomes a partner at Y Combinator"},
   {a:28,y:"2014",t:"Named president of Y Combinator",big:1},
   {a:30,y:"2015",t:"Co-founds OpenAI as a research lab",big:1},
   {a:34,y:"2019",t:"Leaves YC to lead OpenAI full time"},
   {a:37,y:"2022",t:"ChatGPT launches and stuns the world",big:1},
   {a:38,y:"2023",t:"Fired and reinstated as CEO in five days",big:1},
   {a:38,y:"2023",t:"Becomes the public face of the AI age"}]},
];

const head=byId<HTMLDivElement>('head'), axis=byId<HTMLDivElement>('axis'),
      cols=byId<HTMLDivElement>('cols'), grid=byId<HTMLDivElement>('grid'),
      board=byId<HTMLDivElement>('board'), bodyEl=byId<HTMLDivElement>('body'),
      tip=byId<HTMLDivElement>('tip');
const present=[...new Set(P.map(p=>p.d))] as DomainKey[];
const active=new Set<DomainKey>(present);

function finalAge(p: Person){ return (p.x==null?CUR:p.x)-p.b; }
function esc(s: string){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function yr(v: number){ return v<0?Math.abs(v)+" BC":""+v; }
function spanLabel(p: Person){ return p.x==null?yr(p.b)+" – now":yr(p.b)+" – "+yr(p.x); }

const data=P.slice().sort((a,b)=>a.b-b.b);
let io: IntersectionObserver | null=null;

function build(){
  const BODYH=TOP+AMAX*PPY;
  head.querySelectorAll<HTMLElement>('.phead').forEach(e=>e.remove());
  cols.querySelectorAll<HTMLElement>('.col').forEach(e=>e.remove());
  bodyEl.querySelectorAll<HTMLElement>('.youline,.youtag').forEach(e=>e.remove());
  axis.innerHTML=''; grid.innerHTML='';
  bodyEl.style.height=BODYH+'px'; axis.style.height=BODYH+'px'; cols.style.height=BODYH+'px';
  if(io) io.disconnect();
  io=new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io?.unobserve(e.target); } }); },{rootMargin:"0px 0px -6% 0px"});

  for(let a=0;a<=AMAX;a+=5){
    const major=a%10===0;
    const t=document.createElement('div'); t.className='tick'+(major?' major':''); t.style.top=(TOP+a*PPY)+'px';
    if(major){ const s=document.createElement('span'); s.textContent=String(a); t.appendChild(s); }
    axis.appendChild(t);
    if(a>0){ const g=document.createElement('div'); g.className='gline'+(major?' major':''); g.style.top=(TOP+a*PPY)+'px'; grid.appendChild(g); }
  }

  data.forEach((p,idx)=>{
    const dm=DOMAINS[p.d], fa=finalAge(p), living=p.x==null;

    const ph=document.createElement('div'); ph.className='phead'; ph.style.setProperty('--clr',`var(${dm.v})`); ph.dataset.i=String(idx);
    ph.innerHTML=`
      <div class="pf">
        <img src="images/portraits/${p.slug}.webp" alt="${esc(p.s)}" loading="lazy"
             onload="this.style.opacity=1" onerror="this.remove()">
        <span class="tag">${esc(dm.label.split(' ')[0])}</span>
      </div>
      <div class="pfoot">
        <div class="txt"><div class="nm">${esc(p.s)}</div><div class="span">${spanLabel(p)}</div></div>
        <div class="fin">${fa}${living?'<i>now</i>':''}</div>
      </div>`;
    head.appendChild(ph);
    ph.addEventListener('click',()=>toggleSelect(idx));

    const endAge=living?fa:(p.ev.find(e=>e.death)?.a ?? fa);
    const col=document.createElement('div'); col.className='col'; col.style.setProperty('--clr',`var(${dm.v})`); col.style.setProperty('--sx',SX+'px'); col.dataset.i=String(idx);
    const sp=document.createElement('div'); sp.className='spine'; sp.style.top=TOP+'px'; sp.style.height=(endAge*PPY)+'px'; col.appendChild(sp);
    if(living){ const fu=document.createElement('div'); fu.className='future'; fu.style.top=(fa*PPY)+'px'; fu.style.height=((AMAX-fa)*PPY)+'px'; sp.appendChild(fu); }

    p.ev.forEach((e,evIdx)=>{
      const ev=document.createElement('div'); ev.className='ev'+(e.big?' major':'')+(e.story?' enhanced':''); ev.style.top=(TOP+e.a*PPY)+'px';
      if(e.death) ev.dataset.death='1';
      ev.dataset.i=String(idx);
      ev.dataset.e=String(evIdx);
      ev.innerHTML=`<div class="node ${e.big?'major':''} ${e.death?'death':''}"></div>
        <div class="card"><div class="a">${e.a===0?'Born':e.a}${e.a===0?'':'<i>yrs</i>'}</div><div class="t">${esc(e.t)}</div></div>`;
      const node=ev.querySelector<HTMLElement>('.node');
      const card=ev.querySelector<HTMLElement>('.card');
      if(!node) return;
      const openEnhanced=()=>{ hideTip(); void openStoryModal(idx,evIdx); };
      if(e.story){
        const prefetch=()=>{ void prefetchStoryImage(e.story!.image); };
        node.addEventListener('click',(x: MouseEvent)=>{ x.stopPropagation(); openEnhanced(); });
        card?.addEventListener('click',(x: MouseEvent)=>{ x.stopPropagation(); openEnhanced(); });
        node.addEventListener('mouseenter',()=>{ prefetch(); cancelHide(); const r=node.getBoundingClientRect(); openTip(p,e,r.left+r.width/2,r.top); });
        card?.addEventListener('mouseenter',prefetch);
        node.addEventListener('mouseleave',scheduleHide);
      }else{
        node.addEventListener('click',(x: MouseEvent)=>{ x.stopPropagation(); openTip(p,e,x.clientX,x.clientY); });
        node.addEventListener('mouseenter',()=>{ cancelHide(); const r=node.getBoundingClientRect(); openTip(p,e,r.left+r.width/2,r.top); });
        node.addEventListener('mouseleave',scheduleHide);
      }
      col.appendChild(ev); io?.observe(ev);
    });
    cols.appendChild(col);
  });

  declutter();
  const yl=document.createElement('div'); yl.className='youline'; yl.id='youline';
  bodyEl.appendChild(yl);
  const yt=document.createElement('div'); yt.className='youtag'; yt.id='youtag';
  yt.innerHTML=`<b id="youtagN">26</b><i>you</i>`;
  axis.appendChild(yt);
  positionYou(+byId<HTMLInputElement>('youSlider').value);
}

function declutter(){
  const GAP=7, MIN_TOP=10;
  cols.querySelectorAll<HTMLElement>('.col').forEach(col=>{
    col.querySelectorAll<HTMLElement>('.lead').forEach(e=>e.remove());
    const evs=[...col.querySelectorAll<HTMLElement>('.ev')].sort((a,b)=>parseFloat(a.style.top)-parseFloat(b.style.top));
    let prevBottom=-1e9;
    evs.forEach(ev=>{
      const card=ev.querySelector<HTMLElement>('.card');
      if(!card) return;
      const h=card.offsetHeight||34, nodeTop=parseFloat(ev.style.top), natTop=nodeTop-h/2;
      let delta=Math.max(0,MIN_TOP-natTop); if(natTop+delta<prevBottom+GAP) delta=(prevBottom+GAP)-natTop;
      card.style.top=delta+'px'; const visTop=natTop+delta, visCenter=visTop+h/2; prevBottom=visTop+h;
      if(delta>4 && ev.dataset.death!=='1'){ const lead=document.createElement('div'); lead.className='lead'; lead.style.top=nodeTop+'px'; lead.style.height=(visCenter-nodeTop)+'px'; col.appendChild(lead); }
    });
  });
}

let sel: number | null=null;
function toggleSelect(idx: number){
  if(sel===idx){ sel=null; board.classList.remove('dim');
    head.querySelectorAll<HTMLElement>('.phead').forEach(e=>e.classList.remove('sel'));
    cols.querySelectorAll<HTMLElement>('.col').forEach(e=>e.classList.remove('sel')); return; }
  sel=idx; board.classList.add('dim');
  head.querySelectorAll<HTMLElement>('.phead').forEach(e=>e.classList.toggle('sel',Number(e.dataset.i)===idx));
  cols.querySelectorAll<HTMLElement>('.col').forEach(e=>e.classList.toggle('sel',Number(e.dataset.i)===idx));
}

function clampAge(value: number){ return Math.max(0,Math.min(AMAX,Math.round(value))); }
function positionYou(age: number){ const next=clampAge(Number.isFinite(age)?age:0), yl=byId<HTMLDivElement>('youline'), yt=byId<HTMLDivElement>('youtag');
  const y=TOP+next*PPY; yl.style.top=y+'px'; yt.style.top=y+'px'; byId<HTMLInputElement>('youAge').value=String(next); byId<HTMLInputElement>('youSlider').value=String(next); byId<HTMLElement>('youtagN').textContent=String(next); }

function applyFilter(){ data.forEach((p,idx)=>{ const on=active.has(p.d);
  const ph=head.querySelector<HTMLElement>(`.phead[data-i="${idx}"]`);
  const col=cols.querySelector<HTMLElement>(`.col[data-i="${idx}"]`);
  if(ph) ph.style.display=on?'':'none';
  if(col) col.style.display=on?'':'none'; }); }
function buildChips(){ const c=byId<HTMLDivElement>('chips');
  present.forEach((k: DomainKey)=>{ const d=DOMAINS[k]; const b=document.createElement('button'); b.className='chip'; b.style.setProperty('--clr',`var(${d.v})`);
    b.setAttribute('aria-pressed','true'); b.dataset.k=k; b.innerHTML=`<span class="cdot"></span>${d.label}`;
    b.addEventListener('click',()=>{ if(active.has(k)){active.delete(k);b.setAttribute('aria-pressed','false');} else{active.add(k);b.setAttribute('aria-pressed','true');} applyFilter(); });
    c.appendChild(b); }); }

function openTip(p: Person,e: LifeEvent,x: number,y: number){ const dm=DOMAINS[p.d], s=e.story; tip.style.setProperty('--tc',dm.hex);
  tip.innerHTML=`<div class="tn">${esc(p.s)}</div><div class="ts">${esc(dm.label)} · ${esc(p.place)}</div>
    <div class="tr"><div class="ta">${e.a===0?'0':e.a}<i>${e.a===0?'Born':'years old'}</i></div>
    <div class="tt">${esc(e.t)} <span class="yr">${esc(e.y)}</span></div></div>
    ${s?`<div class="tstory"><div class="tdek">${esc((s.body.split(/(?<=[.!?])\s+/)[0] ?? s.body))}</div><div class="tdetail">Click to read the full story</div></div>`:''}`;
  tip.style.display='block';
  const r=tip.getBoundingClientRect(),vw=innerWidth,vh=innerHeight;
  let left=x-r.width/2; left=Math.max(8,Math.min(left,vw-r.width-8));
  let top=y-r.height-14; if(top<8) top=y+20; if(top+r.height>vh-8) top=Math.max(8,vh-r.height-8);
  tip.style.left=left+'px'; tip.style.top=top+'px'; }
let hideT: number|undefined;
function cancelHide(){ if(hideT){ clearTimeout(hideT); hideT=undefined; } }
function scheduleHide(){ cancelHide(); hideT=window.setTimeout(hideTip,260); }
function hideTip(){ cancelHide(); tip.style.display='none'; }
tip.addEventListener('mouseenter',cancelHide);
tip.addEventListener('mouseleave',hideTip);

/* board scroll: reveal the footer at the bottom of the canvas */
const scrollEl=byId<HTMLDivElement>('scroll');
const footerEl=document.querySelector<HTMLElement>('footer');
let ticking=false;
function onBoardScroll(){ hideTip(); if(ticking) return; ticking=true; requestAnimationFrame(()=>{
  const max=scrollEl.scrollHeight-scrollEl.clientHeight;
  const atBottom=max>40 && (max-scrollEl.scrollTop)<64;
  footerEl?.classList.toggle('show', atBottom);
  ticking=false;
}); }

const screenBtn=byId<HTMLButtonElement>('screenBtn'),
      tourCard=byId<HTMLDivElement>('tourcard'),
      tourMeta=byId<HTMLSpanElement>('tourMeta'),
      tourCount=byId<HTMLSpanElement>('tourCount'),
      tourWho=byId<HTMLDivElement>('tourWho'),
      tourEvent=byId<HTMLDivElement>('tourEvent'),
      tourProgress=byId<HTMLSpanElement>('tourProgress'),
      tourExit=byId<HTMLButtonElement>('tourExit'),
      storyDeck=byId<HTMLElement>('storydeck'),
      storyImageA=byId<HTMLImageElement>('storyImageA'),
      storyImageB=byId<HTMLImageElement>('storyImageB'),
      storyCopy=byId<HTMLElement>('storyCopy'),
      storyEyebrow=byId<HTMLDivElement>('storyEyebrow'),
      storyTitle=byId<HTMLHeadingElement>('storyTitle'),
      storyBody=byId<HTMLParagraphElement>('storyBody'),
      storyExit=byId<HTMLButtonElement>('storyExit'),
      storyBackdrop=byId<HTMLButtonElement>('storyBackdrop');
const TOUR_MS=7600;
const STORY_MS=22000;
const STORY_XFADE_MS=1350;
const STORY_TEXT_MS=620;
const IDLE_MS=5000;
let tourStops: TourStop[]=[];
let tourIndex=0;
let storySlides: StorySlide[]=[];
let storyIndex=0;
let storyImageLayer=0;
let storySlideReady=true;
let storyRun=0;
let tourTimer: number | undefined;
let idleTimer: number | undefined;
let tourActive=false;
let storyMode=false;
let storyViewMode: 'screensaver'|'modal'='screensaver';
const storyImageCache=new Map<string, Promise<void>>();

function prefetchStoryImage(url: string){
  if(!url) return Promise.resolve();
  const cached=storyImageCache.get(url);
  if(cached) return cached;
  const load=new Promise<void>(resolve=>{
    const img=new Image();
    img.onload=()=>resolve();
    img.onerror=()=>resolve();
    img.src=url;
  });
  storyImageCache.set(url,load);
  return load;
}
function resetStoryImages(){
  storyImageA.classList.remove('is-active','is-leaving','is-kenburns');
  storyImageB.classList.remove('is-active','is-leaving','is-kenburns');
  storyImageA.removeAttribute('src');
  storyImageB.removeAttribute('src');
  storyImageLayer=0;
}

function clearTourTimer(){ if(tourTimer){ clearTimeout(tourTimer); tourTimer=undefined; } }
function clearTourHighlight(){
  head.querySelectorAll<HTMLElement>('.tour-active').forEach(e=>e.classList.remove('tour-active'));
  cols.querySelectorAll<HTMLElement>('.tour-active').forEach(e=>e.classList.remove('tour-active'));
}
function buildTourStops(){
  const stops: TourStop[]=[];
  data.forEach((p,idx)=>p.ev.forEach((e,evIdx)=>{
    if((e.big||e.death) && active.has(p.d)) stops.push({p,e,idx,evIdx});
  }));
  if(stops.length) return stops;
  data.forEach((p,idx)=>p.ev.forEach((e,evIdx)=>{
    if(e.big||e.death) stops.push({p,e,idx,evIdx});
  }));
  return stops;
}
function shuffle<T>(items: T[]){
  const next=items.slice();
  for(let i=next.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [next[i],next[j]]=[next[j],next[i]]; }
  return next;
}
function buildStorySlidesOrdered(){
  const slides: StorySlide[]=[];
  data.forEach((p,idx)=>p.ev.forEach((e,evIdx)=>{
    if(e.story && active.has(p.d)) slides.push({p,e,idx,evIdx,story:e.story});
  }));
  return slides;
}
function buildStorySlides(){
  const slides: StorySlide[]=[];
  data.forEach((p,idx)=>p.ev.forEach((e,evIdx)=>{
    if(e.story && active.has(p.d)) slides.push({p,e,idx,evIdx,story:e.story});
  }));
  if(slides.length) return shuffle(slides);
  data.forEach((p,idx)=>p.ev.forEach((e,evIdx)=>{
    if(e.story) slides.push({p,e,idx,evIdx,story:e.story});
  }));
  return shuffle(slides);
}
function resetTourProgress(){
  tourProgress.style.transition='none';
  tourProgress.style.width='0';
  requestAnimationFrame(()=>{
    tourProgress.style.transition=`width ${TOUR_MS}ms linear`;
    tourProgress.style.width='100%';
  });
}
function fillStoryCopy(slide: StorySlide){
  const {p,e,story}=slide;
  storyEyebrow.textContent=`${p.s} · age ${e.a} · ${e.y}`;
  storyTitle.textContent=story.title;
  storyBody.textContent=story.body;
}
function startKenBurns(img: HTMLImageElement){
  img.classList.remove('is-kenburns');
  void img.offsetWidth;
  img.classList.add('is-kenburns');
}
async function swapStoryImage(url: string,alt: string,animate: boolean,token=storyRun){
  const a=storyImageA,b=storyImageB,next=storyImageLayer===0?b:a,prev=storyImageLayer===0?a:b;
  next.alt=alt;
  void prefetchStoryImage(url);
  if(!animate||!prev.src){
    a.classList.remove('is-active','is-leaving','is-kenburns');
    b.classList.remove('is-active','is-leaving','is-kenburns');
    b.removeAttribute('src');
    a.alt=alt;
    let revealed=false;
    const reveal=()=>{
      if(revealed||token!==storyRun) return;
      revealed=true;
      a.classList.add('is-active');
      startKenBurns(a);
    };
    a.onload=()=>{ void a.decode().catch(()=>{}).finally(reveal); };
    a.src=url;
    if(a.complete) void a.decode().catch(()=>{}).finally(reveal);
    storyImageLayer=0;
    return;
  }
  return new Promise<void>(resolve=>{
    const done=()=>{
      void next.decode().catch(()=>{}).finally(()=>{
        prev.classList.remove('is-active','is-kenburns');
        prev.classList.add('is-leaving');
        next.classList.remove('is-leaving','is-kenburns');
        next.classList.add('is-active');
        startKenBurns(next);
        window.setTimeout(()=>{
          prev.classList.remove('is-leaving');
          storyImageLayer=storyImageLayer===0?1:0;
          resolve();
        },STORY_XFADE_MS);
      });
    };
    if(next.complete && next.src===url) done();
    else next.onload=()=>done();
    next.src=url;
  });
}
function showStorySlide(nextIndex=storyIndex){
  if(!tourActive||!storyMode||!storySlides.length) return;
  clearTourTimer();
  void presentStorySlide(nextIndex);
}
async function presentStorySlide(nextIndex: number){
  if(!tourActive||!storyMode||!storySlides.length) return;
  const run=++storyRun;
  storyIndex=(nextIndex+storySlides.length)%storySlides.length;
  const slide=storySlides[storyIndex], {p,e,idx,evIdx}=slide, dm=DOMAINS[p.d];
  const animate=storySlideReady;
  storySlideReady=true;
  clearTourHighlight();
  if(storyViewMode==='screensaver'){
    const ph=head.querySelector<HTMLElement>(`.phead[data-i="${idx}"]`);
    const ev=cols.querySelector<HTMLElement>(`.ev[data-i="${idx}"][data-e="${evIdx}"]`);
    ph?.classList.add('tour-active');
    ev?.classList.add('tour-active','in');
    const eventY=parseFloat(ev?.style.top||String(TOP+e.a*PPY));
    const eventPageY=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--headH'))+eventY;
    const left=ph ? ph.offsetLeft+ph.offsetWidth/2-scrollEl.clientWidth/2 : 0;
    const top=eventPageY-scrollEl.clientHeight*.48;
    scrollEl.scrollTo({left:Math.max(0,left),top:Math.max(0,top),behavior:'smooth'});
  }
  storyDeck.style.setProperty('--tc',`var(${dm.v})`);
  if(animate){
    storyCopy.classList.add('is-changing');
    await Promise.all([
      swapStoryImage(slide.story.image,slide.story.title,true,run),
      new Promise<void>(r=>window.setTimeout(r,STORY_TEXT_MS)),
    ]);
    fillStoryCopy(slide);
    storyCopy.classList.remove('is-changing');
    storyCopy.classList.add('is-entering');
    requestAnimationFrame(()=>storyCopy.classList.remove('is-entering'));
  }else{
    fillStoryCopy(slide);
    void swapStoryImage(slide.story.image,slide.story.title,false,run);
  }
  if(run!==storyRun||!tourActive||!storyMode) return;
  if(storyViewMode==='screensaver'){
    tourTimer=window.setTimeout(()=>showStorySlide(storyIndex+1),STORY_MS);
  }
}
function showTourStop(nextIndex=tourIndex){
  if(!tourActive||!tourStops.length) return;
  tourIndex=(nextIndex+tourStops.length)%tourStops.length;
  const stop=tourStops[tourIndex], dm=DOMAINS[stop.p.d];
  clearTourHighlight();
  const ph=head.querySelector<HTMLElement>(`.phead[data-i="${stop.idx}"]`);
  const ev=cols.querySelector<HTMLElement>(`.ev[data-i="${stop.idx}"][data-e="${stop.evIdx}"]`);
  ph?.classList.add('tour-active');
  ev?.classList.add('tour-active','in');
  tourCard.style.setProperty('--tc',`var(${dm.v})`);
  tourMeta.textContent=`${dm.label} · age ${stop.e.a} · ${stop.e.y}`;
  tourCount.textContent=`${tourIndex+1} / ${tourStops.length}`;
  tourWho.textContent=stop.p.s;
  tourEvent.innerHTML=`<b>${stop.e.a===0?'Born':stop.e.a}</b> ${esc(stop.e.t)}`;
  const eventY=parseFloat(ev?.style.top||String(TOP+stop.e.a*PPY));
  const eventPageY=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--headH'))+eventY;
  const left=ph ? ph.offsetLeft+ph.offsetWidth/2-scrollEl.clientWidth/2 : 0;
  const top=eventPageY-scrollEl.clientHeight*.48;
  scrollEl.scrollTo({left:Math.max(0,left),top:Math.max(0,top),behavior:'smooth'});
  resetTourProgress();
  clearTourTimer();
  tourTimer=window.setTimeout(()=>showTourStop(tourIndex+1),TOUR_MS);
}
function armIdleCursor(){
  if(!tourActive||storyViewMode!=='screensaver') return;
  document.body.classList.remove('idle');
  if(idleTimer) clearTimeout(idleTimer);
  idleTimer=window.setTimeout(()=>document.body.classList.add('idle'),IDLE_MS);
}
async function enterScreensaver(){
  storyViewMode='screensaver';
  storySlides=buildStorySlides();
  storyMode=storySlides.length>0;
  tourStops=storyMode?[]:buildTourStops();
  if(!storyMode&&!tourStops.length) return;
  storySlideReady=false;
  storyImageLayer=0;
  storyRun=0;
  tourActive=true;
  hideTip();
  footerEl?.classList.remove('show');
  document.body.classList.add('screensaver');
  document.body.classList.toggle('story-mode',storyMode);
  storyExit.textContent='Exit screensaver';
  screenBtn.setAttribute('aria-pressed','true');
  screenBtn.textContent='Exit';
  armIdleCursor();
  try{ await document.documentElement.requestFullscreen?.(); }catch{}
  if(storyMode) showStorySlide(0);
  else showTourStop(0);
}
function openStoryModal(idx: number,evIdx: number){
  if(tourActive) exitStoryView();
  const slides=buildStorySlidesOrdered();
  const start=slides.findIndex(s=>s.idx===idx && s.evIdx===evIdx);
  if(start<0) return;
  storyViewMode='modal';
  storySlides=slides;
  storyMode=true;
  storySlideReady=false;
  storyImageLayer=0;
  storyRun=0;
  tourActive=true;
  hideTip();
  resetStoryImages();
  document.body.classList.add('story-modal','story-mode');
  storyExit.textContent='Close';
  showStorySlide(start);
}
function exitStoryView(){
  const open=document.body.classList.contains('story-modal')||document.body.classList.contains('screensaver');
  if(!tourActive&&!open) return;
  const wasScreensaver=storyViewMode==='screensaver';
  tourActive=false;
  clearTourTimer();
  if(idleTimer){ clearTimeout(idleTimer); idleTimer=undefined; }
  clearTourHighlight();
  document.body.classList.remove('screensaver','story-mode','story-modal','idle');
  screenBtn.setAttribute('aria-pressed','false');
  screenBtn.textContent='Screensaver';
  tourProgress.style.transition='none';
  tourProgress.style.width='0';
  storyMode=false;
  storyViewMode='screensaver';
  storySlideReady=false;
  storyCopy.classList.remove('is-changing','is-entering');
  resetStoryImages();
  storyExit.textContent='Close';
  if(wasScreensaver && document.fullscreenElement) document.exitFullscreen?.().catch(()=>{});
}
function exitScreensaver(){ exitStoryView(); }

function readVars(){ const cs=getComputedStyle(document.documentElement); PPY=parseFloat(cs.getPropertyValue('--ppy'))||30; TOP=parseFloat(cs.getPropertyValue('--topInset'))||44; SX=innerWidth<=680?26:30; }
function rebuild(){ const a=+byId<HTMLInputElement>('youSlider').value; build(); positionYou(a); applyFilter();
  if(sel!=null){ const s=sel; sel=null; toggleSelect(s); } }

byId<HTMLInputElement>('youSlider').addEventListener('input',e=>positionYou(+(e.currentTarget as HTMLInputElement).value));
byId<HTMLInputElement>('youAge').addEventListener('input',e=>{
  const raw=(e.currentTarget as HTMLInputElement).value;
  if(raw==='') return;
  positionYou(+raw);
});
byId<HTMLInputElement>('youAge').addEventListener('blur',e=>positionYou(+(e.currentTarget as HTMLInputElement).value));
window.addEventListener('resize',()=>{ const o=PPY; readVars(); if(PPY!==o) rebuild(); });
document.addEventListener('click',e=>{ const target=e.target instanceof Element?e.target:null; if(!target?.closest('.node,.card,#tip,.storydeck,.storybackdrop')) hideTip(); });
scrollEl.addEventListener('scroll',onBoardScroll,{passive:true});
screenBtn.addEventListener('click',()=>tourActive?exitStoryView():enterScreensaver());
tourExit.addEventListener('click',exitStoryView);
storyExit.addEventListener('click',exitStoryView);
storyBackdrop.addEventListener('click',exitStoryView);
document.addEventListener('fullscreenchange',()=>{ if(tourActive&&storyViewMode==='screensaver'&&!document.fullscreenElement) exitStoryView(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&tourActive) exitStoryView(); });
['mousemove','mousedown','touchstart','keydown'].forEach(name=>document.addEventListener(name,armIdleCursor,{passive:true}));

readVars(); buildChips(); build(); applyFilter(); onBoardScroll();

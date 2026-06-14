import { defineStories } from "./shared";

export const wattStories = defineStories("Watt", {
  "0": {
    title: "Born in Greenock where ships and steam meet",
    body: "James Watt arrives in 1736 in Greenock, a Scottish port town smelling of tar and coal smoke. His father builds ships and teaches navigation; his mother runs the household with strict Presbyterian discipline. The boy is often sickly and spends long hours at home with books and tools. Quiet illness becomes the habit of careful observation.",
    image: "images/story/watt-born.webp",
    tags: ["Greenock", "1736", "Scotland"],
  },
  "6": {
    title: "Too ill for school; his aunt teaches him to read",
    body: "Chronic headaches and weakness keep him out of regular school. His aunt teaches him reading and arithmetic at the kitchen table while other children play outside. He learns slowly but thoroughly, building models and taking clocks apart. The pattern of a mind sharpened by limitation rather than classroom competition will define his later breakthroughs.",
    image: "images/story/watt-childhood.webp",
    tags: ["childhood", "1742", "illness"],
  },
  "18": {
    title: "Trains as an instrument maker in London",
    body: "At eighteen he travels to London to apprentice with mathematical instrument maker John Morgan. The work demands precision: dividers, quadrants, barometers cut to exact tolerances. Watt learns that small improvements in efficiency multiply across machines. He returns to Glasgow in 1757 with skills rare in Scotland and a reputation for patience with difficult problems.",
    image: "images/story/watt-london.webp",
    tags: ["London", "1754", "apprentice"],
  },
  "21": {
    title: "Workshop at Glasgow University",
    body: "Glasgow University hires him to maintain and build scientific instruments for professors who lecture on natural philosophy. He meets chemists, economists, and engineers in the same building. The job pays modestly but puts him at the intellectual center of the Scottish Enlightenment. When a broken model steam engine arrives for repair, he will be ready.",
    image: "images/story/watt-glasgow.webp",
    tags: ["Glasgow University", "1757", "instruments"],
  },
  "27": {
    title: "Asked to fix a Newcomen engine that wastes steam",
    body: "Professor John Robison brings him a small Newcomen pumping engine used for demonstrations. The design injects steam into a cylinder, then cools it with water to create vacuum. It works but wastes enormous energy reheating the chamber each stroke. Watt is told to make it run; instead he starts asking why it loses so much heat.",
    image: "images/story/watt-newcomen.webp",
    tags: ["Newcomen", "1763", "steam"],
  },
  "29": {
    title: "The separate condenser on a Sunday walk",
    body: "Walking in Glasgow Green on a Sunday in 1765, Watt realizes the fix: condense steam in a separate chamber, keep the main cylinder hot. The idea arrives whole, like a gift. He later says the most important thought of his life came on a walk when he was not trying to think. Patent delays and partnership struggles will follow, but the physics is settled in one afternoon.",
    image: "images/story/watt-condenser.webp",
    tags: ["separate condenser", "1765", "breakthrough"],
  },
  "33": {
    title: "Patents the engine that powers the Industrial Revolution",
    body: "In 1769 he patents an engine far more efficient than anything before it. Factories, mines, and mills can now run on steam without bankrupting owners on coal. The patent is both protection and prison: for years he lacks capital to manufacture at scale. The invention waits for a businessman who understands markets as well as Watt understands heat.",
    image: "images/story/watt-patent.webp",
    tags: ["1769", "patent", "efficiency"],
  },
  "39": {
    title: "Boulton and the slogan that sells steam",
    body: "Matthew Boulton, a Birmingham manufacturer with money and ambition, partners with Watt in 1775 after lobbying Parliament to extend the patent. Boulton's famous line applies: he sells what all the world desires, power. Together they build the Soho Foundry and turn a laboratory improvement into an industry. Watt handles thermodynamics; Boulton handles kings, contracts, and creditors.",
    image: "images/story/watt-boulton.webp",
    tags: ["Matthew Boulton", "1775", "Soho"],
  },
  "48": {
    title: "A locomotive design before rails are ready",
    body: "In 1784 he patents a steam locomotive concept with rods and gears suited to rails that barely exist yet. The drawing is ahead of its time; Richard Trevithick and George Stephenson will later make rail travel real. Watt himself focuses on stationary engines that pump water from mines and spin factory belts. He opens the door; others drive through it.",
    image: "images/story/watt-locomotive.webp",
    tags: ["1784", "locomotive", "patent"],
  },
  "52": {
    title: "The flyball governor keeps engines steady",
    body: "He adapts a centrifugal governor so steam engines maintain constant speed under changing load. Spinning balls rise and fall, regulating the valve automatically. It is one of the first feedback control devices in industry, a ancestor of thermostats and cruise control. Factories become predictable; the age of manual valve-tweaking starts to end.",
    image: "images/story/watt-governor.webp",
    tags: ["1788", "governor", "automation"],
  },
  "64": {
    title: "Retires wealthy as the patents expire",
    body: "By 1800 the core patents expire and competitors flood the market with imitations. Watt is already rich from royalties and consulting. He spends later years improving instruments, corresponding with scientists, and worrying about priority disputes. He never stops tinkering, but the world no longer waits for his permission to use steam.",
    image: "images/story/watt-retire.webp",
    tags: ["1800", "patents", "wealth"],
  },
  "83": {
    title: "Dies honored; the watt is named for him",
    body: "Watt dies near Birmingham in 1819, aged eighty-three, buried beside Boulton. Decades later the unit of power, the watt, takes his name so every light bulb label remembers him. He did not invent the steam engine; he made it economical. That difference built the modern world of factories, trains, and ships.",
    image: "images/story/watt-death.webp",
    tags: ["1819", "legacy", "unit"],
  },
});

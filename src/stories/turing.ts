import { defineStories } from "./shared";

export const turingStories = defineStories("Turing", {
  "0": {
    title: "Born in London before the century of machines",
    body: "Alan Mathison Turing is born in 1912 in London, the second son of a civil servant in India and a woman who reads science for pleasure. Nannies raise him while parents work abroad. He grows up precise, lonely, and already treating the world as a puzzle with hidden rules.",
    image: "images/story/turing-born.webp",
    tags: ["London", "1912", "childhood"],
  },
  "16": {
    title: "Christopher Morcom and the ghost in the equations",
    body: "At Sherborne he bonds with Christopher Morcom, a brilliant schoolmate who shares his love of mathematics and chemistry. Morcom dies of tuberculosis at eighteen. Turing keeps writing to Morcom's mother and later says he carried on their work as if the dead boy were still beside him. Grief becomes fuel for thought.",
    image: "images/story/turing-morcom.webp",
    tags: ["Christopher Morcom", "Sherborne", "grief"],
  },
  "13": {
    title: "Cycles sixty miles when the trains stop",
    body: "When a general strike cancels trains to his first day at Sherborne School, Alan Turing rides a bicycle sixty miles with a tin of scientific equipment. Headmaster reports him for looking like a tramp. The episode previews a life that treats physical inconvenience as irrelevant compared to the problem waiting at the desk.",
    image: "images/story/turing-bicycle-school.webp",
    tags: ["Sherborne", "bicycle", "school"],
  },
  "24": {
    title: "The universal machine on paper",
    body: "In 1936 he publishes On Computable Numbers and imagines a machine that reads symbols on a tape and performs any logical procedure. The Turing machine is theory, not hardware, yet it defines what computers are. At twenty-four he proves some problems cannot be solved by any algorithm. Limits become as important as powers.",
    image: "images/story/turing-universal-machine.webp",
    tags: ["Turing machine", "1936", "computability"],
  },
  "27": {
    title: "Bletchley Park and the Enigma war",
    body: "When war begins he joins the codebreaking center at Bletchley Park. Nazi Enigma machines scramble messages daily. Breaking them saves convoys and lives. Turing works in Hut 8 on naval codes, thinking in diagrams and silence while Britain tells the world nothing.",
    image: "images/story/turing-bletchley.webp",
    tags: ["Bletchley Park", "Enigma", "Hut 8"],
  },
  "27-bombe": {
    title: "The Bombe that searches possibilities",
    body: "He designs the Bombe, an electromechanical device that eliminates Enigma settings faster than human clerks. Each improvement shortens the Atlantic war. Historians argue over exact casualty numbers saved; the direction is clear. Industrial cryptography is born in a Victorian mansion of crossword puzzle minds.",
    image: "images/story/turing-bombe.webp",
    tags: ["Bombe", "cryptanalysis", "Enigma"],
  },
  "30": {
    title: "Atlantic convoys start getting through",
    body: "By 1942 his methods and machines help locate U-boats before they cluster on convoys. Merchant ships reach Britain with food and materiel. The work stays secret for decades. Turing returns to civilian science without parade or pension worthy of what he did.",
    image: "images/story/turing-atlantic.webp",
    tags: ["U-boats", "convoys", "war"],
  },
  "38": {
    title: "Can machines think?",
    body: "In 1950 he proposes the imitation game: if a machine converses well enough to fool a judge, treat it as intelligent for practical purposes. The Turing test names an era's anxiety about minds and metal. He also writes on morphogenesis, chess programs, and whether souls need biology.",
    image: "images/story/turing-test.webp",
    tags: ["Turing test", "1950", "AI"],
  },
  "40": {
    title: "Prosecuted for homosexuality",
    body: "After a burglary investigation he reports a relationship with a man. Britain convicts him of gross indecency. He chooses chemical castration over prison. Security clearance vanishes. The state he helped save dismantles his career because of who he loves.",
    image: "images/story/turing-prosecution.webp",
    tags: ["prosecution", "1952", "indecency"],
  },
  "41": {
    title: "Cyanide apple at forty-one",
    body: "He dies in 1954 from cyanide poisoning, an apple by the bed. Inquest rules suicide; some colleagues suspect accident. He was working on morphogenesis until the end. Apologies and pardons arrive after he cannot read them. Every computer is a footnote to a man Britain betrayed.",
    image: "images/story/turing-death.webp",
    tags: ["1954", "legacy", "computing"],
  },
});

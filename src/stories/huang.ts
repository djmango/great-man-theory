import { defineStories } from "./shared";

export const huangStories = defineStories("Huang", {
  "0": {
    title: "Born in Tainan as Taiwan's chip age begins",
    body: "Jen-Hsun Huang arrives in 1963 in a southern Taiwanese city while the island is turning into an electronics factory for the world. His family will soon send him abroad for opportunity they cannot find at home. He grows up between cultures before Silicon Valley has a name for that experience. The boy who will sell GPUs to every AI lab starts where fabs are dreams and rice fields are real.",
    image: "images/story/huang-born.webp",
    tags: ["Tainan", "1963", "Taiwan"],
  },
  "9": {
    title: "Shipped to Kentucky with a dictionary and a suitcase",
    body: "At nine he and his brother join an uncle in the United States and land at a Oneida Baptist boarding school in Kentucky. He knows little English and cleans toilets while classmates play sports. Years later he jokes that Nvidia's leather jacket persona was forged in a southern dorm where he learned to survive by working harder than everyone else in the room.",
    image: "images/story/huang-kentucky.webp",
    tags: ["Kentucky", "1973", "immigration"],
  },
  "15": {
    title: "Dishwasher at Denny's before he designs chips",
    body: "In high school he works the graveyard shift at Denny's, scrubbing plates and watching short-order cooks move fast under pressure. He meets his future wife Lori in a lab at Oregon State. The future CEO of a trillion-dollar company learns service industry humility before he learns semiconductor layout. He will later say no task is beneath you if you want to lead engineers.",
    image: "images/story/huang-dennys.webp",
    tags: ["Denny's", "1978", "Oregon State"],
  },
  "21": {
    title: "Electrical engineering degree and the LSI Logic path",
    body: "He graduates Oregon State in 1984 with a degree in electrical engineering and joins AMD designing microprocessors. Later he moves to LSI Logic, a hot Silicon Valley chip design house. Sun Microsystems founder Scott McNealy becomes a mentor. Huang learns that the right architecture at the right moment matters more than incremental speed. The lesson will define Nvidia decades later.",
    image: "images/story/huang-oregon.webp",
    tags: ["AMD", "1984", "LSI Logic"],
  },
  "30": {
    title: "Three founders at a Denny's booth sketch Nvidia",
    body: "In 1993 he co-founds Nvidia with Chris Malachowsky and Curtis Priem at a Denny's in San Jose, ironically the same chain where he washed dishes. They bet on accelerated 3D graphics for PCs. The name suggests envy, as in to envy someone's frame rate. Early products nearly kill the company. Huang survives by firing half the staff and betting everything on a new chip called RIVA 128.",
    image: "images/story/huang-nvidia-diner.webp",
    tags: ["Nvidia", "1993", "Denny's"],
  },
  "36": {
    title: "Invents the GPU category and takes Nvidia public",
    body: "The GeForce 256 ships in 1999 marketed as the world's first GPU, a processor built to render triangles fast. Gamers want it; PC makers need it. Nvidia IPOs and rides the gaming boom. Huang talks about parallel processing while investors think about Quake frame rates. The chip is a toy engine that secretly trains for a war about matrices and neural nets.",
    image: "images/story/huang-gpu.webp",
    tags: ["GPU", "1999", "GeForce"],
  },
  "43": {
    title: "CUDA opens the GPU to scientists and madmen",
    body: "In 2006 Nvidia launches CUDA, software that lets researchers run general compute on graphics chips. Wall Street yawns; academics experiment. Oil companies simulate reservoirs; physicists model particles. Huang keeps funding the platform through years when it does not pay off on earnings calls. He is betting that parallel math will matter more than faster pixels. He will be right on a delay of six years.",
    image: "images/story/huang-cuda.webp",
    tags: ["CUDA", "2006", "parallel compute"],
  },
  "49": {
    title: "AlexNet on Nvidia hardware wakes the industry",
    body: "In 2012 a Toronto team wins ImageNet using deep learning on Nvidia GPUs. Error rates plunge; the AI winter ends. Huang puts Nvidia sales teams on every university lab door. What was a gaming company becomes the shovel seller in a gold rush nobody fully sees yet. He tells engineers to optimize for tensor operations before most CEOs know what a tensor is.",
    image: "images/story/huang-deep-learning.webp",
    tags: ["AlexNet", "2012", "deep learning"],
  },
  "53": {
    title: "Hand-delivers the first DGX supercomputer to OpenAI",
    body: "In 2016 Huang personally delivers the first DGX-1 AI supercomputer to OpenAI's San Francisco office. Photos show him in his leather jacket beside Elon Musk and Sam Altman. The box is marketed as an AI appliance the size of a suitcase stack. The gesture is marketing and strategy: bind the hottest lab to your hardware before Google builds its own chips.",
    image: "images/story/huang-openai-delivery.webp",
    tags: ["DGX", "2016", "OpenAI"],
  },
  "59": {
    title: "ChatGPT mania empties shelves of H100 chips",
    body: "After ChatGPT explodes in 2022, every hyperscaler orders Nvidia data-center GPUs faster than TSMC can fab them. Lead times stretch; prices soar. Huang keynotes in a black jacket like a rock star explaining H100 bandwidth to stadium crowds. Competitors announce rivals years late. Nvidia becomes the choke point of the AI age the way Intel once was for PCs.",
    image: "images/story/huang-ai-boom.webp",
    tags: ["H100", "2022", "ChatGPT boom"],
  },
  "60": {
    title: "Nvidia crosses toward a trillion-dollar valuation",
    body: "In 2023 the stock more than triples on AI demand forecasts. Nvidia briefly joins Apple and Microsoft in the trillion-dollar club. A dishwasher kid from Denny's now runs the company every government and startup must court for chips. Huang warns about export controls and China risk while taking victory laps on stage. The GPU was a toy until the world needed a brain.",
    image: "images/story/huang-trillion.webp",
    tags: ["2023", "trillion", "AI chips"],
  },
});

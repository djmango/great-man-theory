import { storyGalleryItems, type GalleryItem } from "./stories/gallery-items";

const items = storyGalleryItems();
const figures = [...new Set(items.map(i => i.figure))].sort();

const grid = document.getElementById("galleryGrid")!;
const stats = document.getElementById("galleryStats")!;
const chips = document.getElementById("galleryChips")!;
const q = document.getElementById("gallerySearch") as HTMLInputElement;

let activeFigure = "all";
let query = "";

function assetUrl(image: string): string {
  return `../${image}`;
}

function matches(item: GalleryItem): boolean {
  if (activeFigure !== "all" && item.figure !== activeFigure) return false;
  if (!query) return true;
  const hay = `${item.figure} ${item.slug} ${item.title} ${item.tags.join(" ")}`.toLowerCase();
  return hay.includes(query);
}

function renderStats(ready: number) {
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

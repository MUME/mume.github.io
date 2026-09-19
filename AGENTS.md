# Contribution Guidelines for Agents

This repository is a VitePress-based documentation site that serves as the MUME Community landing page ([docs.mume.org](https://docs.mume.org)). It matches the style and layout of [mume.org](https://mume.org).

## Coding Standards

- **VitePress**: Use VitePress features for routing and site structure.
- **Vue 3 SFCs**: Custom components in `docs/.vitepress/theme/` should use `<script setup>` with Composition API.
- **CSS**: The primary styling resides in `docs/.vitepress/theme/mume.css`. Maintain consistency with the `mume.org` design.
- **Scroll Logic**: Use `window.scrollY` for scroll-related features (avoid deprecated `window.pageYOffset`).

## Adding Content

### Interviews

1.  Create a new Markdown file in `docs/interviews/<id>.md`.
2.  Update `docs/interviews/index.md` to include a link and metadata for the new interview.
3.  Ensure the date and author reflect the original historical context of the interview.

### External Links

Update `docs/links.md` to add or modify community resources.

### Interactive Tutorial Chapters

To add or edit tutorial chapters in `docs/play/tutorial/`:
1. Follow the non-technical authoring guide in [`docs/play/TUTORIAL.md`](docs/play/TUTORIAL.md).
2. Create or edit Markdown files named `[number]-[slug].md` (e.g., `16-advanced-tactics.md`). No Vue code or template editing required.
3. Frontmatter defines `title`, `description`, `teach` list, and interactive practice `steps` with `response` text.

## Build and Verification

- Use Docker for all development — do not run `npm install` directly.
- Dev server with live reload: `docker compose up dev` (available at `http://localhost:5173`).
- Production build: `docker compose up --build community` (available at `http://localhost:4174`).
- Update packages inside the container: `docker run --rm -v "$(pwd):/app" -w /app node:22 npm install <package>`, then commit `package.json` and `package-lock.json`.
- When modifying the UI, perform visual verification (e.g., using Playwright) to ensure style parity with `mume.org` is maintained.

## Deployment

The site is deployed via GitHub Actions to GitHub Pages. The deployment branch is `master`.

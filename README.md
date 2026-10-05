# MUME Community Website

This repository contains the source code for [docs.mume.org](https://docs.mume.org), focusing on the MUME Community page and associated resources (Links, Interviews, etc.).

The site is built with **VitePress** and designed to match the style and layout of the main [mume.org](https://mume.org) website.

## Features

- **VitePress**: Fast, Vue-powered static site generator.
- **MUME Styling**: Integrated CSS and assets to maintain visual consistency with the MUME ecosystem.
- **Player Interviews**: Interviews are stored as Markdown files in `docs/community/interviews/` and rendered using VitePress's file-based routing.
- **Custom Theme**: A custom VitePress theme located in `docs/.vitepress/theme/` implements the MUME look and feel.

## Development

> **Use Docker.** All development should be done via Docker to keep the environment consistent with CI.

### Dev server (live reload)

```bash
docker compose up dev
```

The site will be available at [http://localhost:5173](http://localhost:5173).

### Production build

```bash
docker compose up --build community
```

The site will be available at [http://localhost:4174](http://localhost:4174).

To pass a custom base path:

```bash
docker compose build --build-arg VITE_BASE=/community/ community
docker compose up community
```

### Updating dependencies

Always update packages inside the container so the lock file stays CI-compatible:

```bash
docker run --rm -v "$(pwd):/app" -w /app node:22 npm install <package>
git add package.json package-lock.json
git commit -m "chore: update dependencies"
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `master` branch.

## Contributing

For browser-based content editing, see the [Pages CMS user guide](CMS.md). It covers first-time access, editing pages and tutorials, uploading images, and publishing changes.

Interviews and content can be updated by modifying the Markdown files in the `docs/` directory. For theme or functionality changes, please refer to the `docs/.vitepress/theme/` directory.

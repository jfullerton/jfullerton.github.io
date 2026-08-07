# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal site for Jared Fullerton, served by GitHub Pages (`CNAME` → custom domain) at the repo root. Two separate parts share one repo:

1. **The site itself** — Jekyll. A single page (`index.md`) plus `404.md`, rendered through the only layout, `_layouts/default.html`.
2. **`/swrpg`** — a static Star Wars RPG campaign section (opening-crawl animations). Plain HTML files, not Jekyll pages, with their own Sass build.

The two use completely different toolchains. Changing one rarely touches the other.

## Commands

Jekyll site (Ruby, `Gemfile`, Jekyll `~> 4.4`):

```bash
bundle install
bundle exec jekyll serve    # http://127.0.0.1:4000 (port/host set in _config.yml)
bundle exec jekyll build    # → ./_site (gitignored)
```

Requires Ruby >= 3.1 — macOS system Ruby (2.6) is too old. Use Homebrew Ruby (`/opt/homebrew/opt/ruby/bin`) or a version manager.

Sass build for `/swrpg` (Node >= 20.19, Vite):

```bash
npm install
npm run build        # one-off build
npm run watch        # rebuild on change
```

There is no test suite.

## Architecture notes

**All styling for the main site is inlined** in a `<style>` block inside `_layouts/default.html` — CSS custom properties (`--accent`, `--ink`, `--paper`), `@font-face` for self-hosted JetBrains Mono in `/fonts`, and a `prefers-color-scheme: dark` override of those same variables. There is no external stylesheet, no Sass, and no build step for the main site. Edit the layout directly; changing a color means changing the variable in both the `:root` and the dark-media block.

**Vite only compiles one file:** `swrpg/scss/crawl.scss` → `swrpg/css/crawl.css` (minified). The compiled CSS is committed, since GitHub Pages runs only Jekyll and will not run the Node build. Commit the CSS output alongside the Sass change. The Vite setup (`vite.config.js`) is unusual: `outDir` is `swrpg/` with `emptyOutDir: false`, `assetFileNames` forces the un-hashed `css/crawl.css` name, `assetsInlineLimit: 0` keeps `bg-stars.png` as a file reference, and an inline `strip-js-entry` plugin drops the JS shim chunk Vite emits for a CSS-only entry.

**`/swrpg` pages bypass Jekyll.** Each crawl in `swrpg/crawls/` is a full standalone HTML document with no front matter, linking absolute paths (`/swrpg/css/crawl.css`, `/swrpg/audio/intro.*`). They all follow the same structure — `.starwars` article, `<audio>`, `.start` play button, `.animation` wrapper with `.intro`, `.titles` (whose inline `style="height:..em"` is tuned per-episode to match the text length), and `.logo`. To add an episode, copy an existing crawl file, adjust the copy and that height, and add a link to `swrpg/crawls/index.html`.

`swrpg/js/crawl.js` is a vanilla-JS rewrite (no dependencies) of Tim Pietrusky's 1977 crawl remake. It syncs the audio with the CSS animation and uses a clone/remove/re-append trick on `.animation` so the CSS animations restart on replay. Keep the attribution comment at the top.

**Jekyll config is unusual:** `_config.yml` sets `permalink: date`, though there are no posts. Adding pages means adding markdown files with front matter (`layout: default`, `title`, `description`) at the repo root — `description` falls back to `site.description` in the layout, but `site.description` is not defined in `_config.yml`, so set it per-page.

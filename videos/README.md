# Project showcase videos

Playwright scripts that browse each client site like a person would and record it to MP4 for social media.

## Setup (once)

```bash
cd videos
npm install
npm run setup
```

## Record

```bash
npm run record                      # everything
npm run record:mindfirehomes        # one project, all 4 videos
node record.mjs olorunleke --kind teaser --format vertical
node record.mjs innercircle --headed   # watch it run
```

Output lands in `out/` (gitignored) as `<project>-<teaser|walkthrough>-<landscape|vertical>.mp4`:

| Kind        | Length | Formats                                  |
| ----------- | ------ | ---------------------------------------- |
| teaser      | ~30s   | landscape 1920x1080, vertical 1080x1920  |
| walkthrough | ~90s   | landscape 1920x1080, vertical 1080x1920  |

Re-run a project whenever its site changes.

## Editing a walkthrough

Each project lives in `projects.mjs` as a `teaser` and a `walkthrough` script. Helpers (from `lib/director.mjs`):

- `d.load(url)`: open a page and wait for it to settle
- `d.hold(ms)`: pause on screen
- `d.screens(n, ms)` / `d.scroll(px, ms)`: smooth scroll
- `d.scrollTo(locatorOrSelector)`: bring an element near the top
- `d.cruise(maxScreens, msPerScreen)`: slow scroll to the bottom
- `d.point(locator, { click })`: glide the visible cursor to an element (desktop only)
- `d.nav('About', url)`: click the nav link on desktop, go straight to the URL on phone

Scripts never submit forms, book, or check out.

## Adding a project

Add an entry to `projects.mjs` with `name`, `url`, `teaser(d)`, `walkthrough(d)`, and a `record:<name>` script in `package.json`.

## After recording

Videos come out raw, with no music or captions. Drop them into CapCut to add auto-captions, music, and your logo, then post.

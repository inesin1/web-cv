# web-cv

Personal CV of Artyom Nesin. Vite + React + TypeScript, multi-page build.

## Pages

- `/` - main CV (simple variant)
- `/variants/minimal/` - editorial typography
- `/variants/terminal/` - IDE/CLI aesthetic with tabs

## Scripts

```sh
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # produces dist/
pnpm preview    # serves dist/
pnpm typecheck  # tsc -b --noEmit
```

Requires Node 20+.

## Layout

```
.
├── index.html
├── src/
│   ├── main.tsx       # entry: mounts <App />
│   ├── App.tsx        # main variant
│   └── data.ts        # CV content, EN + RU, typed
├── public/
│   └── photo.jpeg     # /photo.jpeg, used by OG meta
├── variants/
│   ├── minimal/{index.html, main.tsx, App.tsx}
│   └── terminal/{index.html, main.tsx, App.tsx}
├── vite.config.ts     # 3 entries, @/ alias to src/
└── tsconfig.{json,app,node}.json
```

All three pages import `@/data`, so editing `src/data.ts` updates everything.

## Deployment

Vercel autodetects Vite. No config file required: push to a connected repo and it runs `pnpm install && pnpm build`, then serves `dist/`.

The main variant has a print stylesheet, so Cmd/Ctrl+P renders an A4-friendly PDF.

# web-cv

Personal CV of Artyom Nesin. Vite + React + TypeScript, multi-page build.

## Pages

- `/` - main CV, EN + RU
- `/contacts/` - standalone contacts page
- short links generated into `public/`: `/gh`, `/github`, `/tg`, `/in`, `/linkedin`, `/email`, `/cal`, `/cv`, `/cv-en`, `/cv-ru`

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
├── contacts/index.html
├── src/
│   ├── main.tsx       # entry: mounts <App />
│   ├── App.tsx        # main page
│   ├── contacts.tsx   # entry + markup for /contacts
│   ├── data.ts        # CV content, EN + RU, typed
│   ├── icons.tsx      # channel icons
│   └── shared.css     # tokens + shared components
├── public/
│   ├── photo.jpeg                # /photo.jpeg, used by OG meta
│   ├── Artyom_Nesin_CV_EN.pdf    # linked from the Download CV button
│   └── Artyom_Nesin_CV_RU.pdf
├── scripts/gen-redirects.mjs     # writes public/<path>/index.html redirect stubs
├── vite.config.ts     # 2 entries, @/ alias to src/
└── tsconfig.{json,app,node}.json
```

Both pages import `@/data`, so editing `src/data.ts` updates everything. `pnpm dev` and
`pnpm build` regenerate the redirect stubs first - edit the list in
`scripts/gen-redirects.mjs`, never the generated `public/<path>/index.html` files.

Content is kept in sync with the two PDF CVs in `public/`. When the PDF changes,
update `src/data.ts` in the same pass.

## Deployment

Vercel autodetects Vite. No config file required: push to a connected repo and it runs
`pnpm install && pnpm build`, then serves `dist/`.

The page has a print stylesheet, so Cmd/Ctrl+P renders an A4-friendly PDF. The Download CV
button links to the prepared PDF for the current language instead.

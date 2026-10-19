# Para Paula — bilingual birthday website

A custom React + TypeScript + Vite birthday experience in Argentine Spanish (`es-AR`) and English. The design uses Argentina-inspired sky blue and white, an opening screen, friendship timeline, ten-photo gallery with lightbox, an animated letter, four original vector travel illustrations, birthday wishes, and an optional confetti effect.

## Quick preview (no setup)

After extracting the ZIP, open `preview.html` in Chrome or another modern browser. Keep the `src/` and `public/` folders beside it so its local styles and illustrations load. This preview works without installing Node packages.

For the editable React source and production deployment, continue with the steps below.

## 1. Add the 10 personal photos

Copy your photographs into `public/images/` and use these filenames:

- `photo-01.jpg`
- `photo-02.jpg`
- `photo-03.png`
- `photo-04.png`
- `photo-05.jpg`
- `photo-06.jpg`
- `photo-07.jpg`
- `photo-08.jpg`
- `photo-09.jpg`
- `photo-10.jpg`

The gallery uses these exact filenames. If you use other formats, update the filenames in `src/content/gallery.ts` to match. Personal photos are never replaced with generated imagery.

Captions and all text can be edited in `src/content/translations.ts`. The Spanish and English letter paragraphs are stored separately there.

## 2. Run locally

Install Node.js 20 or newer. Open this folder in Cursor or VS Code, then run these commands in its terminal:

```bash
npm install
npm run dev
```

Open the local URL that Vite prints in the terminal (usually `http://localhost:5173`).

To check the production build:

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## 3. Publish online

A simple deployment option is Netlify or Vercel. Import the project repository or upload the project through your chosen service. Use:

- Build command: `npm run build`
- Publish/output directory: `dist`

Add all ten personal photos before publishing. Anyone with the public URL can view the site, so only include photographs and personal details you are comfortable sharing.

## 4. Customization

- Languages and letter: `src/content/translations.ts`
- Photo filenames and gallery settings: `src/content/gallery.ts`
- Travel illustrations: `public/destinations/*.svg`
- Main visual styling: `src/styles.css`
- Page sections and interactions: `src/App.tsx`

No backend, account, database, or autoplay audio is required.

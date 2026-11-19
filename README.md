# Desert Stars

Luxury rebuild of musktours.com: desert safaris, dhow cruises and guided days across the Emirates.

Live: https://desert-stars-benjamin-sevo.vercel.app (target domain: desertstars.tourground.com)

## Run and edit

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/
```

- Brand name, contact details, stats and categories: `data/site.ts`
- Colours and type: `app/globals.css` (`@theme` block). Theme: "Dune and Starlight".
- The 16 experiences: `data/tours.json` (prices are AED per adult; `null` = price on request)
- Journal posts: `data/journal.ts`
- Images: drop originals into `src-images/`, run `npm run images` to build AVIF/WebP sizes into `public/img/`, then reference them by file name without extension.
- Full original musktours.com text: `content/musktours-original.md`

Design references: aman.com and white-desert.com (layout), belmond.com (detail).

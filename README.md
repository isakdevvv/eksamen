# PDF-oversikt for Vercel

Enkel Next.js-app som lister alle PDF-ene som ligger i `public/pdfs` og viser dem direkte i nettleseren. Klar for å pushes til Vercel.

## Kom i gang
1. Installer avhengigheter:
   ```bash
   npm install
   ```
2. Legg PDF-filene dine i `public/pdfs/` (mappen finnes allerede).
3. Kjør lokalt:
   ```bash
   npm run dev
   ```
   Åpne deretter http://localhost:3000 for å se listen.

## Deploy til Vercel
1. Initialiser git og commit (allerede gjort i repoet hvis du bruker dette oppsettet).
2. Opprett et nytt prosjekt på https://vercel.com og koble til Git-repoet.
3. Vercel oppdager Next.js automatisk. Build-kommando: `npm run build`. Output: `.next`.
4. Push nye PDF-er til `public/pdfs/` for å få dem ut i prod.

## Strukturen
- `src/app/page.tsx` — Leser filnavn fra `public/pdfs` og viser dem i et grid med inline PDF-visning.
- `src/app/globals.css` — Styling.
- `public/pdfs/` — Legg PDF-ene her.

## Notat
Filen `Calendar oppgaven.pdf` i rotmappen er ikke i bruk av appen. Flytt den gjerne til `public/pdfs/` om den skal vises.

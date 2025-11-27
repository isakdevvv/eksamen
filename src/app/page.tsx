import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

export const dynamic = "force-dynamic";

type PdfEntry = {
  filename: string;
  displayName: string;
  href: string;
  sizeLabel: string;
};

function getPdfEntries(): PdfEntry[] {
  const pdfDir = path.join(process.cwd(), "public", "pdfs");

  if (!fs.existsSync(pdfDir)) {
    return [];
  }

  return fs
    .readdirSync(pdfDir, { withFileTypes: true })
    .filter(
      (entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".pdf"),
    )
    .map((entry) => {
      const filePath = path.join(pdfDir, entry.name);
      const stats = fs.statSync(filePath);
      const kb = Math.max(1, Math.round(stats.size / 1024));

      return {
        filename: entry.name,
        displayName: entry.name.replace(/\.pdf$/i, ""),
        href: `/pdfs/${encodeURIComponent(entry.name)}`,
        sizeLabel: `${kb.toLocaleString("no-NO")} KB`,
      };
    })
    .sort((a, b) => a.displayName.localeCompare(b.displayName, "no"));
}

export default function HomePage() {
  const pdfs = getPdfEntries();

  return (
    <main>
      <section className="hero">
        <span className="eyebrow">
          PDF-oversikt · {pdfs.length} fil{pdfs.length === 1 ? "" : "er"}
        </span>
        <h1>Alle PDF-ene i mappen, på én side</h1>
        <p>
          Legg PDF-filene i <code>public/pdfs</code>, og de dukker opp her
          automatisk. Perfekt for en enkel Vercel-deploy uten ekstra oppsett.
        </p>
      </section>

      {pdfs.length === 0 ? (
        <div className="empty">
          Ingen PDF-er funnet. Legg til filer i <code>public/pdfs</code> og
          kjør <code>npm run dev</code> lokalt eller deploy til Vercel for å se
          dem her.
        </div>
      ) : (
        <section className="pdf-grid">
          {pdfs.map((pdf) => (
            <article className="pdf-card" key={pdf.filename}>
              <div className="pdf-top">
                <h2 className="pdf-title">{pdf.displayName}</h2>
                <span className="pdf-meta">{pdf.sizeLabel}</span>
              </div>

              <object
                className="pdf-frame"
                data={`${pdf.href}#view=fitH`}
                type="application/pdf"
              >
                <p>
                  Klarte ikke å vise forhåndsvisning.{" "}
                  <Link href={pdf.href} download>
                    Last ned PDF
                  </Link>
                  .
                </p>
              </object>

              <div className="pdf-actions">
                <span className="pill">Lokal fil · {pdf.filename}</span>
                <Link
                  className="cta"
                  href={pdf.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Åpne i ny fane
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

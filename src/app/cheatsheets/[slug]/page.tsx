import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Source = {
  title: string;
  description: string;
  url: string;
  tags: string[];
};

const sources: Record<string, Source> = {
  comprehensive: {
    title: "Comprehensive Python Cheatsheet",
    description: "Hele innholdet fra gto76/python-cheatsheet, med kodeeksempler og hurtigreferanser.",
    url: "https://raw.githubusercontent.com/gto76/python-cheatsheet/main/README.md",
    tags: ["Python", "Collections", "Regex", "Async", "NumPy", "Pandas"],
  },
  best: {
    title: "Best Python Cheat Sheet",
    description: "Kjernehjelp fra kieranholland/best-python-cheat-sheet i et tettpakket format.",
    url: "https://raw.githubusercontent.com/kieranholland/best-python-cheat-sheet/main/README.md",
    tags: ["Python", "Core", "Printbar", "Lenker"],
  },
};

export const revalidate = 60 * 60 * 6; // Cache innholdet i 6 timer på Vercel

async function getMarkdown(slug: string) {
  const source = sources[slug];
  if (!source) return null;

  const res = await fetch(source.url, {
    next: { revalidate },
    cache: "force-cache",
  });

  if (!res.ok) {
    return { ...source, content: `Kunne ikke hente innhold (status ${res.status}).` };
  }

  const content = await res.text();
  return { ...source, content };
}

export default async function CheatSheetPage({ params }: { params: { slug: string } }) {
  const data = await getMarkdown(params.slug);
  if (!data) return notFound();

  return (
    <main>
      <section className="hero">
        <span className="eyebrow">Cheatsheet</span>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <div className="tag-grid">
          {data.tags.map((tag) => (
            <span key={tag} className="tag">
              <strong>#</strong> {tag}
            </span>
          ))}
        </div>
        <div className="tag-grid" style={{ marginTop: 12 }}>
          <Link className="cta" href={data.url} target="_blank" rel="noreferrer">
            Åpne original (GitHub)
          </Link>
          <Link className="cta" href="/">
            Tilbake til PDF-oversikt
          </Link>
        </div>
      </section>

      <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
        {data.content}
      </ReactMarkdown>
    </main>
  );
}

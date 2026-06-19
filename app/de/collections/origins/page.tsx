import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { publicPieceWhere } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "ORIGINS — Ausdrucksstarke Holz-Füllfederhalter",
  description:
    "ORIGINS ist die expressive Holzkollektion von LIGNORAE: Füllfederhalter aus Maserung, Tiefe, Farbe und natürlichem Materialcharakter.",
  alternates: {
    canonical: "/de/collections/origins",
    languages: {
      en: "/collections/origins",
      de: "/de/collections/origins",
      ro: "/ro/collections/origins",
      "x-default": "/collections/origins",
    },
  },
  openGraph: {
    title: "ORIGINS — Ausdrucksstarke Holz-Füllfederhalter von LIGNORAE",
    description:
      "Füllfederhalter aus Maserung, Tiefe, Farbe und natürlichem Materialcharakter, handgefertigt in München.",
    url: "/de/collections/origins",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ORIGINS Holz-Füllfederhalter von LIGNORAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORIGINS — Ausdrucksstarke Holz-Füllfederhalter von LIGNORAE",
    description:
      "Füllfederhalter aus Maserung, Tiefe, Farbe und natürlichem Materialcharakter, handgefertigt in München.",
    images: ["/og-image.jpg"],
  },
};

export const dynamic = "force-dynamic";

function getStatusLabel(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "available") return "Verfügbar";
  if (normalizedStatus === "reserved") return "Reserviert";
  if (normalizedStatus === "sold") return "Verkauft";
  if (normalizedStatus === "draft") return "Entwurf";
  if (normalizedStatus === "prototype-archive") return "Prototyp-Archiv";
  if (normalizedStatus === "archived") return "Archiviert";

  return status;
}

export default async function GermanOriginsPage() {
  const pieces = await prisma.piece.findMany({
    where: publicPieceWhere({
      collection: {
        equals: "ORIGINS",
        mode: "insensitive",
      },
    }),
    include: {
      translations: {
        where: {
          locale: "DE",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <Link
          href="/de/collections"
          className="mb-14 inline-block text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:text-black"
        >
          ← Kollektionen
        </Link>

        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Ausdrucksstarke Hölzer
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              ORIGINS
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            ORIGINS beginnt mit Hölzern von starker Zeichnung, Farbe, Dichte und
            natürlichem Charakter. Jedes Stück erhält seinen Ausdruck aus dem
            Material, nicht aus Ornament.
          </p>
        </div>

        <div className="group mx-auto mt-24 max-w-[1200px] overflow-hidden bg-[#eeeae2]">
          <Image
            src="/origin.jpg"
            alt="LIGNORAE ORIGINS Kollektion mit ausdrucksstarkem Holz und Schreibobjekten"
            width={1500}
            height={1000}
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="h-auto w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
          />
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#fbfaf7] px-9 py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-3">
          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              01
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Maserung
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              Die Zeichnung des Holzes bleibt sichtbar und wird zum Rhythmus des
              Objekts: Linien, Kontraste, Fasern und natürliche Tiefe.
            </p>
          </article>

          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              02
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Charakter
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              Jeder Rohling bringt eigene Dichte, visuelle Temperatur und
              Persönlichkeit mit, ohne eine äußere Geschichte erzwingen zu müssen.
            </p>
          </article>

          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              03
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Balance
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              ORIGINS hält die Form ruhig und lässt das Material führen:
              ausdrucksstark, aber nie dekorativ im Übermaß.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] flex-1 px-9 py-28">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.48em] text-black/95">
              ORIGINS Objekte
            </p>
            <h2 className="text-4xl font-light tracking-[-0.05em] text-black md:text-6xl">
              Einzelstücke
            </h2>
          </div>

          <p className="max-w-xl text-base font-normal leading-8 text-black/95">
            Jedes ORIGINS Objekt kann eine eigene Archivseite mit Materialnotizen,
            Fotografien, Spezifikationen und Verfügbarkeit erhalten.
          </p>
        </div>

        {pieces.length === 0 ? (
          <div className="border border-black/15 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-normal leading-7 text-black/95">
              Es wurde noch kein ORIGINS Objekt zum Archiv hinzugefügt.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pieces.map((piece) => {
              const translation = piece.translations[0];
              const title = translation?.title || piece.title;
              const shortDescription =
                translation?.shortDescription || piece.shortDescription;

              return (
                <Link
                  key={piece.id}
                  href={`/de/pieces/${piece.slug}`}
                  className="group overflow-hidden border border-black/15 bg-[#fbfaf7] transition duration-500 hover:-translate-y-1 hover:border-black/35"
                >
                  <div className="overflow-hidden bg-[#eeeae2]">
                    <Image
                      src={piece.image}
                      alt={title}
                      width={900}
                      height={700}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="h-auto w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-8">
                    <div className="mb-5 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.3em] text-black/95">
                      <span className="border border-black/15 px-3 py-1">
                        ORIGINS
                      </span>
                      <span className="border border-black/15 px-3 py-1">
                        {getStatusLabel(piece.status)}
                      </span>
                    </div>

                    <h3 className="mb-4 text-3xl font-light tracking-[-0.04em] text-black">
                      {title}
                    </h3>

                    <p className="mb-7 text-sm font-normal leading-7 text-black/95">
                      {shortDescription}
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.35em] text-black/95 transition group-hover:text-black">
                      Objekt ansehen →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { publicPieceWhere } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "NATURA — Natürliche Holz-Füllfederhalter",
  description:
    "NATURA ist die direkte LIGNORAE Kollektion: lokale Hölzer, ehrliche Oberflächen und taktile Füllfederhalter für den täglichen Gebrauch.",
  alternates: {
    canonical: "/de/collections/natura",
    languages: {
      en: "/collections/natura",
      de: "/de/collections/natura",
      ro: "/ro/collections/natura",
      "x-default": "/collections/natura",
    },
  },
  openGraph: {
    title: "NATURA — Natürliche Holz-Füllfederhalter von LIGNORAE",
    description:
      "Lokale Hölzer, ehrliche Oberflächen und taktile Füllfederhalter, handgefertigt in München.",
    url: "/de/collections/natura",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NATURA natürlicher Holz-Füllfederhalter von LIGNORAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NATURA — Natürliche Holz-Füllfederhalter von LIGNORAE",
    description:
      "Lokale Hölzer, ehrliche Oberflächen und taktile Füllfederhalter, handgefertigt in München.",
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

export default async function GermanNaturaPage() {
  const pieces = await prisma.piece.findMany({
    where: publicPieceWhere({
      collection: {
        equals: "NATURA",
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
              Essentielles Material
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              NATURA
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            NATURA hält das Objekt nah am Material: lokale Hölzer, taktile
            Oberflächen und eine direkte, ehrliche, zugänglichere Ausprägung der
            LIGNORAE-Sprache.
          </p>
        </div>

        <div className="mt-24 flex justify-center">
          <div className="group inline-flex overflow-hidden bg-[#eeeae2]">
            <Image
              src="/natura.jpg"
              alt="LIGNORAE NATURA Kollektion mit natürlichem Holz und Schreibobjekten"
              width={1500}
              height={1000}
              priority
              sizes="(max-width: 900px) 100vw, 900px"
              className="h-auto max-h-[820px] w-auto max-w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#fbfaf7] px-9 py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-3">
          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              01
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Holz
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              NATURA beginnt mit einfachen, direkten Hölzern, gewählt für Wärme,
              Faserbild und echte materielle Präsenz.
            </p>
          </article>

          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              02
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Textur
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              Die Oberflächen bleiben taktil, natürlich und nah an der Hand, die
              sie nutzt, ohne künstliche Perfektion oder übermäßige Verzierung.
            </p>
          </article>

          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
              03
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Zugang
            </h2>
            <p className="text-sm font-normal leading-7 text-black/95">
              Die Kollektion bietet einen direkteren Einstieg in die Welt von
              LIGNORAE: formale Disziplin, ehrliches Material und ruhige Präsenz.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] flex-1 px-9 py-28">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.48em] text-black/95">
              NATURA Objekte
            </p>
            <h2 className="text-4xl font-light tracking-[-0.05em] text-black md:text-6xl">
              Einzelstücke
            </h2>
          </div>

          <p className="max-w-xl text-base font-normal leading-8 text-black/95">
            Jedes NATURA Objekt kann eine eigene Archivseite mit Materialnotizen,
            Fotografien, Spezifikationen und Verfügbarkeit erhalten.
          </p>
        </div>

        {pieces.length === 0 ? (
          <div className="border border-black/15 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-normal leading-7 text-black/95">
              Es wurde noch kein NATURA Objekt zum Archiv hinzugefügt.
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
                        NATURA
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

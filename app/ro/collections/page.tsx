import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Colecții — FORMA, ORIGINS și NATURA",
  description:
    "Explorează colecțiile LIGNORAE: FORMA, ORIGINS și NATURA, trei limbaje materiale pentru stilouri sculpturale realizate în München.",
  alternates: {
    canonical: "/ro/collections",
    languages: {
      en: "/collections",
      de: "/de/collections",
      ro: "/ro/collections",
      "x-default": "/collections",
    },
  },
  openGraph: {
    title: "Colecțiile LIGNORAE — FORMA, ORIGINS și NATURA",
    description:
      "Trei limbaje materiale pentru stilouri sculpturale realizate manual în München.",
    url: "/ro/collections",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Colecțiile LIGNORAE prezentate într-un limbaj vizual de galerie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colecțiile LIGNORAE — FORMA, ORIGINS și NATURA",
    description:
      "Trei limbaje materiale pentru stilouri sculpturale realizate manual în München.",
    images: ["/og-image.jpg"],
  },
};

export const dynamic = "force-dynamic";

const collections = [
  {
    title: "FORMA",
    href: "/ro/collections/forma",
    image: "/gallery_landing.jpg",
    eyebrow: "Colecția principală",
    statement: "Suprafețe arse. Liniște sculpturală. Forme cocoon.",
    description:
      "FORMA este limbajul definitoriu al LIGNORAE: suprafețe yakisugi, siluete reduse și o prezență aproape muzeală în jurul actului de a scrie.",
  },
  {
    title: "ORIGINS",
    href: "/ro/collections/origins",
    image: "/origin.jpg",
    eyebrow: "Lemn expresiv",
    statement: "Textura exotică, profunzime și caracter material.",
    description:
      "ORIGINS pornește de la lemn selectat pentru coloratură, culoare și densitate, oferind fiecărui obiect propriul ritm vizual.",
  },
  {
    title: "NATURA",
    href: "/ro/collections/natura",
    image: "/natura.jpg",
    eyebrow: "Material esențial",
    statement: "Căldură brută. Intervenție minimă. Textură unică.",
    description:
      "NATURA păstrează lucrul direct: lemn local, suprafețe tactile și o expresie mai accesibilă a limbajului LIGNORAE.",
  },
];

function getStatusLabel(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "available") return "Disponibil";
  if (normalizedStatus === "reserved") return "Rezervat";
  if (normalizedStatus === "sold") return "Vândut";
  if (normalizedStatus === "draft") return "Ciornă";
  if (normalizedStatus === "prototype-archive") return "Arhivă prototip";

  return status;
}

function getCollectionLabel(collection: string) {
  const normalizedCollection = collection.toLowerCase().trim();

  if (normalizedCollection === "forma") return "FORMA";
  if (normalizedCollection === "origins") return "ORIGINS";
  if (normalizedCollection === "natura") return "NATURA";

  return "UNASSIGNED";
}

export default async function RomanianCollectionsPage() {
  const latestPieces = await prisma.piece.findMany({
    include: {
      translations: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Colecții
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Trei limbaje materiale.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            LIGNORAE este organizat în trei expresii clare: limbajul negru,
            sculptural al FORMA, lemnul expresiv din ORIGINS și eleganța
            naturală directă din NATURA.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-28">
        <div className="grid gap-10">
          {collections.map((collection, index) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="group grid overflow-hidden border border-black/15 bg-[#fbfaf7] transition duration-500 hover:-translate-y-1 hover:border-black/35 md:grid-cols-[1.05fr_0.95fr]"
            >
              <div
                className={`relative min-h-[420px] overflow-hidden bg-[#eeeae2] ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={collection.image}
                  alt={`${collection.title} collection`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex min-h-[420px] flex-col justify-between p-8 md:p-12">
                <div>
                  <p className="mb-8 text-[10px] uppercase tracking-[0.35em] text-black/95">
                    {collection.eyebrow}
                  </p>

                  <h2 className="mb-8 text-5xl font-light leading-[0.9] tracking-[-0.06em] text-black md:text-7xl">
                    {collection.title}
                  </h2>

                  <p className="max-w-xl text-2xl font-light leading-tight tracking-[-0.04em] text-black md:text-3xl">
                    {collection.statement}
                  </p>
                </div>

                <div className="mt-14">
                  <p className="max-w-xl text-base font-normal leading-8 text-black/95">
                    {collection.description}
                  </p>

                  <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-black/95 transition group-hover:text-black">
                    Vezi colecția →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#fbfaf7] px-9 py-24">
        <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-[0.75fr_1.25fr] md:items-center">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Serii viitoare limitate
            </p>
            <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              Rezervate pentru lucrări cu proveniență documentată.
            </h2>
          </div>

          <div className="space-y-7 text-base font-normal leading-8 text-black/95 md:text-lg">
            <p>
              SONORA și SACRA rămân rezervate pentru lucrări exclusiviste viitoare,
              atunci când vom putea obține și documenta corect lemn provenit din
              instrumente muzicale sau din spații sacre istorice.
            </p>
            <p>
              Până atunci, structura activă LIGNORAE rămâne intenționat
              concentrată: FORMA, ORIGINS și NATURA.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] flex-1 px-9 py-28">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Obiecte individuale
            </p>
            <h2 className="text-4xl font-light tracking-[-0.05em] text-black md:text-6xl">
              Piese din atelier
            </h2>
          </div>

          <p className="max-w-xl text-base font-normal leading-8 text-black/95">
            Fiecare obiect poate primi propria pagină de arhivă, cu note despre
            material, fotografii, specificații și disponibilitate.
          </p>
        </div>

        {latestPieces.length === 0 ? (
          <div className="border border-black/15 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-normal leading-7 text-black/95">
              Nu a fost adăugat încă niciun obiect individual în arhivă.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestPieces.map((piece) => {
              const translation = piece.translations.find(
                (entry) => entry.locale === "RO"
              );

              const title = translation?.title || piece.title;
              const shortDescription =
                translation?.shortDescription || piece.shortDescription;
              const collection = translation?.collection || piece.collection;

              return (
                <Link
                  key={piece.id}
                  href={`/ro/pieces/${piece.slug}`}
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
                        {getCollectionLabel(collection)}
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
                      Vezi obiectul →
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
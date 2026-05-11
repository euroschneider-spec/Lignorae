import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getStatusLabel(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "available") return "Disponibil";
  if (normalizedStatus === "reserved") return "Rezervat";
  if (normalizedStatus === "sold") return "Vândut";
  if (normalizedStatus === "draft") return "Ciornă";
  if (normalizedStatus === "prototype-archive") return "Arhivă prototip";
  if (normalizedStatus === "archived") return "Arhivat";

  return status;
}

export default async function RomanianOriginsPage() {
  const pieces = await prisma.piece.findMany({
    where: {
      collection: {
        equals: "ORIGINS",
        mode: "insensitive",
      },
      status: {
        notIn: ["draft", "archived"],
      },
    },
    include: {
      translations: {
        where: {
          locale: "RO",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto max-w-[1500px] px-9 pb-24 pt-40">
        <Link
          href="/ro/collections"
          className="mb-14 inline-block text-[10px] uppercase tracking-[0.35em] text-black/55 transition hover:text-black"
        >
          ← Colecții
        </Link>

        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
              Lemn expresiv
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              ORIGINS
            </h1>
          </div>

          <p className="max-w-2xl text-base font-light leading-8 text-black/70 md:text-lg">
            ORIGINS pornește de la lemn cu desen puternic, culoare, densitate și
            caracter natural. Fiecare piesă își primește expresia din material,
            nu din ornament.
          </p>
        </div>

        <div className="group relative mt-24 aspect-[16/9] overflow-hidden bg-[#eeeae2]">
          <Image
            src="/origin.jpg"
            alt="Colecția ORIGINS LIGNORAE, lemn expresiv și obiecte de scris"
            fill
            priority
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="object-cover object-center transition duration-[1800ms] ease-out group-hover:scale-[1.035]"
          />
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#fbfaf7] px-9 py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-3">
          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/55">
              01
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Maseratură
            </h2>
            <p className="text-sm font-light leading-7 text-black/70">
              Desenul lemnului rămâne vizibil și devine ritmul principal al
              obiectului: linii, contraste, fibre și adâncime naturală.
            </p>
          </article>

          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/55">
              02
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Caracter
            </h2>
            <p className="text-sm font-light leading-7 text-black/70">
              Fiecare blank aduce o densitate, o temperatură vizuală și o
              personalitate proprie, fără să forțeze o poveste externă.
            </p>
          </article>

          <article className="border-l border-black/20 pl-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/55">
              03
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Echilibru
            </h2>
            <p className="text-sm font-light leading-7 text-black/70">
              ORIGINS păstrează forma curată și lasă materialul să conducă:
              suficient de expresiv, dar niciodată decorativ în exces.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-9 py-28">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.48em] text-black/55">
              Obiecte ORIGINS
            </p>
            <h2 className="text-4xl font-light tracking-[-0.05em] text-black md:text-6xl">
              Piese individuale
            </h2>
          </div>

          <p className="max-w-xl text-base font-light leading-8 text-black/70">
            Fiecare obiect ORIGINS poate primi propria pagină de arhivă, cu note
            despre material, fotografii, specificații și disponibilitate.
          </p>
        </div>

        {pieces.length === 0 ? (
          <div className="border border-black/15 bg-[#fbfaf7] p-10 text-center">
            <p className="text-base font-light leading-7 text-black/70">
              Nu a fost adăugat încă niciun obiect ORIGINS în arhivă.
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
                  href={`/ro/pieces/${piece.slug}`}
                  className="group overflow-hidden border border-black/15 bg-[#fbfaf7] transition duration-500 hover:-translate-y-1 hover:border-black/35"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#eeeae2]">
                    <Image
                      src={piece.image}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition duration-[1800ms] ease-out group-hover:scale-[1.035]"
                    />
                  </div>

                  <div className="p-8">
                    <div className="mb-5 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.3em] text-black/55">
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

                    <p className="mb-7 text-sm font-light leading-7 text-black/70">
                      {shortDescription}
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.35em] text-black/60 transition group-hover:text-black">
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
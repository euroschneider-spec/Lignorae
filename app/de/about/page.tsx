import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Über LIGNORAE — Münchner Atelier für skulpturale Füllfederhalter",
  description:
    "Erfahren Sie mehr über LIGNORAE, ein Münchner Atelier für skulpturale Füllfederhalter, Holz, Feuer, Materialdisziplin und kleine Serien.",
  alternates: {
    canonical: "/de/about",
    languages: {
      en: "/about",
      de: "/de/about",
      ro: "/ro/about",
      "x-default": "/about",
    },
  },
  openGraph: {
    title: "Über LIGNORAE — Münchner Atelier für skulpturale Füllfederhalter",
    description:
      "Ein kleines Münchner Atelier für skulpturale Füllfederhalter, Holz, Feuer und ruhige Handwerkskunst.",
    url: "/de/about",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LIGNORAE Atelier und skulpturale Füllfederhalter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Über LIGNORAE — Münchner Atelier für skulpturale Füllfederhalter",
    description:
      "Ein kleines Münchner Atelier für skulpturale Füllfederhalter, Holz, Feuer und ruhige Handwerkskunst.",
    images: ["/og-image.jpg"],
  },
};

const principles = [
  {
    label: "01",
    title: "Kunst, nicht Zubehör",
    text: "LIGNORAE betrachtet den Füllfederhalter als kleines skulpturales Objekt: funktional, taktil und visuell zurückhaltend.",
  },
  {
    label: "02",
    title: "Kleine Serien",
    text: "Die Stücke entstehen langsam, in begrenzter Zahl, ohne den Anspruch industrieller oder endlos wiederholbarer Produktion.",
  },
  {
    label: "03",
    title: "Materialsprache",
    text: "Holz, Feuer, Faser und Proportion bestimmen die Arbeit stärker als Ornament, Überfluss oder erzwungene Erzählung.",
  },
];

export default function GermanAboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Über LIGNORAE
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Ein Münchner Atelier für skulpturale Füllfederhalter.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            LIGNORAE folgt einer einfachen Idee: Ein Füllfederhalter kann mehr
            sein als ein Werkzeug, ohne laut zu werden. Er kann Präsenz durch
            Material, Proportion und Zurückhaltung tragen.
          </p>
        </div>

        <div className="group mx-auto mt-24 max-w-[1200px] overflow-hidden bg-[#eeeae2]">
          <Image
            src="/gallery_landing.jpg"
            alt="Skulpturales LIGNORAE Schreibobjekt in einem Galerieraum"
            width={1500}
            height={1000}
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="h-auto w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
          />
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#fbfaf7] px-9 py-28">
        <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Philosophie
            </p>
            <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              Ruhige Form. Natürliches Material. Präzise Zurückhaltung.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.label} className="border-l border-black/20 pl-7">
                <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/95">
                  {principle.label}
                </p>
                <h3 className="mb-5 text-3xl font-light tracking-[-0.04em]">
                  {principle.title}
                </h3>
                <p className="text-sm font-normal leading-7 text-black/95">
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] gap-16 px-9 py-28 md:grid-cols-[1fr_1fr] md:items-start">
        <div>
          <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
            Das Atelier
          </p>
          <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
            Die Arbeit beginnt an der Werkbank, nicht im Katalog.
          </h2>
        </div>

        <div className="space-y-7 text-base font-normal leading-8 text-black/95 md:text-lg">
          <p>
            Das Atelier ist bewusst klein. Jedes Objekt durchläuft dieselbe
            direkte Abfolge: Materialauswahl, Zuschnitt, Drehen,
            Oberflächenbehandlung, Finish, Montage und Prüfung.
          </p>
          <p>
            Ziel ist nicht die Nachahmung industrieller Produktion. Ziel ist der
            Aufbau einer erkennbaren Sprache von Schreibobjekten: taktil,
            diszipliniert und ruhig genug, um auf einem Schreibtisch, in einer
            Sammlung oder in der eigenen Cocoon-Präsentationsform zu bestehen.
          </p>
        </div>
      </section>

      <section className="border-t border-black/15 bg-[#fbfaf7] px-9 py-28">
        <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="group overflow-hidden bg-[#eeeae2]">
            <Image
              src="/natura.jpg"
              alt="LIGNORAE Materialstudie"
              width={900}
              height={700}
              sizes="(max-width: 768px) 100vw, 680px"
              className="h-auto w-full object-contain object-center transition duration-[1800ms] ease-out group-hover:scale-[1.02]"
            />
          </div>

          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Menschen
            </p>
            <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              Ein Atelier im menschlichen Maßstab, geprägt durch Hände und Entscheidungen.
            </h2>
            <p className="mt-9 max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
              Hinter LIGNORAE steht ein kleines Arbeitsteam, keine anonyme
              Produktionslinie. Der Wert jedes Stücks entsteht durch Aufmerksamkeit,
              Wiederholung, Korrektur und die Bereitschaft, dem Material einen Teil
              des endgültigen Ausdrucks zu überlassen.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
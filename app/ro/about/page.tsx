import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const principles = [
  {
    label: "01",
    title: "Artă, nu accesorii",
    text: "LIGNORAE privește stiloul ca pe un mic obiect sculptural: funcțional, tactil și vizual reținut.",
  },
  {
    label: "02",
    title: "Serii mici",
    text: "Piesele sunt realizate încet, în număr limitat, fără pretenția unei producții industriale sau infinit repetabile.",
  },
  {
    label: "03",
    title: "Limbaj material",
    text: "Lemnul, focul, fibra și proporția definesc lucrul mai mult decât ornamentul, excesul sau povestea forțată.",
  },
];

export default function RomanianAboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
              Despre LIGNORAE
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Un atelier din München pentru stilouri sculpturale.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-light leading-8 text-black/70 md:text-lg">
            LIGNORAE pornește de la o idee simplă: un stilou poate fi mai mult
            decât o unealtă, fără să devină strident. Poate purta prezență prin
            material, proporție și reținere.
          </p>
        </div>

        <div className="group relative mt-24 aspect-[16/9] overflow-hidden bg-[#eeeae2]">
          <Image
            src="/gallery_landing.jpg"
            alt="Obiect de scris sculptural LIGNORAE într-un spațiu de galerie"
            fill
            priority
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="object-cover object-center transition duration-[1800ms] ease-out group-hover:scale-[1.035]"
          />
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#fbfaf7] px-9 py-28">
        <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
              Filosofie
            </p>
            <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              Formă liniștită. Material natural. Reținere precisă.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.label} className="border-l border-black/20 pl-7">
                <p className="mb-6 text-[10px] uppercase tracking-[0.42em] text-black/55">
                  {principle.label}
                </p>
                <h3 className="mb-5 text-3xl font-light tracking-[-0.04em]">
                  {principle.title}
                </h3>
                <p className="text-sm font-light leading-7 text-black/70">
                  {principle.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-16 px-9 py-28 md:grid-cols-[1fr_1fr] md:items-start">
        <div>
          <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
            Atelierul
          </p>
          <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
            Lucrul începe la bancul de lucru, nu într-un catalog.
          </h2>
        </div>

        <div className="space-y-7 text-base font-light leading-8 text-black/70 md:text-lg">
          <p>
            Atelierul este intenționat mic. Fiecare obiect trece prin aceeași
            succesiune directă: alegerea materialului, tăiere, strunjire,
            tratament de suprafață, finisare, asamblare și testare.
          </p>
          <p>
            Scopul nu este imitarea producției de masă. Scopul este construirea
            unui limbaj recognoscibil al obiectelor de scris: tactil,
            disciplinat și suficient de calm încât să aparțină unui birou, unei
            colecții sau propriei forme de prezentare cocoon.
          </p>
        </div>
      </section>

      <section className="border-t border-black/15 bg-[#fbfaf7] px-9 py-28">
        <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="group relative aspect-[4/5] overflow-hidden bg-[#eeeae2]">
            <Image
              src="/natura.jpg"
              alt="Studiu de material LIGNORAE"
              fill
              sizes="(max-width: 768px) 100vw, 680px"
              className="object-cover object-center transition duration-[1800ms] ease-out group-hover:scale-[1.035]"
            />
          </div>

          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
              Oameni
            </p>
            <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">
              Un atelier la scară umană, format prin mâini și decizii.
            </h2>
            <p className="mt-9 max-w-2xl text-base font-light leading-8 text-black/70 md:text-lg">
              În spatele LIGNORAE se află o echipă mică de lucru, nu o linie de
              producție anonimă. Valoarea fiecărei piese vine din atenție,
              repetiție, corectare și disponibilitatea de a lăsa materialul să
              decidă o parte din expresia finală.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
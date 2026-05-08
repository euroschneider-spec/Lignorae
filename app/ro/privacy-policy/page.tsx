import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Politica de confidențialitate
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Protecția datelor
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Informații generale
            </h2>

            <p className="leading-relaxed">
              Protejarea datelor personale este importantă pentru LIGNORAE Atelier.
              Informațiile personale transmise prin acest website sunt tratate
              confidențial și în conformitate cu reglementările aplicabile
              privind protecția datelor.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Solicitări de contact
            </h2>

            <p className="leading-relaxed">
              Când vizitatorii contactează atelierul prin e-mail sau prin
              formularul de contact pregătit, după activarea acestuia,
              informațiile transmise pot fi stocate pentru procesarea solicitării
              și pentru comunicări ulterioare.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Găzduire și date tehnice
            </h2>

            <p className="leading-relaxed">
              Datele tehnice de acces, precum tipul browserului, sistemul de
              operare, sursa de trimitere și ora accesării, pot fi procesate
              automat de furnizorul de găzduire pentru securitate și stabilitate
              tehnică.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Servicii externe
            </h2>

            <p className="leading-relaxed">
              Acest website evită în prezent, pe cât posibil, sistemele de
              analiză, trackerele de marketing și cookie-urile nenecesare.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Actualizări viitoare
            </h2>

            <p className="leading-relaxed">
              Această politică de confidențialitate va fi extinsă și actualizată
              pe măsură ce vor fi adăugate servicii suplimentare, sisteme de
              plată, formulare sau instrumente de analiză.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
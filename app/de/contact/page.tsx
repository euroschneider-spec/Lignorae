"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inputClass =
  "w-full border border-black/15 bg-[#fbfaf7] px-4 py-3 text-sm font-light text-black outline-none transition placeholder:text-black/40 focus:border-black";

export default function GermanContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      enquiryType: String(formData.get("enquiryType") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send enquiry");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] flex-1 px-9 pb-28 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
              Kontakt
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Beginnen Sie ein Gespräch.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/80 md:text-lg">
            Für Verfügbarkeit, Einzelanfertigungen, Sammleranfragen,
            Kooperationen oder Retail/B2B-Gespräche kontaktieren Sie das Atelier
            direkt. Jede Anfrage wird persönlich gelesen.
          </p>
        </div>

        <div className="mt-24 grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <form
            onSubmit={handleSubmit}
            className="border border-black/15 bg-[#fbfaf7] p-6 md:p-8"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-black/70">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Ihr Name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-black/70">
                  E-Mail
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="email@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-black/70">
                Art der Anfrage
              </label>
              <select name="enquiryType" required className={inputClass}>
                <option>Verfügbarkeitsanfrage</option>
                <option>Einzelanfertigung</option>
                <option>Sammler / private Anfrage</option>
                <option>Retail / B2B-Kooperation</option>
                <option>Presse / Partnerschaft</option>
                <option>Sonstiges</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-black/70">
                Nachricht
              </label>
              <textarea
                name="message"
                required
                rows={8}
                placeholder="Beschreiben Sie kurz, wonach Sie suchen."
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-8 border border-black bg-black px-6 py-3 text-[10px] uppercase tracking-[0.35em] text-white transition hover:bg-transparent hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "Wird gesendet..." : "Anfrage senden"}
            </button>

            {status === "success" && (
              <p className="mt-5 text-sm font-normal leading-7 text-black/80">
                Vielen Dank. Ihre Anfrage wurde an LIGNORAE Atelier gesendet.
              </p>
            )}

            {status === "error" && (
              <p className="mt-5 text-sm leading-7 text-red-700">
                Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder
                kontaktieren Sie das Atelier direkt per E-Mail.
              </p>
            )}

            <p className="mt-5 text-sm font-normal leading-7 text-black/80">
              Ihre Anfrage wird direkt an LIGNORAE Atelier gesendet.
            </p>
          </form>

          <aside className="border border-black/15 bg-[#fbfaf7] p-6 md:p-8">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/70">
                Direkte E-Mail
              </p>
              <a
                href="mailto:info@lignorae.com"
                className="text-3xl font-light tracking-[-0.04em] transition hover:text-black/65"
              >
                info@lignorae.com
              </a>
            </div>

            <div className="mt-12 border-t border-black/15 pt-8">
              <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/70">
                Atelier
              </p>
              <p className="text-base font-normal leading-8 text-black/80">
                LIGNORAE Atelier
                <br />
                München, Deutschland
              </p>
            </div>

            <div className="mt-12 border-t border-black/15 pt-8">
              <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/70">
                Objekte in kleinen Serien
              </p>
              <p className="text-base font-normal leading-8 text-black/80">
                LIGNORAE Schreibobjekte entstehen in kleinen Serien. Details zu
                Material, Verfügbarkeit, Preis, Lieferung und möglichen
                Einzelanfertigungen werden vor jeder Auftragsbestätigung
                besprochen.
              </p>
            </div>

            <div className="mt-12 border-t border-black/15 pt-8">
              <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/70">
                Instagram
              </p>
              <a
                href="https://www.instagram.com/lignorae/"
                target="_blank"
                rel="noreferrer"
                className="text-base font-normal leading-8 text-black/80 transition hover:text-black"
              >
                @Lignorae
              </a>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
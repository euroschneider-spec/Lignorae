"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
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
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-6xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Kontakt
        </p>

        <h1 className="mb-8 text-5xl font-light md:text-6xl">
          Verfügbarkeit anfragen
        </h1>

        <p className="mb-12 max-w-3xl text-lg leading-relaxed text-[#d0cabf]">
          Die erste LIGNORAE Edition befindet sich derzeit in Vorbereitung.
          Anfragen zu Vorbestellungen, Einzelanfertigungen, Kooperationen und
          ausgewählten Händlergesprächen sind bereits möglich.
        </p>

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8"
          >
            <div className="mb-6">
              <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Ihr Name"
                className="w-full rounded-xl border border-[#4a3522]/70 bg-[#120d09] px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#7f7568] focus:border-[#c6a66a]"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                E-Mail
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="ihre@email.de"
                className="w-full rounded-xl border border-[#4a3522]/70 bg-[#120d09] px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#7f7568] focus:border-[#c6a66a]"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                Art der Anfrage
              </label>
              <select
                name="enquiryType"
                required
                className="w-full rounded-xl border border-[#4a3522]/70 bg-[#120d09] px-4 py-3 text-[#f5f1e8] outline-none focus:border-[#c6a66a]"
              >
                <option>Vorbestellungsanfrage</option>
                <option>Einzelanfertigung</option>
                <option>Handel / B2B Kooperation</option>
                <option>Presse / Partnerschaft</option>
                <option>Sonstiges</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                Nachricht
              </label>
              <textarea
                name="message"
                required
                rows={7}
                placeholder="Beschreiben Sie kurz, wonach Sie suchen..."
                className="w-full rounded-xl border border-[#4a3522]/70 bg-[#120d09] px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#7f7568] focus:border-[#c6a66a]"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full border border-[#c6a66a] px-8 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-[#c6a66a] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "Wird gesendet..." : "Anfrage senden"}
            </button>

            {status === "success" && (
              <p className="mt-5 text-sm leading-relaxed text-[#c6a66a]">
                Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.
              </p>
            )}

            {status === "error" && (
              <p className="mt-5 text-sm leading-relaxed text-red-300">
                Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder kontaktieren Sie das Atelier direkt per E-Mail.
              </p>
            )}

            <p className="mt-5 text-sm leading-relaxed text-[#9f9588]">
              Ihre Anfrage wird direkt an das Atelier gesendet.
            </p>
          </form>

          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
              Direkte E-Mail
            </p>

            <a
              href="mailto:info@lignorae.com"
              className="text-2xl font-light hover:text-[#c6a66a]"
            >
              info@lignorae.com
            </a>

            <div className="mt-10 border-t border-[#4a3522]/70 pt-8">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
                Erste Edition
              </p>

              <p className="leading-relaxed text-[#d0cabf]">
                Die ersten LIGNORAE Schreibinstrumente entstehen in kleinen
                Mengen. Frühe Anfragen werden persönlich bearbeitet; Material,
                Verfügbarkeit, Preis und Lieferung werden vor jeder
                Auftragsbestätigung individuell besprochen.
              </p>
            </div>

            <div className="mt-10 border-t border-[#4a3522]/70 pt-8">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
                Standort
              </p>

              <p className="leading-relaxed text-[#d0cabf]">
                LIGNORAE Atelier
                <br />
                München, Deutschland
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
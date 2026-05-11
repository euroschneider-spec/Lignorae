"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inputClass =
  "w-full border border-black/15 bg-[#fbfaf7] px-4 py-3 text-sm font-normal text-black outline-none transition placeholder:text-black/60 focus:border-black";

export default function RomanianContactPage() {
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
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/95">
              Contact
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Începe o conversație.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/95 md:text-lg">
            Pentru disponibilitate, comenzi speciale, colecționari, colaborări
            sau discuții retail/B2B, contactează atelierul direct. Fiecare
            solicitare este citită personal.
          </p>
        </div>

        <div className="mt-24 grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <form
            onSubmit={handleSubmit}
            className="border border-black/15 bg-[#fbfaf7] p-6 md:p-8"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-black/95">
                  Nume
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Numele tău"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-black/95">
                  E-mail
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
              <label className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-black/95">
                Tipul solicitării
              </label>
              <select name="enquiryType" required className={inputClass}>
                <option>Întrebare despre disponibilitate</option>
                <option>Comandă specială</option>
                <option>Colecționar / solicitare privată</option>
                <option>Retail / colaborare B2B</option>
                <option>Presă / parteneriat</option>
                <option>Altceva</option>
              </select>
            </div>

            <div className="mt-6">
              <label className="mb-3 block text-[10px] uppercase tracking-[0.35em] text-black/95">
                Mesaj
              </label>
              <textarea
                name="message"
                required
                rows={8}
                placeholder="Spune-ne pe scurt ce cauți."
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-8 border border-black bg-black px-6 py-3 text-[10px] uppercase tracking-[0.35em] text-white transition hover:bg-transparent hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "Se trimite..." : "Trimite solicitarea"}
            </button>

            {status === "success" && (
              <p className="mt-5 text-sm font-normal leading-7 text-black/95">
                Mulțumim. Solicitarea a fost trimisă către LIGNORAE Atelier.
              </p>
            )}

            {status === "error" && (
              <p className="mt-5 text-sm leading-7 text-red-700">
                Ceva nu a funcționat. Încearcă din nou sau contactează atelierul
                direct prin e-mail.
              </p>
            )}

            <p className="mt-5 text-sm font-normal leading-7 text-black/95">
              Solicitarea va fi trimisă direct către LIGNORAE Atelier.
            </p>
          </form>

          <aside className="border border-black/15 bg-[#fbfaf7] p-6 md:p-8">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/95">
                E-mail direct
              </p>
              <a
                href="mailto:info@lignorae.com"
                className="text-3xl font-light tracking-[-0.04em] text-black/95 transition hover:text-black"
              >
                info@lignorae.com
              </a>
            </div>

            <div className="mt-12 border-t border-black/15 pt-8">
              <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/95">
                Atelier
              </p>
              <p className="text-base font-normal leading-8 text-black/95">
                LIGNORAE Atelier
                <br />
                München, Germania
              </p>
            </div>

            <div className="mt-12 border-t border-black/15 pt-8">
              <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/95">
                Obiecte în număr redus
              </p>
              <p className="text-base font-normal leading-8 text-black/95">
                Stilourile LIGNORAE sunt pregătite în serii mici.
                Detaliile despre material, disponibilitate, preț, livrare și
                eventuale comenzi speciale sunt discutate înaintea confirmării
                oricărei comenzi.
              </p>
            </div>

            <div className="mt-12 border-t border-black/15 pt-8">
              <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-black/95">
                Instagram
              </p>
              <a
                href="https://www.instagram.com/lignorae/"
                target="_blank"
                rel="noreferrer"
                className="text-base font-normal leading-8 text-black/95 transition hover:text-black"
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
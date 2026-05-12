"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "w-full border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black outline-none transition placeholder:text-black/60 focus:border-black";

const labelClass = "mb-2 block text-xs uppercase tracking-[0.28em] text-black/95";

export default function GermanContactForm() {
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
    <form
      onSubmit={handleSubmit}
      className="border border-black/15 bg-[#fbfaf7] p-6 md:p-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClass}>Name</label>
          <input
            name="name"
            type="text"
            required
            placeholder="Ihr Name"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>E-Mail</label>
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
        <label className={labelClass}>Art der Anfrage</label>
        <select name="enquiryType" required className={inputClass}>
          <option>Verfügbarkeit anfragen</option>
          <option>Sonderanfertigung</option>
          <option>Sammler / private Anfrage</option>
          <option>Retail / B2B Zusammenarbeit</option>
          <option>Presse / Partnerschaft</option>
          <option>Sonstiges</option>
        </select>
      </div>

      <div className="mt-6">
        <label className={labelClass}>Nachricht</label>
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
        className="mt-8 border border-black/35 bg-transparent px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:border-black hover:bg-transparent hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Wird gesendet..." : "Anfrage senden"}
      </button>

      {status === "success" && (
        <p className="mt-5 text-sm leading-relaxed text-black/95">
          Vielen Dank. Ihre Anfrage wurde an LIGNORAE Atelier gesendet.
        </p>
      )}

      {status === "error" && (
        <p className="mt-5 text-sm leading-relaxed text-red-700">
          Etwas ist fehlgeschlagen. Bitte versuchen Sie es erneut oder kontaktieren
          Sie das Atelier direkt per E-Mail.
        </p>
      )}

      <p className="mt-5 text-sm font-normal leading-relaxed text-black/95">
        Ihre Anfrage wird direkt an LIGNORAE Atelier gesendet.
      </p>
    </form>
  );
}

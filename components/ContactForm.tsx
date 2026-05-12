

"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "w-full border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm font-normal text-black outline-none transition placeholder:text-black/60 focus:border-black";

const labelClass = "mb-2 block text-xs uppercase tracking-[0.28em] text-black/95";

export default function ContactForm() {
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
            placeholder="Your name"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Email</label>
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
        <label className={labelClass}>Enquiry type</label>
        <select name="enquiryType" required className={inputClass}>
          <option>Availability enquiry</option>
          <option>Commission</option>
          <option>Collector / private enquiry</option>
          <option>Retail / B2B collaboration</option>
          <option>Press / partnership</option>
          <option>Other</option>
        </select>
      </div>

      <div className="mt-6">
        <label className={labelClass}>Message</label>
        <textarea
          name="message"
          required
          rows={8}
          placeholder="Tell us briefly what you are looking for."
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 border border-black/35 bg-transparent px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-black/95 transition hover:border-black hover:bg-transparent hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send enquiry"}
      </button>

      {status === "success" && (
        <p className="mt-5 text-sm leading-relaxed text-black/95">
          Thank you. Your enquiry has been sent to LIGNORAE Atelier.
        </p>
      )}

      {status === "error" && (
        <p className="mt-5 text-sm leading-relaxed text-red-700">
          Something went wrong. Please try again or contact the atelier directly
          by email.
        </p>
      )}

      <p className="mt-5 text-sm font-normal leading-relaxed text-black/95">
        Your enquiry will be sent directly to LIGNORAE Atelier.
      </p>
    </form>
  );
}
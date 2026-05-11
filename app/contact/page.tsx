"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inputClass =
  "w-full border border-black/15 bg-[#f7f5f0] px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-black";

const labelClass = "mb-2 block text-xs uppercase tracking-[0.28em] text-black/55";

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
    <main className="flex min-h-screen flex-col bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="mx-auto w-full max-w-[1500px] px-9 pb-24 pt-40">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/55">
              Contact
            </p>
            <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Begin a conversation.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-normal leading-8 text-black/80 md:text-lg">
            For availability, commissions, collectors, collaborations or retail
            conversations, contact the atelier directly. Each enquiry is handled
            personally.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] flex-1 gap-10 px-9 pb-28 md:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="border border-black/15 bg-[#fbfaf7] p-6 md:p-8"
        >
          <div className="mb-6">
            <label className={labelClass}>Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              className={inputClass}
            />
          </div>

          <div className="mb-6">
            <label className={labelClass}>Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className={inputClass}
            />
          </div>

          <div className="mb-6">
            <label className={labelClass}>Enquiry type</label>
            <select name="enquiryType" required className={inputClass}>
              <option>Availability enquiry</option>
              <option>Commission request</option>
              <option>Collector / private enquiry</option>
              <option>Retail / B2B collaboration</option>
              <option>Press / partnership</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-8">
            <label className={labelClass}>Message</label>
            <textarea
              name="message"
              required
              rows={7}
              placeholder="Tell us what you are looking for..."
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="border border-black bg-black px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-white transition hover:bg-transparent hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send enquiry"}
          </button>

          {status === "success" && (
            <p className="mt-5 text-sm leading-relaxed text-black/70">
              Thank you. Your enquiry has been sent to LIGNORAE Atelier.
            </p>
          )}

          {status === "error" && (
            <p className="mt-5 text-sm leading-relaxed text-red-700">
              Something went wrong. Please try again or contact the atelier directly by email.
            </p>
          )}

          <p className="mt-5 text-sm font-normal leading-relaxed text-black/80">
            Your enquiry will be sent directly to LIGNORAE Atelier.
          </p>
        </form>

        <aside className="border border-black/15 bg-[#fbfaf7] p-6 md:p-8">
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/70">
            Direct email
          </p>

          <a
            href="mailto:info@lignorae.com"
            className="text-2xl font-light tracking-[-0.03em] text-black transition hover:opacity-60 md:text-3xl"
          >
            info@lignorae.com
          </a>

          <div className="mt-12 border-t border-black/15 pt-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/70">
              Objects
            </p>

            <p className="text-base font-normal leading-8 text-black/80">
              LIGNORAE fountain pens are prepared in small series. Details on
              material, availability, pricing, delivery and possible commissions
              are discussed before any order is confirmed.
            </p>
          </div>

          <div className="mt-12 border-t border-black/15 pt-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/70">
              Location
            </p>

            <p className="text-base font-normal leading-8 text-black/80">
              LIGNORAE Atelier
              <br />
              Munich, Germany
            </p>
          </div>

          <div className="mt-12 border-t border-black/15 pt-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/70">
              Instagram
            </p>

            <a
              href="https://www.instagram.com/lignorae/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-light tracking-[-0.03em] text-black transition hover:opacity-60 md:text-3xl"
            >
              @Lignorae
            </a>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}
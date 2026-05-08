import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-6xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Contact
        </p>

        <h1 className="mb-8 text-5xl font-light md:text-6xl">
          Request availability
        </h1>

        <p className="mb-12 max-w-3xl text-lg leading-relaxed text-[#d0cabf]">
          The first LIGNORAE edition is currently in preparation. Pre-order
          enquiries are now open for selected writing instruments, commissions,
          collaborations, and retail conversations.
        </p>

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <form className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <div className="mb-6">
              <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-[#4a3522]/70 bg-[#120d09] px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#7f7568] focus:border-[#c6a66a]"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-xl border border-[#4a3522]/70 bg-[#120d09] px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#7f7568] focus:border-[#c6a66a]"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                Enquiry type
              </label>
              <select className="w-full rounded-xl border border-[#4a3522]/70 bg-[#120d09] px-4 py-3 text-[#f5f1e8] outline-none focus:border-[#c6a66a]">
                <option>Pre-order enquiry</option>
                <option>Commission request</option>
                <option>Retail / B2B collaboration</option>
                <option>Press / partnership</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-[#c6a66a]">
                Message
              </label>
              <textarea
                rows={7}
                placeholder="Tell us what you are looking for..."
                className="w-full rounded-xl border border-[#4a3522]/70 bg-[#120d09] px-4 py-3 text-[#f5f1e8] outline-none placeholder:text-[#7f7568] focus:border-[#c6a66a]"
              />
            </div>

            <a
              href="mailto:info@lignorae.com?subject=LIGNORAE%20Enquiry"
              className="inline-block rounded-full border border-[#c6a66a] px-8 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-[#c6a66a] hover:text-black"
            >
              Send enquiry
            </a>

            <p className="mt-5 text-sm leading-relaxed text-[#9f9588]">
              This enquiry form is prepared for launch. Until it is activated,
              please contact the atelier directly by email.
            </p>
          </form>

          <div className="rounded-3xl border border-[#4a3522]/70 bg-[#21170f] p-8">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
              Direct email
            </p>

            <a
              href="mailto:info@lignorae.com"
              className="text-2xl font-light hover:text-[#c6a66a]"
            >
              info@lignorae.com
            </a>

            <div className="mt-10 border-t border-[#4a3522]/70 pt-8">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
                First edition
              </p>

              <p className="leading-relaxed text-[#d0cabf]">
                The first LIGNORAE writing instruments are being prepared in
                small numbers. Early enquiries will be handled personally, with
                details on materials, availability, pricing, and delivery
                discussed before any order is confirmed.
              </p>
            </div>

            <div className="mt-10 border-t border-[#4a3522]/70 pt-8">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c6a66a]">
                Location
              </p>

              <p className="leading-relaxed text-[#d0cabf]">
                LIGNORAE Atelier
                <br />
                Munich, Germany
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f3f0ea] text-[#111111]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f3f0ea]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-[10px] tracking-[0.22em] transition group-hover:border-black">
              LA
            </div>
            <div>
              <p className="text-sm font-light uppercase tracking-[0.42em]">
                LIGNORAE
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.34em] text-black/45">
                Objects of Writing
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 text-[11px] uppercase tracking-[0.32em] text-black/55 md:flex">
            <Link href="/pieces" className="transition hover:text-black">
              Objects
            </Link>
            <Link href="/journal" className="transition hover:text-black">
              Journal
            </Link>
            <Link href="/atelier" className="transition hover:text-black">
              Atelier
            </Link>
            <Link href="/contact" className="transition hover:text-black">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.96)_0%,rgba(243,240,234,0.92)_42%,rgba(219,214,205,0.72)_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-black/5" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#d8d2c8]/70 to-transparent" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="mb-7 text-[11px] uppercase tracking-[0.48em] text-black/45">
              Munich Atelier
            </p>

            <h1 className="max-w-3xl text-5xl font-light leading-[0.95] tracking-[-0.05em] text-[#111111] md:text-7xl lg:text-8xl">
              Objects of Writing.
            </h1>

            <p className="mt-9 max-w-xl text-base font-light leading-8 text-black/58 md:text-lg">
              Sculptural fountain pens and cocoon presentation forms, shaped by
              wood, fire and silence.
            </p>

            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <Link
                href="/contact"
                className="rounded-full border border-black bg-black px-8 py-3 text-[11px] uppercase tracking-[0.28em] text-white transition hover:bg-transparent hover:text-black"
              >
                Request Availability
              </Link>

              <Link
                href="/journal"
                className="rounded-full border border-black/20 px-8 py-3 text-[11px] uppercase tracking-[0.28em] text-black/65 transition hover:border-black hover:text-black"
              >
                Read Journal
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[620px]">
              <div className="absolute left-1/2 top-[53%] h-[28%] w-[42%] -translate-x-1/2 rounded-[999px_999px_120px_120px] bg-[#f8f6f1] shadow-[0_70px_120px_rgba(0,0,0,0.18)]" />

              <div className="absolute left-1/2 top-[39%] h-[30%] w-[54%] -translate-x-1/2 rounded-[58%_42%_54%_46%/48%_52%_48%_52%] bg-[#0b0b0b] shadow-[0_45px_90px_rgba(0,0,0,0.36)]" />
              <div className="absolute left-[31%] top-[42%] h-[20%] w-[13%] rotate-[-14deg] rounded-full bg-white/10 blur-sm" />
              <div className="absolute left-[58%] top-[44%] h-[14%] w-[9%] rotate-[18deg] rounded-full bg-white/8 blur-sm" />

              <div className="absolute left-1/2 top-[29%] h-[9px] w-[68%] -translate-x-1/2 rotate-[-7deg] rounded-full bg-[#080808] shadow-[0_24px_55px_rgba(0,0,0,0.34)]" />
              <div className="absolute left-[19%] top-[28.2%] h-[13px] w-[16%] rotate-[-7deg] rounded-full bg-[#191919]" />
              <div className="absolute right-[16%] top-[27.6%] h-[15px] w-[19%] rotate-[-7deg] rounded-full bg-[#030303]" />
              <div className="absolute right-[13%] top-[25.8%] h-[20px] w-[10%] rotate-[-7deg] rounded-[70%_30%_30%_70%] bg-[#d8d2c8]" />
              <div className="absolute right-[12%] top-[25.2%] h-[22px] w-[6%] rotate-[-7deg] rounded-[80%_20%_20%_80%] border border-black/40 bg-[#f1eee7]" />

              <div className="absolute left-1/2 top-[74%] h-[15px] w-[62%] -translate-x-1/2 rounded-full bg-black/10 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#fbfaf7] px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
          <article className="border-l border-black/15 pl-8">
            <p className="mb-6 text-[11px] uppercase tracking-[0.42em] text-black/40">
              01
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Fire
            </h2>
            <p className="max-w-sm text-sm font-light leading-7 text-black/55">
              Surfaces are darkened, opened and preserved instead of being
              forced into artificial perfection.
            </p>
          </article>

          <article className="border-l border-black/15 pl-8">
            <p className="mb-6 text-[11px] uppercase tracking-[0.42em] text-black/40">
              02
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Form
            </h2>
            <p className="max-w-sm text-sm font-light leading-7 text-black/55">
              Each object is reduced to line, volume and presence: minimal,
              tactile and deliberately quiet.
            </p>
          </article>

          <article className="border-l border-black/15 pl-8">
            <p className="mb-6 text-[11px] uppercase tracking-[0.42em] text-black/40">
              03
            </p>
            <h2 className="mb-5 text-3xl font-light tracking-[-0.04em]">
              Writing
            </h2>
            <p className="max-w-sm text-sm font-light leading-7 text-black/55">
              A fountain pen is treated not as an accessory, but as a sculptural
              object with function.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-[#f3f0ea] px-6 py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/40">
            First Objects
          </p>
          <h2 className="mx-auto max-w-4xl text-4xl font-light leading-tight tracking-[-0.045em] md:text-6xl">
            The first LIGNORAE pieces are being shaped as individual objects,
            not as a standard collection.
          </h2>
          <p className="mx-auto mt-9 max-w-2xl text-base font-light leading-8 text-black/55">
            Availability will remain intentionally limited. Early enquiries are
            reviewed individually from the Munich atelier.
          </p>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-[#f3f0ea] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-[11px] uppercase tracking-[0.28em] text-black/45 md:flex-row md:items-center md:justify-between">
          <p>LIGNORAE — Objects of Writing</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/legal-notice" className="transition hover:text-black">
              Legal Notice
            </Link>
            <Link href="/privacy-policy" className="transition hover:text-black">
              Privacy
            </Link>
            <Link href="/contact" className="transition hover:text-black">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

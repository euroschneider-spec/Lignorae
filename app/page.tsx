import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f3f0ea] text-[#111111]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f3f0ea]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-5">
            <Image
              src="/logo.png"
              alt="LIGNORAE logo"
              width={28}
              height={56}
              priority
              className="h-14 w-auto object-contain opacity-90 transition group-hover:opacity-100"
            />
            <p className="text-[13px] font-light uppercase tracking-[0.55em] text-black/88">
              LIGNORAE
            </p>
          </Link>

          <nav className="hidden items-center gap-12 text-[10px] uppercase tracking-[0.42em] text-black/58 md:flex">
            <Link href="/pieces" className="transition hover:text-black">
              Origin
            </Link>
            <Link href="/pieces" className="transition hover:text-black">
              Sonora
            </Link>
            <Link href="/pieces" className="transition hover:text-black">
              Sacra
            </Link>
            <Link href="/atelier" className="transition hover:text-black">
              About
            </Link>
            <Link href="/journal" className="transition hover:text-black">
              Journal
            </Link>
            <Link href="/contact" className="transition hover:text-black">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative min-h-screen overflow-hidden pt-20">
        <Image
          src="/gallery_landing.jpg"
          alt="LIGNORAE sculptural fountain pen and cocoon presentation form in a white gallery space"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-white/5" />

        <div className="relative z-10 flex min-h-[calc(100vh-80px)] w-full items-end justify-between px-9 pb-8">
          <p className="text-[10px] uppercase tracking-[0.5em] text-black/75 md:text-[11px]">
            Objects of Writing.
          </p>

          <Link
            href="/pieces"
            aria-label="Explore objects"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-black/55 text-[11px] text-black/70 transition hover:border-black hover:text-black"
          >
            +
          </Link>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f7f5f0] px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.48em] text-black/40">
              Sculpted by nature. Designed for presence.
            </p>
            <h1 className="max-w-3xl text-5xl font-light leading-[0.95] tracking-[-0.06em] text-black md:text-7xl">
              Objects of Writing.
            </h1>
          </div>

          <p className="max-w-2xl text-base font-light leading-8 text-black/55 md:text-lg">
            LIGNORAE creates sculptural fountain pens and cocoon presentation
            forms in Munich: quiet objects shaped by wood, fire and proportion.
          </p>
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

      <footer className="border-t border-black/10 bg-[#f7f5f0] px-6 py-10">
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

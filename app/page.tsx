import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#111111]">
      <Header />

      <section className="relative min-h-[100svh] overflow-hidden pt-20">
        <div className="relative mx-auto flex h-[calc(100svh-160px)] min-h-[360px] w-full max-w-[1500px] items-center justify-center overflow-hidden bg-[#f7f5f0] md:min-h-[560px]">
          <Image
            src="/gallery_landing.jpg"
            alt="LIGNORAE sculptural fountain pen and cocoon presentation form in a white gallery space"
            fill
            priority
            sizes="(max-width: 1500px) 100vw, 1500px"
            className="object-contain object-center px-4 md:px-0"
          />
        </div>

        <footer className="absolute inset-x-0 bottom-0 z-10 border-t border-black/10 bg-[#f7f5f0]/94 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 text-[10px] uppercase tracking-[0.36em] text-black/58 md:px-9 md:tracking-[0.42em]">
            <p>Objects of Writing.</p>

            <div className="flex items-center gap-5 md:gap-9">
              <Link href="/legal-notice" className="hidden transition hover:text-black md:inline">
                Legal
              </Link>
              <Link href="/privacy-policy" className="hidden transition hover:text-black md:inline">
                Privacy
              </Link>
              <Link href="/contact" className="hidden transition hover:text-black md:inline">
                Care
              </Link>
              <Link
                href="/collections/forma"
                aria-label="Explore Forma"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-black/55 text-[11px] text-black/70 transition hover:border-black hover:text-black"
              >
                +
              </Link>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}

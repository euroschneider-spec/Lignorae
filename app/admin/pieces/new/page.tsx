import Link from "next/link";
import PieceForm from "./PieceForm";

export default function NewPiecePage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 py-10 text-[#111111]">
      <section className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-black/10 pb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.42em] text-black/45">
              LIGNORAE back-office
            </p>
            <h1 className="mt-4 text-4xl font-light tracking-[-0.04em] text-black md:text-5xl">
              Add piece
            </h1>
          </div>

          <Link
            href="/admin"
            className="border border-black/20 px-5 py-3 text-[10px] uppercase tracking-[0.32em] text-black/60 transition hover:border-black hover:text-black"
          >
            Back
          </Link>
        </div>

        <div className="border border-black/10 bg-[#fbfaf7] p-6 md:p-8">
          <PieceForm />
        </div>
      </section>
    </main>
  );
}
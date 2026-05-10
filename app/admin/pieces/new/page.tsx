import Link from "next/link";
import PieceForm from "./PieceForm";

export default function NewPiecePage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#f5efe3]">
      <section className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#c6a66a]">
              Lignorae back-office
            </p>
            <h1 className="mt-3 text-3xl font-light tracking-[0.08em] text-[#f5efe3] md:text-4xl">
              Add piece
            </h1>
          </div>

          <Link
            href="/admin"
            className="rounded-full border border-[#c6a66a]/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#c6a66a] transition hover:border-[#c6a66a] hover:bg-[#c6a66a] hover:text-black"
          >
            Back
          </Link>
        </div>

        <PieceForm />
      </section>
    </main>
  );
}
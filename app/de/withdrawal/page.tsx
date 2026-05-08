import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WithdrawalPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Right of Withdrawal
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Consumer withdrawal rights
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
          <p className="leading-relaxed">
            Customers located within the European Union may have the right to
            withdraw from eligible distance purchase contracts within 14 days,
            subject to applicable consumer protection regulations.
          </p>

          <p className="leading-relaxed">
            Certain handcrafted, personalized, commissioned, or made-to-order
            products may be excluded from withdrawal rights under applicable law.
          </p>

          <p className="leading-relaxed">
            Detailed withdrawal conditions, procedures, and return instructions
            will be published before the commercial launch of online ordering.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
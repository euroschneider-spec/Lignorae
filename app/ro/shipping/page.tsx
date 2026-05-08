import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShippingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Shipping
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Delivery information
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Individual confirmation
            </h2>

            <p className="leading-relaxed">
              LIGNORAE writing instruments are produced in small numbers.
              Shipping options, delivery times, and costs are confirmed
              individually before an order is finalized.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Packaging
            </h2>

            <p className="leading-relaxed">
              Each writing instrument is prepared and packaged with care,
              according to the nature of the product, material, and destination.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Availability
            </h2>

            <p className="leading-relaxed">
              EU and selected international shipping may be possible after
              individual confirmation. Final shipping conditions will be updated
              before commercial launch.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
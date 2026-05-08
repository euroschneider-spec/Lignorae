import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a130d] text-[#f5f1e8]">
      <Header />

      <section className="mx-auto max-w-4xl flex-1 px-6 py-40">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#c6a66a]">
          Privacy Policy
        </p>

        <h1 className="mb-12 text-5xl font-light md:text-6xl">
          Data protection
        </h1>

        <div className="space-y-10 text-[#d0cabf]">
          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              General information
            </h2>

            <p className="leading-relaxed">
              Protecting personal data is important to LIGNORAE Atelier.
              Personal information submitted through this website is handled
              confidentially and in accordance with applicable data protection
              regulations.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Contact enquiries
            </h2>

            <p className="leading-relaxed">
              When visitors contact the atelier by email or through the prepared
              contact form once activated, submitted information may be stored
              for the purpose of processing the enquiry and future communication.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Hosting and technical data
            </h2>

            <p className="leading-relaxed">
              Technical access data such as browser type, operating system,
              referral source, and access time may be processed automatically by
              the hosting provider for security and technical stability.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              External services
            </h2>

            <p className="leading-relaxed">
              This website currently avoids analytics, marketing trackers, and
              unnecessary cookies whenever possible.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-light text-[#f5f1e8]">
              Future updates
            </h2>

            <p className="leading-relaxed">
              This privacy policy will be expanded and updated as additional
              services, payment systems, forms, or analytics tools are added to
              the website.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
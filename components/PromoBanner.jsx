//edpharma-webshop\components\PromoBanner.jsx
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  const colors = {
    primary: "#8B0035",
    secondary: "#F4C430",
  };

  return (
    <section className="relative w-full h-[520px] overflow-hidden">
      
      {/* Background Image */}
      <img
        src="/promo-bg.jpg"   // put image inside /public
        alt="Pharmaceutical Manufacturing"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(139,0,53,0.92) 0%, rgba(139,0,53,0.75) 40%, rgba(139,0,53,0.3) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Don’t Wait, Exclusive Promotions <br />
            are Available for a Limited Time Only
          </h2>

          <p className="text-white/90 leading-relaxed max-w-xl mb-10">
            ED Pharma delivers globally compliant pharmaceutical
            solutions with assured quality, safety, and reliability.
            Connect with us today to explore special offers.
          </p>

          <button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold shadow-lg transition hover:scale-[1.03]"
            style={{
              backgroundColor: colors.secondary,
              color: "#1F2933",
            }}
          >
            Get Best Price
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>
      </div>
    </section>
  );
}

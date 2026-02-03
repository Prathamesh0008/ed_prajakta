export default function Hero() {
  const colors = {
    primary: "#8B0035",
    secondary: "#F4C430",
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-gray-100">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-[#F4C430]/10 to-[#8B0035]/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Left Content */}
        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#8B0035]" />
            <span className="text-sm font-semibold text-[#8B0035]">
              Trusted Pharmaceutical Solutions
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            Excellence in
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-[#8B0035] via-[#8B0035] to-[#F4C430] bg-clip-text text-transparent">
                Pharmaceutical Care
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="8">
                <defs>
                  <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B0035" />
                    <stop offset="100%" stopColor="#F4C430" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,4 Q20,0 40,4 T80,4 T120,4 T160,4 T200,4 T240,4"
                  stroke="url(#underline-gradient)"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
            ED Pharma delivers high-quality pharmaceutical solutions with 
            global compliance, precision engineering, and uncompromised 
            safety standards for healthcare excellence.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              className="group relative overflow-hidden px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: colors.primary }}
            >
              <span className="relative z-10">Discover Products</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-[#8B0035] to-[#6b0028] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
              />
            </button>

            <button
              className="group relative overflow-hidden px-8 py-4 rounded-full font-semibold border-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              style={{ 
                borderColor: colors.secondary,
                color: colors.primary 
              }}
            >
              <span className="relative z-10">Schedule Consultation</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-[#F4C430]/10 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
              />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B0035]/20 to-[#F4C430]/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#8B0035]">✓</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">ISO Certified</p>
                <p className="text-sm text-gray-600">Global Standards</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B0035]/20 to-[#F4C430]/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#8B0035]">24/7</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Support</p>
                <p className="text-sm text-gray-600">Always Available</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B0035]/20 to-[#F4C430]/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#8B0035]">4.8★</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Rating</p>
                <p className="text-sm text-gray-600">Industry Leader</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image - Clean Version */}
        <div className="relative">
       {/* Hero Image - Clean */}
<div className="relative">
  <div className="w-full h-[480px] rounded-3xl overflow-hidden shadow-2xl group">
    <img
      src="/herobg.jpg"
      alt="Advanced Pharmaceutical Manufacturing"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />
  </div>
</div>

          
          {/* Stats outside the image container */}
          <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
            <div className="bg-gradient-to-r from-[#8B0035] to-[#F4C430] text-white px-6 py-3 rounded-xl shadow-lg">
              <p className="font-bold text-lg">50+</p>
              <p className="text-sm opacity-90">Countries Served</p>
            </div>
            <div className="bg-white border border-gray-200 px-6 py-3 rounded-xl shadow-lg">
              <p className="font-bold text-lg text-[#8B0035]">5000+</p>
              <p className="text-sm text-gray-600">Healthcare Partners</p>
            </div>
            <div className="bg-white border border-gray-200 px-6 py-3 rounded-xl shadow-lg">
              <p className="font-bold text-lg text-[#8B0035]">20+</p>
              <p className="text-sm text-gray-600">Years Experience</p>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}


















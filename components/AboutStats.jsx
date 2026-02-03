export default function AboutStats() {
  const stats = [
    {
      value: "20+",
      label: "Years of Excellence",
      description: "Trusted pharmaceutical experience"
    },
    {
      value: "50+",
      label: "Countries Served",
      description: "Global pharmaceutical solutions"
    },
    {
      value: "5000+",
      label: "Healthcare Partners",
      description: "Trusted by industry leaders"
    },
    {
      value: "99.7%",
      label: "Quality Assurance",
      description: "Product reliability rate"
    }
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/about/stats-image.jpg"
                alt="ED Pharma Manufacturing"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8B0035]/30 to-[#F4C430]/30" />
            </div>
          </div>
          
          {/* Right Column - Stats */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#8B0035]" />
              <span className="text-sm font-semibold text-[#8B0035]">
                By The Numbers
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Our Impact <br />
              <span className="bg-gradient-to-r from-[#8B0035] to-[#F4C430] bg-clip-text text-transparent">
                In Numbers
              </span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-12 leading-relaxed">
              For over two decades, we've been delivering pharmaceutical excellence 
              and building lasting partnerships across the globe.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden p-6 rounded-2xl border border-gray-200 hover:border-transparent transition-all duration-300"
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B0035]/5 to-[#F4C430]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="text-4xl lg:text-5xl font-bold text-[#8B0035] mb-2">
                      {stat.value}
                    </div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
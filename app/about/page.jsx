//edpharma-webshop\app\about\page.jsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutStory from '@/components/AboutStory';
import AboutValues from '@/components/AboutValues';
import AboutStats from '@/components/AboutStats';
import Breadcrumbs from '@/components/Breadcrumb'; // Note: Component name is Breadcrumbs

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      {/* Add Breadcrumbs here with proper structure */}
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about" },
          { name: "Our Story", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-gray-100">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-[#F4C430]/10 to-[#8B0035]/10 blur-3xl" />
          </div>

          <div className="relative w-full px-6 py-16 lg:py-24 flex justify-center">
            {/* Centered content container */}
            <div className="max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 mb-6 justify-center mx-auto">
                <span className="w-2 h-2 rounded-full bg-[#8B0035]" />
                <span className="text-sm font-semibold text-[#8B0035]">
                  About Our Company
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Get to Know The Story <br />
                <span className="bg-gradient-to-r from-[#8B0035] to-[#F4C430] bg-clip-text text-transparent">
                  Behind Our Company
                </span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                ED Pharma delivers high-quality pharmaceutical solutions with global compliance, 
                precision engineering, and uncompromised safety standards for healthcare excellence.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  style={{ backgroundColor: '#8B0035' }}
                >
                  Contact Our Team
                </button>
                <button className="px-6 py-3 rounded-full font-semibold border-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer
                "
                  style={{ 
                    borderColor: '#F4C430',
                    color: '#8B0035'
                  }}
                >
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <AboutStory />
        
        {/* Values Section */}
        <AboutValues />
        
        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-[#8B0035] to-[#6b0028]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of healthcare providers who trust ED Pharma for quality and reliability.
            </p>
            <button className="px-8 py-4 rounded-full bg-white text-[#8B0035] font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              Get in Touch Today
            </button>
          </div>
        </section>
        
        {/* Stats Section */}
        <AboutStats />
      </main>
      
      <Footer />
    </>
  );
}
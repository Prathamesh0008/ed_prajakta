// edpharma-webshop\app\contact\page.jsx
'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb'; // Import Breadcrumbs
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Send } from 'lucide-react';

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Add Breadcrumbs here */}
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
          { name: "Get in Touch", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
  Contact Us
</h1>
<p className="text-base sm:text-lg md:text-xl max-w-3xl opacity-90">

             Have questions or need support? Reach out to our team for guidance on products, orders, or partnerships. ED Pharma is committed to providing reliable, high-quality service.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">

            {/* Left Column - Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-transparent outline-none transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-transparent outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-transparent outline-none transition-all"
                      placeholder="+123 456 7890"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0035] focus:border-transparent outline-none transition-all"
                      placeholder="Your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-semibold rounded-lg hover:from-[#6b0028] hover:to-[#4a001b] transition-all shadow-md hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 border border-gray-200">

                <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {/* Phone */}
               <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">

                    <div className="w-12 h-12 rounded-lg bg-[#8B0035]/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[#8B0035]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Phone Number</h4>
                      <p className="text-xl sm:text-2xl font-bold text-[#8B0035]">
+876 765 665</p>
                      <p className="text-gray-600 text-sm mt-1">Mon-Fri 9AM-6PM</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#8B0035]/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#8B0035]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Email Address</h4>
                      <p className="text-xl font-bold text-gray-800">mail@edpharma.com</p>
                      <p className="text-gray-600 text-sm mt-1">Response within 24 hours</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#8B0035]/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#8B0035]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Location</h4>
                      <p className="text-lg font-bold text-gray-800">London Eye London</p>
                      <p className="text-gray-600 mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus lacinia.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter & Social */}
              <div className="space-y-6">
                {/* Newsletter */}
                <div className="bg-gradient-to-r from-[#8B0035] to-[#6b0028] rounded-2xl shadow-xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                  <p className="mb-4 opacity-90">Subscribe to our newsletter for the latest updates</p>
                  
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                    <div className="flex flex-col sm:flex-row gap-3">

                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                          placeholder="your@email.com"
                          required
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 bg-white text-[#8B0035] font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Subscribe
                        </button>
                      </div>
                    </div>
                    {isSubscribed && (
                      <p className="text-green-300 text-sm animate-pulse">
                        ✓ Successfully subscribed to newsletter!
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-8 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800">Our Location</h3>
            </div>
           <div className="h-64 sm:h-80 md:h-96 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#8B0035]/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-[#8B0035]" />
                </div>
                <p className="text-gray-600">Interactive map would be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">London Eye, London</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
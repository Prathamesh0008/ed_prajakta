import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#8B0035] to-[#6b0028] text-white">
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">EdPharma</h3>
              <span className="text-xs sm:text-sm text-white/70 mb-4">Pharmaceutical Excellence</span>
              
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                Trusted pharmaceutical solutions with global reach,
                WHO-GMP standards, and uncompromised quality.
              </p>

              {/* Social Media */}
              <div className="flex gap-4 mt-6">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-[#F4C430]" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-[#F4C430]" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-[#F4C430]" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-[#F4C430]" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-5">Quick Links</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-sm sm:text-base text-white/80 hover:text-[#F4C430] transition-colors inline-block py-0.5"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-sm sm:text-base text-white/80 hover:text-[#F4C430] transition-colors inline-block py-0.5"
                >
                  Products
                </Link>
              </li>
             
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm sm:text-base text-white/80 hover:text-[#F4C430] transition-colors inline-block py-0.5"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-sm sm:text-base text-white/80 hover:text-[#F4C430] transition-colors inline-block py-0.5"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-5">Customer Service</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm sm:text-base text-white/80 hover:text-[#F4C430] transition-colors inline-block py-0.5"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-sm sm:text-base text-white/80 hover:text-[#F4C430] transition-colors inline-block py-0.5"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  href="/shipping-returns" 
                  className="text-sm sm:text-base text-white/80 hover:text-[#F4C430] transition-colors inline-block py-0.5"
                >
                  Shipping & Returns
                </Link>
              </li>
              {/* <li>
                <Link 
                  href="/order-tracking" 
                  className="text-sm sm:text-base text-white/80 hover:text-[#F4C430] transition-colors inline-block py-0.5"
                >
                  Order Tracking
                </Link>
              </li> */}
              <li>
                <Link 
                  href="/regulatory-info" 
                  className="text-sm sm:text-base text-white/80 hover:text-[#F4C430] transition-colors inline-block py-0.5"
                >
                  Regulatory Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-5">Stay Connected</h4>
            <p className="text-sm text-white/80 mb-4 sm:mb-6 leading-relaxed">
              Subscribe for product updates, regulatory news, and special offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center border border-white/30 rounded-lg overflow-hidden hover:border-white/50 transition-colors">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-3 w-full text-sm bg-transparent placeholder-white/60 outline-none focus:bg-white/5"
                    aria-label="Email for newsletter subscription"
                  />
                  <button 
                    className="bg-[#F4C430] px-4 py-3 hover:bg-[#e3b61f] transition-colors shrink-0"
                    aria-label="Subscribe to newsletter"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B0035]" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
              <p className="text-sm font-medium mb-1">Email Support</p>
              <a 
                href="mailto:support@edpharma.com" 
                className="text-base sm:text-lg font-semibold hover:text-[#F4C430] transition-colors"
              >
                support@edpharma.com
              </a>
              
              <div className="mt-4">
                <p className="text-sm font-medium mb-1">Phone Support</p>
                <a 
                  href="tel:+919876543210" 
                  className="text-base sm:text-lg font-semibold hover:text-[#F4C430] transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-5 sm:py-6 gap-3 sm:gap-0">
            <div className="text-center sm:text-left text-sm text-white/70 order-2 sm:order-1">
              © {new Date().getFullYear()} EdPharma. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 order-1 sm:order-2">
              <Link 
                href="/privacy-policy" 
                className="text-sm text-white/70 hover:text-[#F4C430] transition-colors px-2 py-1"
              >
                Privacy Policy
              </Link>
              <span className="text-white/30 hidden sm:inline">|</span>
              <Link 
                href="/terms-of-service" 
                className="text-sm text-white/70 hover:text-[#F4C430] transition-colors px-2 py-1"
              >
                Terms of Service
              </Link>
              <span className="text-white/30 hidden sm:inline">|</span>
              <Link 
                href="/sitemap" 
                className="text-sm text-white/70 hover:text-[#F4C430] transition-colors px-2 py-1"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
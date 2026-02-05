// app/faq/page.tsx
import Link from "next/link";
import { ChevronDown, HelpCircle, Phone, Mail, Clock } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Products & Orders",
      icon: "💊",
      questions: [
        {
          question: "What types of pharmaceutical products do you offer?",
          answer: "We offer a comprehensive range of pharmaceutical products including generic medicines, branded pharmaceuticals, over-the-counter products, specialty medicines, and healthcare supplements. All our products are manufactured in WHO-GMP certified facilities and comply with global quality standards."
        },
        {
          question: "How can I place an order?",
          answer: "You can place orders through our authorized distributors, partner pharmacies, or by contacting our sales team directly at orders@edpharma.com. For bulk orders and institutional purchases, we have dedicated account managers to assist you."
        },
        {
          question: "What is your order processing time?",
          answer: "Standard orders are processed within 24-48 hours. Express processing (12-24 hours) is available for urgent requirements. Delivery times vary based on location and shipping method selected."
        },
        {
          question: "Do you offer samples for healthcare professionals?",
          answer: "Yes, registered healthcare professionals can request product samples through our healthcare portal or by contacting our medical affairs department. All sample requests are subject to verification and approval."
        }
      ]
    },
    {
      title: "Shipping & Delivery",
      icon: "🚚",
      questions: [
        {
          question: "What are your shipping options and costs?",
          answer: "We offer multiple shipping options: Standard (5-7 business days), Express (2-3 business days), and Priority (1-2 business days). Shipping costs vary based on order value, destination, and urgency. Free shipping is available on orders above ₹10,000."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to over 50 countries worldwide. International shipping times typically range from 7-14 business days, depending on customs clearance. All international shipments comply with local regulatory requirements."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your order using our online tracking portal or by contacting our customer service team."
        },
        {
          question: "What is your return policy for damaged products?",
          answer: "We accept returns for damaged or defective products within 7 days of delivery. Please contact our customer service immediately with photos of the damaged product and packaging. We'll arrange for a replacement or refund as per your preference."
        }
      ]
    },
    {
      title: "Quality & Safety",
      icon: "🛡️",
      questions: [
        {
          question: "Are your products FDA and WHO-GMP approved?",
          answer: "Yes, all our manufacturing facilities are WHO-GMP certified, and many of our products are approved by regulatory authorities including the FDA, EMA, and local health authorities in the countries we operate in."
        },
        {
          question: "How do you ensure product quality?",
          answer: "We follow stringent quality control processes at every stage - from raw material sourcing to manufacturing, packaging, and distribution. Our quality assurance team conducts regular audits and all batches undergo multiple quality checks."
        },
        {
          question: "Do you provide certificates of analysis?",
          answer: "Yes, certificates of analysis (CoA) are available for all our products upon request. These documents provide detailed information about the product's composition, purity, and compliance with specifications."
        },
        {
          question: "How should I store your pharmaceutical products?",
          answer: "Storage instructions vary by product. Please refer to the product packaging or insert for specific storage requirements. Most products should be stored at controlled room temperature (15-30°C), away from direct sunlight and moisture."
        }
      ]
    },
    {
      title: "Business & Partnership",
      icon: "🤝",
      questions: [
        {
          question: "How can I become a distributor or partner?",
          answer: "We welcome inquiries from qualified distributors and partners. Please visit our 'Become a Partner' page or email partnerships@edpharma.com with your company details, experience in pharmaceutical distribution, and territory coverage."
        },
        {
          question: "Do you offer custom manufacturing services?",
          answer: "Yes, we provide contract manufacturing services for pharmaceutical companies. Our state-of-the-art facilities can handle various dosage forms including tablets, capsules, injectables, and topical products."
        },
        {
          question: "What are your payment terms for business clients?",
          answer: "We offer flexible payment terms including net 30, net 45, and LC arrangements for established business partners. New clients typically start with advance payment terms which may be revised based on transaction history."
        },
        {
          question: "Do you have a dealer/stockist program?",
          answer: "Yes, we have an extensive dealer network program with benefits including competitive margins, marketing support, training programs, and inventory management assistance."
        }
      ]
    }
  ];

  const generalQuestions = [
    {
      question: "Are your products suitable for all age groups?",
      answer: "Our product range includes medications suitable for different age groups. However, specific products may have age restrictions. Always consult the product information leaflet and healthcare professional before use, especially for pediatric and geriatric patients."
    },
    {
      question: "Do you have patient assistance programs?",
      answer: "Yes, we offer patient assistance programs for chronic medications. These programs provide financial support to eligible patients. Please contact our patient support team at support@edpharma.com for more information."
    },
    {
      question: "How can I verify if a product is authentic?",
      answer: "All our products come with a unique verification code on the packaging. You can verify authenticity by SMS, scanning the QR code, or visiting our product verification portal on the website."
    },
    {
      question: "Do you provide medication guides and patient information?",
      answer: "Yes, comprehensive patient information leaflets are included with all products. Additional resources are available on our website in the 'Patient Resources' section."
    }
  ];

  return (
    <> 
     <Navbar />
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#8B0035] to-[#6b0028] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full mb-6">
              <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8">
              Find answers to common questions about our products, services, and policies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-[#F4C430] text-[#8B0035] font-semibold rounded-lg hover:bg-[#e3b61f] transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Support
              </a>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select a category to find relevant questions and answers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {faqCategories.map((category, index) => (
              <a
                key={index}
                href={`#${category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-[#8B0035]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#8B0035] transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.questions.length} questions
                </p>
              </a>
            ))}
          </div>

          {/* FAQ Sections */}
          <div className="space-y-16">
            {faqCategories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex} 
                id={category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
                className="scroll-mt-20"
              >
                <div className="flex items-center mb-8">
                  <div className="text-2xl mr-3">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.questions.map((item, index) => (
                    <div 
                      key={index} 
                      className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#8B0035]/30 transition-all duration-300"
                    >
                      <details className="group">
                        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-[#8B0035]/10 flex items-center justify-center mr-4 group-hover:bg-[#8B0035]/20 transition-colors">
                              <HelpCircle className="w-4 h-4 text-[#8B0035]" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900 group-hover:text-[#8B0035] transition-colors">
                              {item.question}
                            </span>
                          </div>
                          <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300 group-open:rotate-180" />
                        </summary>
                        <div className="px-6 pb-6 ml-12">
                          <div className="pt-4 border-t border-gray-100">
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* General Questions */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                General Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Additional questions that might be helpful
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {generalQuestions.map((item, index) => (
                  <div 
                    key={index} 
                    className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#8B0035]/30 transition-all duration-300"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#8B0035]/10 flex items-center justify-center mr-4 group-hover:bg-[#8B0035]/20 transition-colors">
                            <HelpCircle className="w-4 h-4 text-[#8B0035]" />
                          </div>
                          <span className="text-lg font-semibold text-gray-900 group-hover:text-[#8B0035] transition-colors">
                            {item.question}
                          </span>
                        </div>
                        <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-6 ml-12">
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#8B0035] to-[#6b0028] rounded-2xl p-8 sm:p-12 lg:p-16 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Can't find what you're looking for? Our support team is here to help you.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                  <a 
                    href="tel:+919876543210" 
                    className="text-xl font-bold hover:text-[#F4C430] transition-colors"
                  >
                    +91 98765 43210
                  </a>
                  <p className="text-sm text-white/60 mt-2">Mon-Sat, 9AM-6PM</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                  <a 
                    href="mailto:support@edpharma.com" 
                    className="text-xl font-bold hover:text-[#F4C430] transition-colors"
                  >
                    support@edpharma.com
                  </a>
                  <p className="text-sm text-white/60 mt-2">24/7 Support</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Response Time</h3>
                  <p className="text-xl font-bold">Within 24 Hours</p>
                  <p className="text-sm text-white/60 mt-2">For all inquiries</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#F4C430] text-[#8B0035] font-semibold rounded-lg hover:bg-[#e3b61f] transition-colors"
                >
                  Contact Support Team
                </Link>
                <a 
                  href="tel:+919876543210" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Quick Resources
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="/products" 
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#8B0035] hover:text-[#8B0035] transition-colors"
              >
                View Products
              </Link>
              <Link 
                href="/regulatory-info" 
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#8B0035] hover:text-[#8B0035] transition-colors"
              >
                Regulatory Information
              </Link>
              <Link 
                href="/shipping-returns" 
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#8B0035] hover:text-[#8B0035] transition-colors"
              >
                Shipping & Returns
              </Link>
              <Link 
                href="/order-tracking" 
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#8B0035] hover:text-[#8B0035] transition-colors"
              >
                Track Your Order
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}
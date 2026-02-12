// edpharma-webshop\app\services\page.jsx
'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import { 
  Shield, 
  Truck, 
  Globe, 
  Users, 
  Package, 
  Clock, 
  CheckCircle, 
  BarChart,
  FileText,
  Headphones,
  Zap,
  Award,
  Heart
} from 'lucide-react';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('pharmaceutical');

  const services = {
    pharmaceutical: {
      title: "Pharmaceutical Manufacturing",
      description: "World-class manufacturing of ED medications with strict quality control and compliance standards.",
      features: [
        "GMP Certified Manufacturing Facilities",
        "API Sourcing from Trusted Suppliers",
        "Strict Quality Control Protocols",
        "Batch Traceability & Documentation",
        "Regulatory Compliance (FDA, EMA, WHO)",
        "Custom Formulation Development"
      ],
      icon: <Package className="w-8 h-8" />
    },
    distribution: {
      title: "Global Distribution",
      description: "Reliable worldwide distribution network ensuring timely delivery of pharmaceutical products.",
      features: [
        "Worldwide Shipping to 50+ Countries",
        "Temperature-Controlled Logistics",
        "Customs Clearance Support",
        "Real-time Tracking System",
        "Multiple Shipping Options",
        "Return & Exchange Management"
      ],
      icon: <Truck className="w-8 h-8" />
    },
    quality: {
      title: "Quality Assurance",
      description: "Comprehensive quality management system ensuring product safety and efficacy.",
      features: [
        "Third-Party Laboratory Testing",
        "Stability Studies & Shelf Life Analysis",
        "Raw Material Verification",
        "Finished Product Testing",
        "Documentation & Audit Support",
        "Continuous Quality Improvement"
      ],
      icon: <Shield className="w-8 h-8" />
    },
    consulting: {
      title: "Healthcare Consulting",
      description: "Expert consultation services for healthcare providers and pharmaceutical businesses.",
      features: [
        "Regulatory Pathway Consulting",
        "Market Entry Strategy",
        "Product Registration Support",
        "Healthcare Provider Training",
        "Clinical Trial Design Assistance",
        "Pharmacovigilance Services"
      ],
      icon: <Users className="w-8 h-8" />
    }
  };

  return (
    <>
      <Navbar />
      
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Our Solutions", href: null }
        ]}
      />
      
     <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* Main Services Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Core <span className="text-[#8B0035]">Services</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From manufacturing to distribution, we provide comprehensive pharmaceutical solutions with unmatched quality and reliability.
              </p>
            </div>

            {/* Service Tabs */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8">
                {Object.keys(services).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeTab === key
                        ? 'bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {services[key].title}
                  </button>
                ))}
              </div>

              {/* Active Service Details */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="flex flex-col md:flex-row items-start gap-6">

                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#8B0035] to-[#F4C430] flex items-center justify-center text-white">
                    {services[activeTab].icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {services[activeTab].title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {services[activeTab].description}
                    </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      {services[activeTab].features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

              {Object.entries(services).map(([key, service]) => (
                <div
                  key={key}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  {/* <button
                    onClick={() => setActiveTab(key)}
                    className="text-[#8B0035] font-semibold hover:text-[#6b0028] transition-colors"
                  >
                    Learn More →
                  </button> */}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Services */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Specialized <span className="text-[#8B0035]">Solutions</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tailored services for specific pharmaceutical needs and market requirements.
              </p>
            </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

              {[
                {
                  icon: <FileText className="w-8 h-8 text-[#8B0035]" />,
                  title: "Regulatory Compliance",
                  description: "Complete regulatory support for product registration, compliance, and market approvals.",
                  features: ["FDA Submissions", "EMA Compliance", "Local Regulations"]
                },
                {
                  icon: <BarChart className="w-8 h-8 text-[#8B0035]" />,
                  title: "Market Analytics",
                  description: "Data-driven market analysis and competitive intelligence for strategic decisions.",
                  features: ["Market Research", "Competitor Analysis", "Growth Opportunities"]
                },
                {
                  icon: <Headphones className="w-8 h-8 text-[#8B0035]" />,
                  title: "24/7 Customer Support",
                  description: "Round-the-clock technical and customer support for healthcare professionals.",
                  features: ["Technical Assistance", "Order Support", "Medical Inquiries"]
                },
                {
                  icon: <Zap className="w-8 h-8 text-[#8B0035]" />,
                  title: "Expedited Services",
                  description: "Priority processing and accelerated timelines for urgent requirements.",
                  features: ["Fast-track Manufacturing", "Express Shipping", "Priority Support"]
                },
                {
                  icon: <Award className="w-8 h-8 text-[#8B0035]" />,
                  title: "Certification Support",
                  description: "Assistance with quality certifications and industry accreditations.",
                  features: ["GMP Certification", "ISO Standards", "Quality Audits"]
                },
                {
                  icon: <Heart className="w-8 h-8 text-[#8B0035]" />,
                  title: "Patient Support Programs",
                  description: "Comprehensive patient education and support initiatives.",
                  features: ["Patient Education", "Adherence Programs", "Support Materials"]
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#8B0035] to-[#F4C430]" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our <span className="text-[#8B0035]">Service Process</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A streamlined workflow ensuring quality, efficiency, and transparency at every step.
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {/* Timeline Line */}
              <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#8B0035] to-[#F4C430]" />

              
              <div className="space-y-12 lg:space-y-0">
                {[
                  {
                    step: "01",
                    title: "Consultation & Planning",
                    description: "Initial assessment of requirements and strategic planning",
                    icon: <Users className="w-6 h-6" />
                  },
                  {
                    step: "02",
                    title: "Regulatory Review",
                    description: "Compliance verification and regulatory pathway mapping",
                    icon: <Shield className="w-6 h-6" />
                  },
                  {
                    step: "03",
                    title: "Manufacturing & Quality Control",
                    description: "Production with rigorous quality assurance protocols",
                    icon: <Package className="w-6 h-6" />
                  },
                  {
                    step: "04",
                    title: "Packaging & Documentation",
                    description: "Secure packaging and complete documentation preparation",
                    icon: <FileText className="w-6 h-6" />
                  },
                  {
                    step: "05",
                    title: "Distribution & Logistics",
                    description: "Efficient global distribution with real-time tracking",
                    icon: <Truck className="w-6 h-6" />
                  },
                  {
                    step: "06",
                    title: "Post-Service Support",
                    description: "Ongoing support and continuous quality monitoring",
                    icon: <Headphones className="w-6 h-6" />
                  }
                ].map((process, index) => (
                  <div
                    key={index}
                     className={`flex flex-col lg:flex-row items-center lg:items-stretch gap-8 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12'}`}>

                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8B0035] to-[#F4C430] flex items-center justify-center text-white font-bold">
                            {process.step}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{process.title}</h3>
                        </div>
                        <p className="text-gray-600">{process.description}</p>
                      </div>
                    </div>
                    
                    <div className="relative my-4 lg:my-0">
                      <div className="w-12 h-12 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8B0035] to-[#F4C430] flex items-center justify-center text-white">
                          {process.icon}
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-[#8B0035] to-[#6b0028]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Partner With Our Services?
              </h2>
              <p className="text-white/80 text-lg mb-10">
                Join hundreds of healthcare providers and pharmaceutical companies who trust ED Pharma for comprehensive solutions.
              </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">

                <button className="px-8 py-4 rounded-full bg-white text-[#8B0035] font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  Request Service Consultation
                </button>
                <button className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                  Download Service Catalog
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

              {[
                { value: "50+", label: "Countries Served", icon: <Globe className="w-8 h-8" /> },
                { value: "99.7%", label: "Quality Score", icon: <Award className="w-8 h-8" /> },
                { value: "24/7", label: "Support Availability", icon: <Clock className="w-8 h-8" /> },
                { value: "500+", label: "Happy Partners", icon: <Users className="w-8 h-8" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 flex items-center justify-center mx-auto mb-4">
                    <div className="text-[#8B0035]">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
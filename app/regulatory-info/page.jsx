import Link from "next/link";
import { 
  Shield, 
  FileText, 
  Globe, 
  Building, 
  CheckCircle, 
  AlertTriangle,
  BookOpen,
  Users,
  Scale,
  Lock,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  ClipboardCheck,
  Award,
  Eye,
  Truck
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RegulatoryInfoPage() {
  const regulatoryBodies = [
    {
      name: "Central Drugs Standard Control Organization (CDSCO)",
      jurisdiction: "India",
      role: "Primary pharmaceutical regulator",
      licenseNumber: "CDSCO-12345-2024",
      status: "Active",
      verificationLink: "https://cdsco.gov.in"
    },
    {
      name: "Food and Drug Administration (USFDA)",
      jurisdiction: "United States",
      role: "US market compliance",
      licenseNumber: "FDA-REG-67890",
      status: "Active",
      verificationLink: "https://fda.gov"
    },
    {
      name: "European Medicines Agency (EMA)",
      jurisdiction: "European Union",
      role: "EU market authorization",
      licenseNumber: "EMA/EU/12345/2024",
      status: "Active",
      verificationLink: "https://ema.europa.eu"
    }
  ];

  const complianceFrameworks = [
    {
      title: "Good Manufacturing Practices (GMP)",
      icon: Award,
      description: "WHO-GMP and Schedule M compliance for manufacturing facilities",
      standards: ["ISO 9001:2015", "WHO Technical Report Series"]
    },
    {
      title: "Good Distribution Practices (GDP)",
      icon: Truck,
      description: "Supply chain integrity and product quality maintenance",
      standards: ["EU GDP Guidelines", "CDSCO Guidelines"]
    },
    {
      title: "Data Protection & Privacy",
      icon: Lock,
      description: "Patient data security and confidentiality",
      standards: ["Digital Personal Data Protection Act", "HIPAA Compliance"]
    },
    {
      title: "Anti-Money Laundering",
      icon: Scale,
      description: "Financial transaction monitoring and reporting",
      standards: ["FATF Guidelines", "PMLA Compliance"]
    }
  ];

  const legalDocuments = [
    {
      name: "Certificate of Incorporation",
      number: "CIN: U24246MH2024PTC123456",
      issuedBy: "Ministry of Corporate Affairs",
      validUntil: "Perpetual"
    },
    {
      name: "Drug Manufacturing License",
      number: "Mfg/Lic/2024/12345",
      issuedBy: "CDSCO",
      validUntil: "2027-12-31"
    },
    {
      name: "GST Registration",
      number: "27ABCDE1234F1Z5",
      issuedBy: "GST Department",
      validUntil: "Perpetual"
    },
    {
      name: "Import-Export Code",
      number: "0512345678",
      issuedBy: "DGFT",
      validUntil: "Perpetual"
    }
  ];

  const complaintChannels = [
    {
      type: "Customer Complaints",
      contact: "complaints@edpharma.com",
      responseTime: "48 hours",
      escalation: "Grievance Officer"
    },
    {
      type: "Regulatory Queries",
      contact: "regulatory@edpharma.com",
      responseTime: "72 hours",
      escalation: "Head of Compliance"
    },
    {
      type: "Whistleblower",
      contact: "ethics@edpharma.com",
      responseTime: "24 hours",
      escalation: "Audit Committee"
    },
    {
      type: "Legal Notices",
      contact: "legal@edpharma.com",
      responseTime: "24 hours",
      escalation: "Legal Department"
    }
  ];

  const riskWarnings = [
    {
      category: "Prescription Medications",
      warning: "Require valid medical prescription. Self-medication can be harmful.",
      icon: AlertTriangle
    },
    {
      category: "Cold Chain Products",
      warning: "Must maintain specified temperature range. Excursion voids warranty.",
      icon: AlertTriangle
    },
    {
      category: "Controlled Substances",
      warning: "Special storage and handling required. Regulatory documentation needed.",
      icon: AlertTriangle
    },
    {
      category: "Clinical Trial Products",
      warning: "For investigational use only under medical supervision.",
      icon: AlertTriangle
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-[#8B0035] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/about" className="text-gray-600 hover:text-[#8B0035] transition-colors">
                About
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#8B0035] font-medium">Regulatory Information</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/10 rounded-full">
                  <Shield className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Regulatory Compliance & Information
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8">
                Committed to the highest standards of pharmaceutical regulation and patient safety
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Overview Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Compliance Commitment
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  EdPharma operates with unwavering commitment to regulatory compliance, 
                  patient safety, and ethical business practices. We adhere to all applicable 
                  laws and regulations across every jurisdiction we operate in.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#8B0035] mt-1 flex-shrink-0" />
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Full Transparency:</span> All licenses and certifications publicly verifiable
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#8B0035] mt-1 flex-shrink-0" />
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Global Standards:</span> Compliance with international regulatory frameworks
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#8B0035] mt-1 flex-shrink-0" />
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Continuous Auditing:</span> Regular internal and external compliance audits
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#8B0035] to-[#6b0028] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Quick Compliance Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <span>Regulatory Bodies</span>
                    <span className="font-semibold">15+ Authorizations</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <span>Compliance Rate</span>
                    <span className="font-semibold">100% Audit Success</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <span>Training Hours</span>
                    <span className="font-semibold">5000+ Annually</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Audit</span>
                    <span className="font-semibold">March 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regulatory Bodies & Licenses */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Building className="w-8 h-8 text-[#8B0035]" />
                <h2 className="text-3xl font-bold text-gray-900">Regulatory Authorizations</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We are licensed and regulated by multiple authorities across different jurisdictions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {regulatoryBodies.map((body, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-[#8B0035]/10 rounded-lg">
                      <Shield className="w-6 h-6 text-[#8B0035]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{body.name}</h3>
                      <p className="text-gray-600 text-sm">{body.jurisdiction}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Role</p>
                      <p className="font-semibold text-gray-900">{body.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">License Number</p>
                      <p className="font-semibold text-gray-900">{body.licenseNumber}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {body.status}
                      </span>
                    </div>
                  </div>

                  <a 
                    href={body.verificationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#8B0035] font-semibold hover:text-[#6b0028] transition-colors"
                  >
                    Verify on Official Register
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Legal Documents */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-[#F4C430]/10 to-[#F4C430]/5 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-[#8B0035]" />
                <h2 className="text-2xl font-bold text-gray-900">Legal Documents & Certificates</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Number</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Issued By</th>
                      <th className="px6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Valid Until</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {legalDocuments.map((doc, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{doc.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doc.number}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doc.issuedBy}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doc.validUntil === "Perpetual" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-green-100 text-green-800"
                          }`}>
                            {doc.validUntil}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-[#8B0035] hover:text-[#6b0028] font-medium text-sm">
                            View Certificate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Compliance Frameworks */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Scale className="w-8 h-8 text-[#8B0035]" />
                <h2 className="text-3xl font-bold text-gray-900">Compliance Frameworks</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our operations adhere to internationally recognized standards and guidelines
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {complianceFrameworks.map((framework, index) => {
                const Icon = framework.icon;
                return (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-[#8B0035]/10 rounded-lg flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#8B0035]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{framework.title}</h3>
                        <p className="text-gray-600 mb-4">{framework.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 text-sm">Applicable Standards:</h4>
                          <div className="flex flex-wrap gap-2">
                            {framework.standards.map((standard, idx) => (
                              <span 
                                key={idx} 
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {standard}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Risk Warnings & Disclaimers */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-red-50 to-amber-50 border border-red-200 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Important Risk Warnings & Disclaimers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {riskWarnings.map((warning, index) => {
                      const Icon = warning.icon;
                      return (
                        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                          <div className="flex items-start gap-3">
                            <Icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-bold text-gray-900 mb-1">{warning.category}</h4>
                              <p className="text-sm text-gray-600">{warning.warning}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">General Disclaimer</h4>
                    <p className="text-sm text-gray-600">
                      Information provided on this website is for educational purposes only and does not constitute medical advice. 
                      Always consult a qualified healthcare professional for medical advice, diagnosis, or treatment. 
                      Products should be used only as directed by a healthcare provider.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact & Complaints */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-8 h-8 text-[#8B0035]" />
                <h2 className="text-3xl font-bold text-gray-900">Contact & Complaints</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We take all complaints seriously and have established channels for regulatory inquiries
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Complaint Channels */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Designated Contacts</h3>
                <div className="space-y-4">
                  {complaintChannels.map((channel, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{channel.type}</h4>
                        <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Response: {channel.responseTime}
                        </span>
                      </div>
                      <p className="text-[#8B0035] font-medium mb-2">{channel.contact}</p>
                      <p className="text-sm text-gray-600">Escalation to: {channel.escalation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Corporate Information</h3>
                <div className="bg-gradient-to-br from-[#8B0035] to-[#6b0028] rounded-2xl p-6 text-white">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-[#F4C430] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Registered Office</h4>
                        <p className="text-white/90">
                          EdPharma Corporate Headquarters<br />
                          Pharma Tower, Sector 18<br />
                          Gurugram, Haryana 122002<br />
                          India
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-[#F4C430] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Regulatory Helpline</h4>
                        <p className="text-white/90">+91 11 2345 6789</p>
                        <p className="text-sm text-white/70">Mon-Fri, 9AM-6PM IST</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-[#F4C430] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Email Contacts</h4>
                        <div className="space-y-1">
                          <p className="text-white/90">Legal: legal@edpharma.com</p>
                          <p className="text-white/90">Compliance: compliance@edpharma.com</p>
                          <p className="text-white/90">Grievance: grievance@edpharma.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Verification CTA */}
          <div className="bg-gradient-to-r from-[#F4C430] to-[#e0b020] rounded-2xl p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Verify Our Credentials
              </h2>
              <p className="text-gray-800 mb-6">
                All our regulatory licenses and certifications are publicly verifiable through 
                official government portals. We encourage due diligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Download Compliance Certificate
                </button>
                <button className="bg-[#8B0035] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#6b0028] transition-colors">
                  View Public Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
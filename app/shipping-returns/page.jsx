import Link from "next/link";
import { 
  Truck, 
  Clock, 
  Shield, 
  Package, 
  Globe, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  RefreshCw,
  FileText,
  HelpCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShippingReturnsPage() {
  const shippingMethods = [
    {
      name: "Standard Shipping",
      icon: Truck,
      deliveryTime: "3-7 business days",
      cost: "Free on orders over ₹5000",
      features: [
        "Regular handling",
        "Trackable",
        "Signature not required",
        "Weekday delivery"
      ]
    },
    {
      name: "Express Shipping",
      icon: Clock,
      deliveryTime: "1-3 business days",
      cost: "₹500 flat rate",
      features: [
        "Priority handling",
        "Real-time tracking",
        "Signature required",
        "Saturday delivery available"
      ]
    },
    {
      name: "Cold Chain Shipping",
      icon: Shield,
      deliveryTime: "2-5 business days",
      cost: "From ₹1000",
      features: [
        "Temperature-controlled packaging",
        "24/7 temperature monitoring",
        "Special handling",
        "Pharma-grade insulation"
      ]
    }
  ];

  const shippingCountries = [
    { region: "India", delivery: "3-7 days", cost: "Free over ₹5000" },
    { region: "USA & Canada", delivery: "7-14 days", cost: "From $25" },
    { region: "Europe", delivery: "5-10 days", cost: "From €20" },
    { region: "Middle East", delivery: "4-8 days", cost: "From $30" },
    { region: "Asia Pacific", delivery: "7-21 days", cost: "From $20" },
    { region: "Africa", delivery: "10-25 days", cost: "From $35" }
  ];

  const returnPolicyPoints = [
    {
      title: "Damaged Products",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Contact within 48 hours of delivery with photos for replacement."
    },
    {
      title: "Incorrect Items",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "We'll arrange return shipping and send correct items immediately."
    },
    {
      title: "Opened Products",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Cannot be returned due to safety and contamination concerns."
    },
    {
      title: "Temperature Excursion",
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      description: "Report immediately if temperature indicator shows excursion."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Order Processing",
      description: "Orders placed before 2 PM IST are processed same day. Prescription verification may add 24 hours."
    },
    {
      number: "02",
      title: "Quality Check",
      description: "Every product undergoes final quality inspection before packaging."
    },
    {
      number: "03",
      title: "Packaging",
      description: "Pharmaceutical-grade packaging with temperature monitoring where required."
    },
    {
      number: "04",
      title: "Shipping & Tracking",
      description: "Shipped via certified carriers with tracking details sent to your email."
    }
  ];

  const temperatureSensitiveProducts = [
    "Insulin and other injectables",
    "Vaccines",
    "Biologics",
    "Certain antibiotics",
    "Hormone preparations"
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-[#8B0035] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#8B0035] font-medium">Shipping & Returns</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/10 rounded-full">
                <Truck className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Shipping & Returns Policy
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              Reliable pharmaceutical delivery with strict quality control and safety protocols
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
                Pharmaceutical-Grade Shipping
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At EdPharma, we understand the critical importance of proper handling and 
                transportation of pharmaceutical products. Our shipping processes are 
                designed to maintain product integrity from our facility to your doorstep.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#8B0035] mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">WHO-GMP Compliant:</span> All handling follows Good Manufacturing Practices
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-[#8B0035] mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">Temperature Control:</span> Cold chain management for sensitive products
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#8B0035] mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">Global Reach:</span> Shipping to 50+ countries with regulatory compliance
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#8B0035] to-[#6b0028] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Key Shipping Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <span>Processing Time</span>
                  <span className="font-semibold">24-48 hours</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <span>Free Shipping</span>
                  <span className="font-semibold">Orders over ₹5000</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <span>Order Tracking</span>
                  <span className="font-semibold">Email & SMS updates</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Support Hours</span>
                  <span className="font-semibold">24/7 for emergencies</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Methods */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Shipping Methods</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the shipping option that best suits your needs. All methods include proper pharmaceutical handling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-[#8B0035]/10 rounded-lg">
                      <Icon className="w-6 h-6 text-[#8B0035]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{method.name}</h3>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Delivery Time:</span>
                      <span className="font-semibold text-gray-900">{method.deliveryTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-semibold text-gray-900">{method.cost}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Features:</h4>
                    {method.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* International Shipping */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[#F4C430]/10 to-[#F4C430]/5 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-[#8B0035]" />
              <h2 className="text-2xl font-bold text-gray-900">International Shipping</h2>
            </div>
            <p className="text-gray-600 mb-6">
              We handle all customs documentation and regulatory requirements for international shipments. 
              Some countries may have specific import restrictions for pharmaceutical products.
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Region</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Estimated Delivery</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Shipping Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Customs</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shippingCountries.map((country, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{country.region}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{country.delivery}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{country.cost}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          We handle
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Returns Policy */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Returns Policy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Due to the nature of pharmaceutical products, we have strict return policies to ensure patient safety.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Return Conditions */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Return Conditions</h3>
              <div className="space-y-4">
                {returnPolicyPoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <div key={index} className={`p-4 rounded-lg ${point.bgColor} border border-gray-200`}>
                      <div className="flex items-start gap-3">
                        <Icon className={`w-5 h-5 ${point.color} mt-1 flex-shrink-0`} />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{point.title}</h4>
                          <p className="text-gray-600 text-sm">{point.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Return Process */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Return Process</h3>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#8B0035]/10 rounded-full p-3 flex-shrink-0">
                      <span className="text-[#8B0035] font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Contact Support</h4>
                      <p className="text-gray-600">Email support@edpharma.com within 48 hours of delivery</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#8B0035]/10 rounded-full p-3 flex-shrink-0">
                      <span className="text-[#8B0035] font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Provide Documentation</h4>
                      <p className="text-gray-600">Send photos and order details for verification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#8B0035]/10 rounded-full p-3 flex-shrink-0">
                      <span className="text-[#8B0035] font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Return Authorization</h4>
                      <p className="text-gray-600">We'll provide a return authorization if applicable</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#8B0035]/10 rounded-full p-3 flex-shrink-0">
                      <span className="text-[#8B0035] font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Resolution</h4>
                      <p className="text-gray-600">Replacement or refund processed within 5-10 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-red-50 to-amber-50 border border-red-200 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Important Safety Notes</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-semibold">Temperature Monitoring:</span> Check temperature indicators immediately upon receipt. 
                    Report any excursions within 2 hours.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Storage Instructions:</span> Follow storage instructions provided with each product. 
                    Improper storage voids all warranties.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Prescription Products:</span> Prescription medications cannot be returned under any circumstances 
                    due to legal restrictions.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Controlled Substances:</span> Special shipping and handling requirements apply. 
                    Contact us for specific guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-[#8B0035] to-[#6b0028] rounded-2xl p-8 sm:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Need Shipping Assistance?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Our logistics team is available to help with shipping questions, customs clearance, and special handling requests
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 mb-3" />
                <p className="font-semibold">+91 98765 43210</p>
                <p className="text-sm text-white/70">Mon-Sat, 9AM-6PM IST</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 mb-3" />
                <p className="font-semibold">support@edpharma.com</p>
                <p className="text-sm text-white/70">24/7 Emergency Support</p>
              </div>
              <div className="flex flex-col items-center">
                <HelpCircle className="w-8 h-8 mb-3" />
                <Link 
                  href="/faq" 
                  className="font-semibold hover:text-[#F4C430] transition-colors"
                >
                  Visit FAQ
                </Link>
                <p className="text-sm text-white/70">Common questions answered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
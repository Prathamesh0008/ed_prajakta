//components\AboutValues.jsx
import { Target, Users, Award, Shield, Globe, Heart } from "lucide-react";

export default function AboutValues() {
  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Our Mission",
      description: "To provide high-quality pharmaceutical solutions that enhance healthcare outcomes through innovation and precision.",
      color: "from-[#8B0035] to-[#8B0035]"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Our Vision",
      description: "To be a global leader in pharmaceutical manufacturing, setting industry standards for quality and safety.",
      color: "from-[#F4C430] to-[#F4C430]"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description: "Committed to delivering products that meet and exceed international quality standards.",
      color: "from-[#8B0035] to-[#F4C430]"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety First",
      description: "Patient safety and product reliability are at the core of everything we do.",
      color: "from-[#F4C430] to-[#8B0035]"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      description: "Serving healthcare providers in 50+ countries with reliable pharmaceutical solutions.",
      color: "from-[#8B0035] to-[#F4C430]"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Patient Care",
      description: "Dedicated to improving patient outcomes through innovative healthcare solutions.",
      color: "from-[#F4C430] to-[#8B0035]"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#8B0035]" />
            <span className="text-sm font-semibold text-[#8B0035]">
              Our Core Values
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            What We <span className="bg-gradient-to-r from-[#8B0035] to-[#F4C430] bg-clip-text text-transparent">Stand For</span>
          </h2>
          
          <p className="text-gray-600 text-lg">
            These principles guide every decision we make and every product we deliver.
          </p>
        </div>
        
        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`relative z-10 w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${value.color}/10`}>
                <div className={`text-${value.color.split(' ')[0].replace('from-', '')}`}>
                  {value.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              
              {/* Description */}
              <p className="relative z-10 text-gray-600 leading-relaxed">
                {value.description}
              </p>
              
              {/* Bottom line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
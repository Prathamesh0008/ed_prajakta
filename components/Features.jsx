import { Stethoscope, Clock, MessageCircle, Shield, Globe, Award } from "lucide-react";

export default function Features() {
  const colors = {
    primary: "#8B0035",
    secondary: "#F4C430",
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Certified",
      description: "ISO & GMP certified facilities ensuring highest quality standards",
      color: "primary",
      gradient: "from-[#8B0035] to-[#6b0028]",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      description: "Serving 50+ countries with reliable pharmaceutical solutions",
      color: "secondary",
      gradient: "from-[#F4C430] to-[#d4ac0d]",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Industry Leaders",
      description: "20+ years of excellence in pharmaceutical manufacturing",
      color: "white",
      gradient: "from-white to-gray-50",
      textColor: "text-gray-900",
    },
  ];

  return (
    <section className="relative py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Gradient */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-90`}
              />
              
              {/* Content */}
              <div className="relative z-10 p-8 h-full">
                {/* Icon Container */}
                <div className={`
                  w-14 h-14 rounded-xl mb-6 flex items-center justify-center
                  ${feature.color === 'primary' 
                    ? 'bg-white/20 text-white' 
                    : feature.color === 'secondary'
                    ? 'bg-white text-gray-900'
                    : 'bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 text-[#8B0035]'
                  }
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className={`
                  text-xl font-bold mb-3
                  ${feature.color === 'white' ? 'text-gray-900' : 'text-white'}
                `}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className={`
                  ${feature.color === 'white' ? 'text-gray-700' : 'text-white/90'}
                  leading-relaxed
                `}>
                  {feature.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 w-12 h-1 rounded-full bg-gradient-to-r from-white/50 to-transparent" />
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



// //edpharma-webshop\components\Features.jsx
// import { Stethoscope, Clock, MessageCircle } from "lucide-react";

// export default function Features() {
//   const colors = {
//     primary: "#8B0035",
//     secondary: "#F4C430",
//   };

//   return (
//     <section className="relative -mt-3 z-20 w-full">
//       <div className="grid md:grid-cols-3">

//         {/* Card 1 – Maroon */}
//         <div
//           className="p-10 text-white flex flex-col gap-4"
//           style={{ backgroundColor: colors.primary, minHeight: "220px" }}
//         >
//           {/* Icon */}
//           <div className="w-12 h-12 flex items-center justify-center bg-white/15 rounded-md">
//             <Stethoscope className="w-6 h-6 text-white" />
//           </div>

//           <h4 className="font-semibold text-lg">Experienced Therapists</h4>

//           <p className="text-sm opacity-90 max-w-sm">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.
//           </p>
//         </div>

//         {/* Card 2 – Yellow */}
//         <div
//           className="p-10 flex flex-col gap-4"
//           style={{ backgroundColor: colors.secondary, minHeight: "220px" }}
//         >
//           {/* Icon */}
//           <div className="w-12 h-12 flex items-center justify-center bg-white rounded-md">
//             <Clock className="w-6 h-6 text-gray-900" />
//           </div>

//           <h4 className="font-semibold text-lg text-gray-900">
//             24/7 Emergency Services
//           </h4>

//           <p className="text-sm text-gray-800 max-w-sm">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.
//           </p>
//         </div>

//         {/* Card 3 – White */}
//         <div
//           className="p-10 bg-white flex flex-col gap-4"
//           style={{ minHeight: "220px" }}
//         >
//           {/* Icon */}
//           <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md">
//             <MessageCircle className="w-6 h-6 text-gray-800" />
//           </div>

//           <h4 className="font-semibold text-gray-600 text-lg">Get Free Consultation</h4>

//           <p className="text-sm text-gray-600 max-w-sm">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.
//           </p>
//         </div>

//       </div>
//     </section>
//   );
// }

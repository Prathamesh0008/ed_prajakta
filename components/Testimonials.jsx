
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const colors = {
    primary: "#8B0035",
    secondary: "#F4C430",
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-[#8B0035]/5 to-[#F4C430]/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-[#F4C430]/5 to-[#8B0035]/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#8B0035]" />
            <span className="text-sm font-semibold text-[#8B0035]">
              Client Testimonials
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Healthcare
            <br />
            <span className="bg-gradient-to-r from-[#8B0035] to-[#F4C430] bg-clip-text text-transparent">
              Professionals Worldwide
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Join thousands of satisfied healthcare providers who trust ED Pharma for quality and reliability
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Testimonial 1 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <Quote className="absolute top-6 right-6 w-8 h-8 text-[#8B0035]/20" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#8B0035]/20">
                  <img
                    src="/user1.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#8B0035] to-[#F4C430] flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-900">Dr. Catherine Alessia</p>
                <p className="text-sm text-[#8B0035] font-medium">Medical Director</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F4C430] text-[#F4C430]" />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed italic">
              "ED Pharma's products have revolutionized our clinical outcomes. Their commitment to quality and safety is unmatched in the industry."
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <Quote className="absolute top-6 right-6 w-8 h-8 text-[#8B0035]/20" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#8B0035]/20">
                  <img
                    src="/user2.jpg"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#8B0035] to-[#F4C430] flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-900">Edward Giovani</p>
                <p className="text-sm text-[#8B0035] font-medium">Hospital Administrator</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F4C430] text-[#F4C430]" />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed italic">
              "The reliability and consistency of ED Pharma's solutions have significantly improved our operational efficiency. Truly a trusted partner."
            </p>
          </div>

          {/* Rating Box */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-[#8B0035] via-[#8B0035] to-[#6b0028]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F4C430]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 p-8 h-full flex flex-col justify-center">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-transparent mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white">4.8</div>
                    <div className="flex justify-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F4C430] text-[#F4C430]" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  Excellence Recognized
                </h3>
                <p className="text-white/80">
                  Industry-leading satisfaction rating
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Quality</span>
                  <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#F4C430] to-[#ffda6b] rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Service</span>
                  <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#F4C430] to-[#ffda6b] rounded-full" style={{ width: '98%' }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Support</span>
                  <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#F4C430] to-[#ffda6b] rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-white/90 text-center text-sm">
                  Trusted by 5000+ healthcare institutions across 50+ countries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// //edpharma-webshop\components\Testimonials.jsx
// import { Star } from "lucide-react";

// export default function Testimonials() {
//   const colors = {
//     primary: "#8B0035",
//     secondary: "#F4C430",
//   };

//   return (
//     <section className="bg-white py-24">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* TOP HEADER */}
//         <div className="grid md:grid-cols-3 gap-12 items-start mb-16">

//           {/* Left small label */}
//           <div className="flex items-center gap-3">
//             <span className="w-3 h-3 rounded-full bg-[#8B0035]" />
//             <span className="text-sm font-semibold text-[#8B0035]">
//               Testimonials
//             </span>
//           </div>

//           {/* Center heading */}
//           <h2 className="md:col-span-1 text-4xl font-extrabold text-gray-900 leading-tight">
//             Trusted Feedback <br /> From Our Customers
//           </h2>

//           {/* Right description */}
//           <p className="text-gray-600 leading-relaxed">
//             ED Pharma is trusted by customers worldwide for quality,
//             safety, and reliability in pharmaceutical solutions.
//           </p>
//         </div>

//         {/* CONTENT */}
//         <div className="grid lg:grid-cols-3 gap-8 items-stretch">

//           {/* Testimonial 1 */}
//           <div className="bg-gray-50 p-10 rounded-xl border">
//             <p className="text-gray-700 leading-relaxed mb-8">
//               ED Pharma products are reliable and effective.
//               Their commitment to safety and quality truly stands out.
//             </p>

//             <div className="flex items-center gap-4">
//               <img
//                 src="/user1.jpg"
//                 alt="Customer"
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//               <div>
//                 <p className="font-semibold text-gray-900">
//                   Catherine Alessia
//                 </p>
//                 <p className="text-sm text-[#8B0035]">Customer</p>
//               </div>
//             </div>
//           </div>

//           {/* Testimonial 2 */}
//           <div className="bg-gray-50 p-10 rounded-xl border">
//             <p className="text-gray-700 leading-relaxed mb-8">
//               Consistent quality and professional service.
//               ED Pharma is our trusted healthcare partner.
//             </p>

//             <div className="flex items-center gap-4">
//               <img
//                 src="/user2.jpg"
//                 alt="Customer"
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//               <div>
//                 <p className="font-semibold text-gray-900">
//                   Edward Giovani
//                 </p>
//                 <p className="text-sm text-[#8B0035]">Customer</p>
//               </div>
//             </div>
//           </div>

//           {/* Rating Box */}
//           <div
//             className="rounded-xl p-10 text-white flex flex-col justify-between"
//             style={{
//               background: `linear-gradient(135deg, ${colors.primary}, #5c0023)`,
//             }}
//           >
//             <div>
//               <div className="flex items-center gap-4 mb-6">
//                 <h3 className="text-6xl font-extrabold">4.5</h3>
//                 <div>
//                   <div className="flex gap-1 mb-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className="w-5 h-5"
//                         fill={colors.secondary}
//                         stroke={colors.secondary}
//                       />
//                     ))}
//                   </div>
//                   <p className="font-semibold">Client Ratings</p>
//                 </div>
//               </div>

//               <p className="opacity-90 leading-relaxed">
//                 Trusted by thousands of customers globally for
//                 safe, effective, and compliant pharmaceutical products.
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

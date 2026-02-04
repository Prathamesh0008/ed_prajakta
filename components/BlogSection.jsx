// edpharma-webshop\components\BlogSection.jsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllBlogPosts } from "@/app/data/blogData";

export default function BlogSection() {
  const colors = {
    primary: "#8B0035",
    secondary: "#F4C430",
  };

  // Get latest 3 blog posts
  const blogPosts = getAllBlogPosts().slice(0, 3);

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="grid md:grid-cols-3 gap-12 items-center mb-16">

          {/* Label */}
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#8B0035]" />
            <span className="text-sm font-semibold text-[#8B0035]">
              Latest Blog & Update
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Stay Updated With <br />
            the Latest Trends & Solutions
          </h2>

          {/* Button */}
          <div className="flex md:justify-end">
            <Link href="/blog">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: colors.primary }}
              >
                All Posts <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* BLOG CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Category Badge */}
              <div className="px-8 pt-8">
                <span className="inline-block px-3 py-1 rounded-full bg-[#8B0035]/10 text-[#8B0035] text-xs font-semibold">
                  {post.category}
                </span>
              </div>

              {/* Image */}
              <div className="h-48 overflow-hidden px-8">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg" />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-semibold text-xl text-gray-900 leading-snug mb-3">
                  {post.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <Link 
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-1 font-semibold hover:gap-2 transition-all duration-300"
                    style={{ color: colors.primary }}
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





// //edpharma-webshop\components\BlogSection.jsx
// import { ArrowRight } from "lucide-react";

// export default function BlogSection() {
//   const colors = {
//     primary: "#8B0035",
//     secondary: "#F4C430",
//   };

//   return (
//     <section className="bg-gray-50 py-24">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* HEADER */}
//         <div className="grid md:grid-cols-3 gap-12 items-center mb-16">

//           {/* Label */}
//           <div className="flex items-center gap-3">
//             <span className="w-3 h-3 rounded-full bg-[#8B0035]" />
//             <span className="text-sm font-semibold text-[#8B0035]">
//               Latest Blog & Update
//             </span>
//           </div>

//           {/* Title */}
//           <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
//             Stay Updated With <br />
//             the Latest Trends & Solutions
//           </h2>

//           {/* Button */}
//           <div className="flex md:justify-end">
//             <button
//               className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow hover:shadow-lg transition"
//               style={{ backgroundColor: colors.primary }}
//             >
//               All Posts <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* BLOG CARDS */}
//         <div className="grid md:grid-cols-3 gap-8">

//           {[
//             {
//               img: "/blog1.jpg",
//               title: "Essential Cleanroom Solutions for Hospitals and Clinics",
//             },
//             {
//               img: "/blog2.jpg",
//               title: "Best Practices for Maintaining a Sterile Environment",
//             },
//             {
//               img: "/blog3.jpg",
//               title: "Building Safer Facilities with Reliable Cleanroom Products",
//             },
//           ].map((post, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-xl overflow-hidden border hover:shadow-xl transition"
//             >
//               {/* Image */}
//               <div className="h-52 overflow-hidden">
//                 <img
//                   src={post.img}
//                   alt={post.title}
//                   className="w-full h-full object-cover hover:scale-105 transition"
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-8">
//                 <h3 className="font-semibold text-lg text-gray-900 leading-snug mb-3">
//                   {post.title}
//                 </h3>

//                 <p className="text-sm text-gray-600 leading-relaxed mb-6">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Suspendisse ut vestibulum eros.
//                 </p>

//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-500">
//                     October 2, 2025 • No comments
//                   </span>

//                   <span
//                     className="flex items-center gap-1 font-semibold"
//                     style={{ color: colors.primary }}
//                   >
//                     Read More <ArrowRight className="w-4 h-4" />
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}

//         </div>
//       </div>
//     </section>
//   );
// }

// edpharma-webshop\app\blog\page.jsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import { Search, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import BlogCard from '@/components/BlogCard';

// Blog data
const blogPosts = [
  {
    id: "essential-cleanroom-solutions",
    title: "Essential Cleanroom Solutions for Hospitals and Clinics",
    excerpt: "Learn about the essential cleanroom solutions required for maintaining sterile environments in healthcare facilities and ensuring patient safety.",
    date: "October 2, 2025",
    readTime: "5 min read",
    category: "Healthcare Solutions",
    image: "/blog1.jpg",
    tags: ["Cleanroom", "Healthcare", "Sterility"]
  },
  {
    id: "maintaining-sterile-environments",
    title: "Best Practices for Maintaining a Sterile Environment",
    excerpt: "Discover the best practices and protocols for maintaining sterile environments in pharmaceutical manufacturing and healthcare settings.",
    date: "September 28, 2025",
    readTime: "7 min read",
    category: "Pharmaceutical",
    image: "/blog2.jpg",
    tags: ["GMP", "Quality Control", "Sterilization"]
  },
  {
    id: "building-safer-facilities",
    title: "Building Safer Facilities with Reliable Cleanroom Products",
    excerpt: "How to build safer healthcare facilities using reliable cleanroom products and proper design principles to prevent contamination.",
    date: "September 20, 2025",
    readTime: "6 min read",
    category: "Facility Management",
    image: "/blog3.jpg",
    tags: ["Facility Design", "Safety", "Compliance"]
  },
  {
    id: "pharmaceutical-innovation",
    title: "Innovations in Pharmaceutical Manufacturing",
    excerpt: "Exploring the latest technological innovations transforming pharmaceutical manufacturing processes and quality assurance.",
    date: "September 15, 2025",
    readTime: "8 min read",
    category: "Innovation",
    image: "/blog4.jpg",
    tags: ["Technology", "Manufacturing", "Innovation"]
  },
  {
    id: "quality-assurance-guide",
    title: "Complete Guide to Pharmaceutical Quality Assurance",
    excerpt: "A comprehensive guide to implementing effective quality assurance protocols in pharmaceutical production facilities.",
    date: "September 10, 2025",
    readTime: "10 min read",
    category: "Quality Control",
    image: "/blog5.jpg",
    tags: ["QA", "Compliance", "Standards"]
  },
  {
    id: "regulatory-compliance",
    title: "Navigating Global Pharmaceutical Regulations",
    excerpt: "Understanding and navigating the complex landscape of global pharmaceutical regulations and compliance requirements.",
    date: "September 5, 2025",
    readTime: "9 min read",
    category: "Regulatory",
    image: "/blog6.jpg",
    tags: ["Regulations", "Compliance", "Global"]
  },
];

const categories = [
  { name: "All Posts", count: 12 },
  { name: "Healthcare Solutions", count: 4 },
  { name: "Pharmaceutical", count: 3 },
  { name: "Quality Control", count: 2 },
  { name: "Regulatory", count: 2 },
  { name: "Innovation", count: 1 },
];

const popularTags = [
  "Cleanroom", "GMP", "Healthcare", "Sterility", "Quality Control",
  "Compliance", "Manufacturing", "Safety", "Technology", "Regulations"
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: "All Articles", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Pharma Insights & Updates
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Stay informed with the latest trends, innovations, and best practices in pharmaceutical manufacturing and healthcare solutions.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles, topics, or keywords..."
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8 sticky top-24">
                {/* Categories */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className="text-gray-700">{category.name}</span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        className="px-3 py-1.5 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-[#8B0035] hover:text-white transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-r from-[#8B0035] to-[#6b0028] rounded-xl shadow-lg p-6 text-white">
                  <h3 className="text-lg font-bold mb-3">Stay Updated</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Get the latest articles and insights delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 outline-none text-sm"
                    />
                    <button className="w-full py-2.5 bg-white text-[#8B0035] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200" />
                    
                    {/* Content */}
                    <div className="p-6">
                      {/* Category & Date */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-[#8B0035]/10 text-[#8B0035] text-xs font-semibold">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                        <a
                          href={`/blog/${post.id}`}
                          className="flex items-center gap-1 text-[#8B0035] font-semibold hover:gap-2 transition-all duration-300"
                        >
                          Read Article <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="px-8 py-3 rounded-lg border-2 border-[#F4C430] text-[#8B0035] font-semibold hover:bg-[#F4C430]/10 transition-all duration-300">
                  Load More Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
// edpharma-webshop\app\blog\[slug]\page.jsx
'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import Image from "next/image";
import { 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Bookmark,
  ArrowLeft,
  Tag,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts } from '@/app/data/blogData';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;
  
  // Get post from data file
  const post = getBlogPostBySlug(slug);
  
  // Get related posts
  const relatedPosts = getRelatedPosts(slug);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  if (!post) {
    return (
      <>
        <Navbar />
        <Breadcrumbs 
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: "Article Not Found", href: null }
          ]}
        />
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
            <a href="/blog" className="text-[#8B0035] font-medium hover:underline">
              ← Back to Blog
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Handle comment submission here
    console.log({ name, email, comment });
    setName('');
    setEmail('');
    setComment('');
  };

  return (
    <>
      <Navbar />
      
      <Breadcrumbs 
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.category, href: `/blog/category/${post.category.toLowerCase()}` },
          { name: "Article", href: null }
        ]}
      />
      
      <main className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-3xl mx-auto px-4">
          {/* Article Container */}
          <article className="bg-white rounded-xl shadow-md border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              {/* Category */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B0035]/10 text-[#8B0035] text-xs font-semibold">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8B0035]/20 to-[#F4C430]/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-[#8B0035]" />
                  </div>
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </div>

           {/* Featured Image */}
<div className="relative h-56 md:h-64 w-full overflow-hidden">
  <Image
    src={post.image}
    alt={post.title}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 768px"
    priority
  />

  {/* Optional gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
</div>

            {/* Content */}
            <div className="p-6">
              <div className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700 text-sm">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs hover:bg-[#8B0035] hover:text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700 mb-2 block">Share:</span>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg bg-gray-100 hover:bg-[#1877F2] hover:text-white transition-colors">
                        <Facebook className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-100 hover:bg-[#1DA1F2] hover:text-white transition-colors">
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-100 hover:bg-[#0A66C2] hover:text-white transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm">
                    <Bookmark className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Back Button */}
          <div className="mt-6">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-[#8B0035] font-medium hover:gap-3 transition-all duration-300 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </a>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Related Articles</h2>
                <a href="/blog" className="text-sm text-[#8B0035] font-medium hover:underline">
                  View All
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPosts.map((related) => (
                  <a
                    key={related.id}
                    href={`/blog/${related.id}`}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="inline-block px-2 py-1 rounded-full bg-[#8B0035]/10 text-[#8B0035] text-xs font-semibold mb-2">
                      {related.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                      {related.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {related.date}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-[#8B0035]" />
              <h2 className="text-lg font-bold text-gray-900">Comments (3)</h2>
            </div>
            
            {/* Comments List */}
            <div className="space-y-4 mb-6">
              {[1, 2, 3].map((commentIdx) => (
                <div key={commentIdx} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <div className="font-medium text-gray-900 text-sm">John Doe</div>
                          <div className="text-xs text-gray-500">2 days ago</div>
                        </div>
                        <button className="text-xs text-[#8B0035] font-medium hover:underline">
                          Reply
                        </button>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Great article! The insights on cleanroom implementation are really helpful.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Leave a Comment</h3>
              <form onSubmit={handleSubmitComment} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    rows="3"
                    placeholder="Your Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B0035] focus:border-[#8B0035] outline-none"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Your email will not be published.
                  </div>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white font-medium rounded-lg hover:shadow transition-all text-sm"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-8 bg-gradient-to-r from-[#8B0035] to-[#6b0028] rounded-xl p-6 text-white">
            <div className="text-center max-w-md mx-auto">
              <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
              <p className="text-sm opacity-90 mb-4">
                Get the latest articles and insights delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 outline-none text-sm"
                />
                <button className="px-4 py-2 bg-white text-[#8B0035] font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  Subscribe
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
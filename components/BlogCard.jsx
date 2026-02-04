// edpharma-webshop\components\BlogCard.jsx
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
          <Link
            href={`/blog/${post.id}`}
            className="flex items-center gap-1 text-[#8B0035] font-semibold hover:gap-2 transition-all duration-300"
          >
            Read Article <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}


//edpharma-webshop\components\ProductCard.jsx (updated)
'use client';
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { useState } from "react";
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { useWishlist } from '@/app/context/WishlistContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';



export default function ProductCard({ product }) {
  const router = useRouter();
const { isAuthenticated } = useAuth();

const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

const liked = isInWishlist(product.id);

  const [isHovered, setIsHovered] = useState(false);
  const { addToCart , user } = useCart();

  return (
    <div 
      className="group bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {/* Product Image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#8B0035]/5 to-[#F4C430]/5" />
        <div 
          className="absolute inset-0 bg-gray-300 transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${product.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {(product.tags || []).map((tag, index) => {
            let bgColor = "#E5E7EB";
            let textColor = "#1F2933";

            if (tag === "Best Seller") {
              bgColor = "#F4C430";
              textColor = "#1F2933";
            } else if (tag === "New") {
              bgColor = "#8B0035";
              textColor = "#ffffff";
            } else if (tag === "Featured") {
              bgColor = "#22C55E";
              textColor = "#ffffff";
            } else if (tag === "WHO-GMP") {
              bgColor = "#3B82F6";
              textColor = "#ffffff";
            } else if (tag === "High Demand") {
              bgColor = "#F97316";
              textColor = "#ffffff";
            }

            return (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-semibold shadow"
                style={{ backgroundColor: bgColor, color: textColor }}
              >
                {tag}
              </span>
            );
          })}
        </div>
        
        {/* Action Buttons */}
        <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
         <button
  onClick={(e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push(`/auth/signin?redirect=/products/${product.id}`);
      return;
    }

    liked
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  }}
  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
>
  <Heart
    className={`w-5 h-5 transition-colors ${
      liked
        ? 'fill-[#8B0035] text-[#8B0035]'
        : 'text-gray-600 hover:text-[#8B0035]'
    }`}
  />
</button>

        <Link href={`/products/${product.id}`}>

            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
              <Eye className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
        </div>
        
        {/* Quick Add to Cart */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
    <button
  disabled={!product.inStock}
  onClick={(e) => {
    e.stopPropagation(); // prevent card click

    if (!product.inStock) return;

    if (!isAuthenticated) {
      router.push(`/auth/signin?redirect=/products/${product.id}`);
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1,
      description: product.description
    });

 
  }}
  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all
    ${product.inStock
      ? "bg-gradient-to-r from-[#8B0035] to-[#6b0028] text-white"
      : "bg-gray-400 text-white cursor-not-allowed"
    }`}
>
  <ShoppingCart className="w-5 h-5" />
  {product.inStock ? "Add to Cart" : "Out of Stock"}
</button>



        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-[#8B0035] bg-[#8B0035]/10 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-[#8B0035] transition-colors">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Features */}
        <div className="mb-4">
          {(product.features || []).slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#8B0035] to-[#F4C430]" />
              <span className="text-xs text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Price & Rating */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-[#8B0035]">€{Number(product.price || 0).toFixed(2)}</div>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#F4C430] text-[#F4C430]' : 'fill-gray-300 text-gray-300'}`}
                />
              ))}
              <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
            </div>
          </div>
          
          {/* View Details */}
          <Link href={`/products/${product.id}`}>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#8B0035]/10 to-[#F4C430]/10 text-[#8B0035] font-semibold text-sm hover:from-[#8B0035]/20 hover:to-[#F4C430]/20 transition-all group-hover:bg-gradient-to-r group-hover:from-[#8B0035] group-hover:to-[#F4C430] group-hover:text-white">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}







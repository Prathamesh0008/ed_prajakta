//edpharma-webshop\components\AboutSection.jsx
'use client';

export default function AboutSection({ title, description, image, reverse }) {
  return (
    <section className={`py-16 ${reverse ? 'bg-[#F4C430]/10' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className={`${reverse ? 'order-2' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-[#8B0035] mb-6">{title}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
        </div>

        {/* Image */}
        {image && (
          <div className={`${reverse ? 'order-1' : ''}`}>
            <img 
              src={image} 
              alt={title} 
              className="w-full rounded-3xl shadow-lg object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}

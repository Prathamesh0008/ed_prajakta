// edpharma-webshop\app\data\blogData.js
export const blogPosts = {
  "essential-cleanroom-solutions": {
    id: "essential-cleanroom-solutions",
    title: "Essential Cleanroom Solutions for Hospitals and Clinics",
    excerpt: "Learn about the essential cleanroom solutions required for maintaining sterile environments in healthcare facilities.",
    date: "October 2, 2025",
    readTime: "5 min read",
    category: "Healthcare Solutions",
    author: "Dr. Sarah Johnson",
    authorRole: "Healthcare Consultant",
    image: "/blog1.jpg",
    tags: ["Cleanroom", "Healthcare", "Sterility", "Infection Control"],
    content: `
      <h2>Introduction to Cleanroom Solutions</h2>
      <p>In today's healthcare landscape, maintaining sterile environments is crucial for patient safety and treatment efficacy. Cleanroom solutions play a vital role in preventing infections and ensuring optimal healthcare delivery.</p>
      
      <h2>Key Cleanroom Components</h2>
      <p>Effective cleanroom systems consist of several essential components:</p>
      <ul>
        <li><strong>HEPA Filtration Systems:</strong> High-efficiency particulate air filters that remove 99.97% of airborne particles</li>
        <li><strong>Airflow Control Systems:</strong> Maintain positive pressure to prevent contamination</li>
        <li><strong>Sterile Surfaces:</strong> Non-porous materials that are easy to clean and disinfect</li>
        <li><strong>Monitoring Equipment:</strong> Continuous environmental monitoring systems</li>
      </ul>
      
      <h2>Implementation Best Practices</h2>
      <p>Successful cleanroom implementation requires careful planning and execution:</p>
      <ol>
        <li>Conduct thorough risk assessments</li>
        <li>Design appropriate airflow patterns</li>
        <li>Implement strict access control protocols</li>
        <li>Train staff on proper cleanroom procedures</li>
        <li>Establish regular maintenance schedules</li>
      </ol>
      
      <h2>Benefits for Healthcare Facilities</h2>
      <p>Proper cleanroom implementation offers numerous benefits:</p>
      <ul>
        <li>Reduced infection rates</li>
        <li>Improved patient outcomes</li>
        <li>Compliance with regulatory standards</li>
        <li>Enhanced reputation for quality care</li>
        <li>Cost savings through reduced complications</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Investing in proper cleanroom solutions is essential for modern healthcare facilities. By implementing comprehensive cleanroom systems, hospitals and clinics can significantly improve patient safety and treatment quality while maintaining regulatory compliance.</p>
    `,
    relatedPosts: [
      {
        id: "maintaining-sterile-environments",
        title: "Best Practices for Maintaining a Sterile Environment",
        date: "September 28, 2025",
        category: "Pharmaceutical"
      },
      {
        id: "building-safer-facilities",
        title: "Building Safer Facilities with Reliable Cleanroom Products",
        date: "September 20, 2025",
        category: "Facility Management"
      }
    ]
  },
  
  "maintaining-sterile-environments": {
    id: "maintaining-sterile-environments",
    title: "Best Practices for Maintaining a Sterile Environment",
    excerpt: "Discover the best practices and protocols for maintaining sterile environments in pharmaceutical settings.",
    date: "September 28, 2025",
    readTime: "7 min read",
    category: "Pharmaceutical",
    author: "Dr. Michael Chen",
    authorRole: "Pharmaceutical Quality Specialist",
    image: "/blog2.jpg",
    tags: ["GMP", "Quality Control", "Sterilization", "Compliance"],
    content: `
      <h2>The Importance of Sterile Environments</h2>
      <p>Sterile environments are critical in pharmaceutical manufacturing to prevent contamination and ensure product safety. This article explores best practices for maintaining these environments.</p>
      
      <h2>Key Practices for Sterility Maintenance</h2>
      <ul>
        <li><strong>Regular Environmental Monitoring:</strong> Continuous monitoring of air quality and surface cleanliness</li>
        <li><strong>Proper Personnel Training:</strong> Comprehensive training on aseptic techniques</li>
        <li><strong>Equipment Validation:</strong> Regular validation of sterilization equipment</li>
        <li><strong>Documentation Protocols:</strong> Meticulous record-keeping of all sterility procedures</li>
      </ul>
      
      <h2>Challenges and Solutions</h2>
      <p>Maintaining sterility presents several challenges, including personnel contamination, equipment failure, and environmental factors. Implementing robust quality systems can address these issues effectively.</p>
    `,
    relatedPosts: [
      {
        id: "essential-cleanroom-solutions",
        title: "Essential Cleanroom Solutions for Hospitals and Clinics",
        date: "October 2, 2025",
        category: "Healthcare Solutions"
      },
      {
        id: "quality-assurance-guide",
        title: "Complete Guide to Pharmaceutical Quality Assurance",
        date: "September 10, 2025",
        category: "Quality Control"
      }
    ]
  },
  
  "building-safer-facilities": {
    id: "building-safer-facilities",
    title: "Building Safer Facilities with Reliable Cleanroom Products",
    excerpt: "How to build safer healthcare facilities using reliable cleanroom products and proper design principles.",
    date: "September 20, 2025",
    readTime: "6 min read",
    category: "Facility Management",
    author: "Emma Rodriguez",
    authorRole: "Facility Design Expert",
    image: "/blog3.jpg",
    tags: ["Facility Design", "Safety", "Compliance", "Cleanroom"],
    content: `
      <h2>Design Principles for Safe Facilities</h2>
      <p>Building safe healthcare facilities requires careful planning and the right products. This guide covers essential considerations for facility design.</p>
      
      <h2>Essential Cleanroom Products</h2>
      <ul>
        <li>HEPA filtration systems</li>
        <li>Air shower systems</li>
        <li>Sterile workstations</li>
        <li>Environmental monitoring systems</li>
      </ul>
      
      <h2>Design Considerations</h2>
      <p>Proper facility design includes consideration of airflow patterns, material selection, and workflow optimization to ensure safety and efficiency.</p>
    `,
    relatedPosts: [
      {
        id: "essential-cleanroom-solutions",
        title: "Essential Cleanroom Solutions for Hospitals and Clinics",
        date: "October 2, 2025",
        category: "Healthcare Solutions"
      },
      {
        id: "pharmaceutical-innovation",
        title: "Innovations in Pharmaceutical Manufacturing",
        date: "September 15, 2025",
        category: "Innovation"
      }
    ]
  }
};

// Get all blog posts for listing
export const getAllBlogPosts = () => {
  return Object.values(blogPosts);
};

// Get blog post by slug
export const getBlogPostBySlug = (slug) => {
  return blogPosts[slug] || null;
};

// Get related blog posts
export const getRelatedPosts = (currentSlug, limit = 2) => {
  const currentPost = blogPosts[currentSlug];
  if (!currentPost) return [];
  
  return currentPost.relatedPosts
    .map(related => blogPosts[related.id])
    .filter(Boolean)
    .slice(0, limit);
};

// Get posts by category
export const getPostsByCategory = (category) => {
  return getAllBlogPosts().filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
};

// Get all categories with counts
export const getAllCategories = () => {
  const posts = getAllBlogPosts();
  const categories = {};
  
  posts.forEach(post => {
    categories[post.category] = (categories[post.category] || 0) + 1;
  });
  
  return Object.entries(categories).map(([name, count]) => ({
    name,
    count
  }));
};
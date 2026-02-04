//edpharma-webshop\app\data\compounds.js
export const COMPOUNDS = {
  "Ajanta Pharma": {
    Sildenafil: [
      "kamagra-gold-50-mg",
      "kamagra-gold-100-mg",
      "kamagra-100mg-oral-jelly-vol1",
      "super-kamagra-oral-jelly",
      "kamagra-polo",
      "kamagra-100mg-chewable-strawberry",
      "kamagra-100mg-chewable-orange",
      "kamagra-100mg-effervescent",
      "kamagra-expo-100m g",
      "lovegra-100mg-oral-jelly",
      "lovegra-100mg",
    ],
    "Vardenafil": [
      "valif-20mg-tablet",
      "valif-20mg-oral-jelly",
    ],
    "Sildenafil & Depoxetine": [
      "super-kamagra-oral-jelly-100-mg",
      "super-kamagra",
    ],
    Tadalafil: [
      "apcalis-sx-20mg-oral-jelly",
      "tadalis-sx-20mg",
      "vidalista-2-5-mg",
      "vidalista-10-mg"
    ],
  },

  "Centurion Remedies": {
    Sildenafil: [
      "cenforce-25mg",
      "cenforce-50mg",
      "cenforce-100mg",
      "cenforce-120mg",
      "cenforce-130mg",
      "cenforce-150mg",
      "cenforce-200mg",
      "cenforce-soft-100",
      "cenforce-fm-100",
      "cenforce-professional",
      "cenforce-oral-jelly-100",
    ],
    "Sildenafil & Depoxetine": [
      "cenforce-d-100-60",
    ],
    "Tadalafil & Dapoxetine": [
      "super-vidalista",
    ],
    "Vardenafil": [
      "vilitra-10mg",
      "vilitra-20mg",
      "vilitra-40mg",
      "vilitra-60",
    ],
    "Vardenafil & Dapoxetine": [
      "super-vilitra",
    ],
    "Flibanserin": [
      "fliban-100",
    ],
    Tadalafil: [
      "vidalista-2-5mg",
      "vidalista-5",
      "vidalista-10",
      "vidalista-20mg",
      "vidalista-40",
      "vidalista-60mg",
      "vidalista-80",
      "vidalista-black-80mg",
      "vidalista-ct-20mg",
      "vidalista-professional",
      "vidalista-5-mg"
    ],
  },

  "Sunrise Remedies": {
    Avanafil: [
      "avana-50mg",
      "avana-100",
      "avana-200",
    ],
    "Sildenafil & Duloxetine": [
      "malegra-dxt",
      "malegra-dxt-plus",
    ],
    "Sildenafil & Fluoxetine": [
      "malegra-fxt",
      "malegra-fxt-plus",
    ],
    "Sildenafil": [
      "p-force-100-caps",
      "p-force-fort",
      "p-force-plus",
      "extra-super-p-force",
      "sildisoft-100",
      "sildisoft-50",
      "malegra-25",
      "malegra-50",
      "malegra-75",
      "malegra-100",
      "malegra-120",
      "malegra-200",
      "malegra100-oral-jelly",
      "malegra-pro-50",
      "malegra-pro-100",
      "malegra100-green",
      "malegra100-gold",
      "chocogra-100",
    ],
    "Sildenafil Effervescent": [
      "malegra-effervescent100mg",
    ],
    "Cream": [
      "penon-cream",
      "naron-cream",
      "grafix-cream",
      "femallegra-100",
    ],
    "Sildenafil & Dapoxetine": [
      "super-p-force-oral-jelly",
      "super-p-force",
    ],
    "Tadalafil": [
      "tadarise-2-5",
      "tadarise-5",
      "tadarise-10",
      "tadarise-pro-20",
      "tadarise-20",
      "tadarise-20-oral-jelly",
      "tadarise-40",
      "tadarise-pro-40",
      "tadarise-60",
      "tadarise-effervescent",
      "tadasoft-20",
      "tadasoft-40",
      "tadafem-20",
      "clofi-25",
      "chocolis-20",
    ],
    "Clomiphene": [
      "clofi-50",
      "clofi-100",
    ],
    "Udenafil": [
      "zudena-100",
      "zudena-200",
    ],
    "Udenafil & Dapoxetine": [
      "super-zudena",
    ],
    "Ivermectin": [
      "iversun-6",
      "iversun-12",
    ],
    "Cinacalcet": [
      "cinasun-30",
      "cinasun-60",
      "cinasun-90",
    ],
    "Tadalafil & Dapoxetine": [
      "super-tadarise",
      "extra-super-tadarise",
      "top-tadarise"
    ],
    "Dapoxetine": [
      "poxet-30",
      "poxet-60",
      "poxet-90",
    ],
    "Avanafil & Dapoxetine": [
      "top-avana",
      "super-avana",
      "extra-super-avana",
    ],
    "Vardenafil": [
      "zhewitra-10",
      "zhewitra-20",
      "zhewitra-20-oral-jelly",
      "zhewitra-40",
      "zhewitra-60",
      "zhewitra-soft-20"
    ],
    "Vardenafil & Dapoxetine": [
      "super-zhewitra",
      "extra-super-zhewitra",
    ],
    "Orlistat": [
      "orlisun",
    ],
    "Modafinil": [
      "modafresh-200",
    ],
    "Pirfenidone": [
      "pirfisun-tablet"
    ]
  },
};

// Helper function to generate default product details
const generateProductDetails = (slug, manufacturer, compound) => {
  const slugLower = slug.toLowerCase();
  let name = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  let price = 19.99;
  let rating = 4.5;
  let stock = Math.floor(Math.random() * 50) + 10;
  let description = "";
  let dosage = "";
  let packageSize = "10 tablets";
  let form = "Tablet";
  
  // Determine form based on slug
  if (slugLower.includes('oral-jelly') || slugLower.includes('jelly')) {
    form = "Oral Jelly";
    packageSize = "10 sachets";
  } else if (slugLower.includes('cream')) {
    form = "Cream";
    packageSize = "30g tube";
  } else if (slugLower.includes('effervescent')) {
    form = "Effervescent Tablet";
  } else if (slugLower.includes('chewable')) {
    form = "Chewable Tablet";
  } else if (slugLower.includes('caps')) {
    form = "Capsules";
  }
  
  // Determine dosage from slug
  const dosageMatch = slugLower.match(/(\d+)(mg|m g| g)/);
  if (dosageMatch) {
    dosage = dosageMatch[1] + (dosageMatch[2].includes('mg') ? 'mg' : 'g');
  } else {
    dosage = "As prescribed";
  }
  
  // Generate price based on compound and dosage
  if (compound.includes('Sildenafil')) {
    price = dosage.includes('100') ? 22.99 : dosage.includes('50') ? 15.99 : 18.99;
    description = `${dosage} ${form} containing Sildenafil Citrate for erectile dysfunction treatment.`;
  } else if (compound.includes('Tadalafil')) {
    price = dosage.includes('20') ? 32.99 : dosage.includes('10') ? 28.99 : 24.99;
    description = `${dosage} ${form} containing Tadalafil for erectile dysfunction with long-lasting effectiveness.`;
  } else if (compound.includes('Vardenafil')) {
    price = dosage.includes('20') ? 29.99 : 24.99;
    description = `${dosage} ${form} containing Vardenafil HCl for erectile dysfunction treatment.`;
  } else if (compound.includes('Avanafil')) {
    price = dosage.includes('100') ? 34.99 : 29.99;
    description = `${dosage} ${form} containing Avanafil for rapid-onset erectile dysfunction treatment.`;
  } else if (compound.includes('Dapoxetine')) {
    price = dosage.includes('60') ? 36.99 : 29.99;
    description = `${dosage} ${form} containing Dapoxetine for premature ejaculation treatment.`;
  } else if (compound.includes('Clomiphene')) {
    price = 25.99;
    description = `${dosage} ${form} containing Clomiphene Citrate for ovulation induction.`;
  } else if (compound.includes('Ivermectin')) {
    price = 18.99;
    description = `${dosage} ${form} containing Ivermectin for antiparasitic treatment.`;
  } else if (compound.includes('Flibanserin')) {
    price = 39.99;
    description = `${dosage} ${form} containing Flibanserin for hypoactive sexual desire disorder in women.`;
  } else if (compound.includes('Modafinil')) {
    price = 42.99;
    description = `${dosage} ${form} containing Modafinil for promoting wakefulness.`;
  } else {
    description = `${dosage} ${form} containing ${compound} for therapeutic use.`;
  }
  
  // Generate rating
  rating = 4.0 + (Math.random() * 1.0);
  rating = Math.round(rating * 10) / 10;
  
  return {
    name,
    price,
    rating,
    stock,
    description,
    dosage,
    package: packageSize,
    manufacturer,
    compound,
    form
  };
};

// Helper function to get product details
export const getProductDetails = (slug) => {
  // Find which manufacturer and compound this slug belongs to
  let manufacturer = "";
  let compound = "";
  
  for (const [man, compounds] of Object.entries(COMPOUNDS)) {
    for (const [comp, products] of Object.entries(compounds)) {
      if (products.includes(slug)) {
        manufacturer = man;
        compound = comp;
        break;
      }
    }
    if (manufacturer) break;
  }
  
  // Generate details based on slug
  return generateProductDetails(slug, manufacturer, compound);
};

// Get product full details with all information
export const getProductFullDetails = (slug) => {
  const basicDetails = getProductDetails(slug);
  
  // Add additional details
  const additionalDetails = {
    specifications: [
      { label: "Dosage Form", value: basicDetails.form },
      { label: "Strength", value: basicDetails.dosage },
      { label: "Pack Size", value: basicDetails.package },
      { label: "Manufacturer", value: basicDetails.manufacturer },
      { label: "Active Ingredient", value: basicDetails.compound },
      { label: "Country of Origin", value: "India" },
      { label: "Storage", value: "Store below 30°C in a dry place" },
      { label: "Shelf Life", value: "24 months from manufacturing date" }
    ],
    benefits: [
      "Manufactured under strict GMP guidelines",
      "Quality tested in certified laboratories",
      "Clinically proven effectiveness",
      "Affordable pricing",
      "Available with prescription",
      "Discreet packaging"
    ],
    features: [
      `Manufacturer: ${basicDetails.manufacturer}`,
      `Active Compound: ${basicDetails.compound}`,
      `Form: ${basicDetails.form}`,
      `Strength: ${basicDetails.dosage}`,
      `Packaging: ${basicDetails.package}`,
      `Shelf Life: 24 months`
    ],
    tags: basicDetails.stock > 40 ? ["In Stock", "Fast Delivery"] : 
          basicDetails.stock > 20 ? ["In Stock"] : ["Limited Stock"],
    reviews: Math.floor(Math.random() * 100) + 50
  };
  
  return {
    ...basicDetails,
    ...additionalDetails
  };
};

// Get all manufacturers
export const getManufacturers = () => Object.keys(COMPOUNDS);

// Get compounds by manufacturer
export const getCompoundsByManufacturer = (manufacturer) => COMPOUNDS[manufacturer] || {};

// Get all products
export const getAllProducts = () => {
  const allProducts = [];
  Object.entries(COMPOUNDS).forEach(([manufacturer, compounds]) => {
    Object.entries(compounds).forEach(([compound, products]) => {
      products.forEach(slug => {
        const details = getProductDetails(slug);
        allProducts.push({
          slug,
          name: details.name,
          manufacturer,
          compound,
          price: details.price,
          rating: details.rating,
          stock: details.stock,
          description: details.description,
          dosage: details.dosage,
          package: details.package,
          form: details.form,
          image: `/products/${slug}.jpg`
        });
      });
    });
  });
  return allProducts;
};

// Get related products (same manufacturer or compound)
export const getRelatedProducts = (slug, limit = 4) => {
  const allProducts = getAllProducts();
  const currentProduct = allProducts.find(p => p.slug === slug);
  
  if (!currentProduct) return [];
  
  // Find products from same manufacturer and/or compound
  const related = allProducts
    .filter(p => p.slug !== slug)
    .filter(p => p.manufacturer === currentProduct.manufacturer || p.compound === currentProduct.compound)
    .slice(0, limit);
  
  // If not enough related products, add some random ones
  if (related.length < limit) {
    const randomProducts = allProducts
      .filter(p => p.slug !== slug && !related.includes(p))
      .sort(() => Math.random() - 0.5)
      .slice(0, limit - related.length);
    
    return [...related, ...randomProducts];
  }
  
  return related;
};

// Search products
export const searchProducts = (query) => {
  const allProducts = getAllProducts();
  const queryLower = query.toLowerCase();
  
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(queryLower) ||
    product.compound.toLowerCase().includes(queryLower) ||
    product.manufacturer.toLowerCase().includes(queryLower) ||
    product.description.toLowerCase().includes(queryLower)
  );
};








// export const COMPOUNDS = {
//   "Ajanta Pharma": {
//     Sildenafil: [
//       "kamagra-gold-50-mg",
//       "kamagra-gold-100-mg",
//       "kamagra-100mg-oral-jelly-vol1",
//       "super-kamagra-oral-jelly",
//       "kamagra-polo",
//       "kamagra-100mg-chewable-strawberry",
//       "kamagra-100mg-chewable-orange",
//       "kamagra-100mg-effervescent",
//       "kamagra-expo-100m g",
//       "lovegra-100mg-oral-jelly",
//       "lovegra-100mg",
//     ],
//     "Vardenafil": [
//       "valif-20mg-tablet",
//       "valif-20mg-oral-jelly",
//     ],
//     "Sildenafil & Depoxetine": [
//       "super-kamagra-oral-jelly-100-mg",
//       "super-kamagra",
//     ],
//     Tadalafil: [
//       "apcalis-sx-20mg-oral-jelly",
//       "tadalis-sx-20mg",
//       "vidalista-2-5-mg",
//       "vidalista-10-mg"
//     ],
//   },

//   "Centurion Remedies": {
//     Sildenafil: [
//       "cenforce-25mg",
//       "cenforce-50mg",
//       "cenforce-100mg",
//       "cenforce-120mg",
//       "cenforce-130mg",
//       "cenforce-150mg",
//       "cenforce-200mg",
//       "cenforce-soft-100",
//       "cenforce-fm-100",
//       "cenforce-professional",
//       "cenforce-oral-jelly-100",
//     ],
//     "Sildenafil & Depoxetine": [
//       "cenforce-d-100-60",
//     ],
//     "Tadalafil & Dapoxetine": [
//       "super-vidalista",
//     ],
//     "Vardenafil": [
//       "vilitra-10mg",
//       "vilitra-20mg",
//       "vilitra-40mg",
//       "vilitra-60",
//     ],
//     "Vardenafil & Dapoxetine": [
//       "super-vilitra",
//     ],
//     "Flibanserin": [
//       "fliban-100",
//     ],
//     Tadalafil: [
//       "vidalista-2-5mg",
//       "vidalista-5",
//       "vidalista-10",
//       "vidalista-20mg",
//       "vidalista-40",
//       "vidalista-60mg",
//       "vidalista-80",
//       "vidalista-black-80mg",
//       "vidalista-ct-20mg",
//       "vidalista-professional",
//       "vidalista-5-mg"
//     ],
//   },

//   "Sunrise Remedies": {
//     Avanafil: [
//       "avana-50mg",
//       "avana-100",
//       "avana-200",
//     ],
//     "Sildenafil & Duloxetine": [
//       "malegra-dxt",
//       "malegra-dxt-plus",
//     ],
//     "Sildenafil & Fluoxetine": [
//       "malegra-fxt",
//       "malegra-fxt-plus",
//     ],
//     "Sildenafil": [
//       "p-force-100-caps",
//       "p-force-fort",
//       "p-force-plus",
//       "extra-super-p-force",
//       "sildisoft-100",
//       "sildisoft-50",
//       "malegra-25",
//       "malegra-50",
//       "malegra-75",
//       "malegra-100",
//       "malegra-120",
//       "malegra-200",
//       "malegra100-oral-jelly",
//       "malegra-pro-50",
//       "malegra-pro-100",
//       "malegra100-green",
//       "malegra100-gold",
//       "chocogra-100",
//     ],
//     "Sildenafil Effervescent": [
//       "malegra-effervescent100mg",
//     ],
//     "Cream": [
//       "penon-cream",
//       "naron-cream",
//       "grafix-cream",
//       "femallegra-100",
//     ],
//     "Sildenafil & Dapoxetine": [
//       "super-p-force-oral-jelly",
//       "super-p-force",
//     ],
//     "Tadalafil": [
//       "tadarise-2-5",
//       "tadarise-5",
//       "tadarise-10",
//       "tadarise-pro-20",
//       "tadarise-20",
//       "tadarise-20-oral-jelly",
//       "tadarise-40",
//       "tadarise-pro-40",
//       "tadarise-60",
//       "tadarise-effervescent",
//       "tadasoft-20",
//       "tadasoft-40",
//       "tadafem-20",
//       "clofi-25",
//       "chocolis-20",
//     ],
//     "Clomiphene": [
//       "clofi-50",
//       "clofi-100",
//     ],
//     "Udenafil": [
//       "zudena-100",
//       "zudena-200",
//     ],
//     "Udenafil & Dapoxetine": [
//       "super-zudena",
//     ],
//     "Ivermectin": [
//       "iversun-6",
//       "iversun-12",
//     ],
//     "Cinacalcet": [
//       "cinasun-30",
//       "cinasun-60",
//       "cinasun-90",
//     ],
//     "Tadalafil & Dapoxetine": [
//       "super-tadarise",
//       "extra-super-tadarise",
//       "top-tadarise"
//     ],
//     "Dapoxetine": [
//       "poxet-30",
//       "poxet-60",
//       "poxet-90",
//     ],
//     "Avanafil & Dapoxetine": [
//       "top-avana",
//       "super-avana",
//       "extra-super-avana",
//     ],
//     "Vardenafil": [
//       "zhewitra-10",
//       "zhewitra-20",
//       "zhewitra-20-oral-jelly",
//       "zhewitra-40",
//       "zhewitra-60",
//       "zhewitra-soft-20"
//     ],
//     "Vardenafil & Dapoxetine": [
//       "super-zhewitra",
//       "extra-super-zhewitra",
//     ],
//     "Orlistat": [
//       "orlisun",
//     ],
//     "Modafinil": [
//       "modafresh-200",
//     ],
//     "Pirfenidone": [
//       "pirfisun-tablet"
//     ]
//   },
// }

  

// // Helper function to get product details
// export const getProductDetails = (slug) => {
//   const productMap = {
//     // Ajanta Pharma Products
//     "kamagra-gold-50-mg": { name: "Kamagra Gold 50mg", price: 15.99, rating: 4.8, stock: 45 },
//     "kamagra-gold-100-mg": { name: "Kamagra Gold 100mg", price: 22.99, rating: 4.9, stock: 32 },
//     "kamagra-100mg-oral-jelly-vol1": { name: "Kamagra 100mg Oral Jelly", price: 25.99, rating: 4.7, stock: 28 },
    
//     // Centurion Remedies Products
//     "cenforce-100mg": { name: "Cenforce 100mg", price: 18.99, rating: 4.8, stock: 50 },
//     "vidalista-20mg": { name: "Vidalista 20mg", price: 32.99, rating: 4.9, stock: 25 },
    
//     // Sunrise Remedies Products
//     "malegra-100": { name: "Malegra 100mg", price: 16.99, rating: 4.7, stock: 40 },
//     "tadarise-20": { name: "Tadarise 20mg", price: 28.99, rating: 4.8, stock: 30 },
//     "super-p-force": { name: "Super P-Force", price: 42.99, rating: 4.9, stock: 20 },
    
//     // Default fallback
//     "default": { name: slug, price: 19.99, rating: 4.5, stock: 10 }
//   };
  
//   return productMap[slug] || productMap.default;
// };

// // Get all manufacturers
// export const getManufacturers = () => Object.keys(COMPOUNDS);

// // Get compounds by manufacturer
// export const getCompoundsByManufacturer = (manufacturer) => COMPOUNDS[manufacturer] || {};

// // Get all products
// export const getAllProducts = () => {
//   const allProducts = [];
//   Object.entries(COMPOUNDS).forEach(([manufacturer, compounds]) => {
//     Object.entries(compounds).forEach(([compound, products]) => {
//       products.forEach(slug => {
//         const details = getProductDetails(slug);
//         allProducts.push({
//           slug,
//           name: details.name,
//           manufacturer,
//           compound,
//           price: details.price,
//           rating: details.rating,
//           stock: details.stock
//         });
//       });
//     });
//   });
//   return allProducts;
// };
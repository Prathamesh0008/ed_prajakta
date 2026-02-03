import categoriesData from './categories.json';
import productsData from './products.json';

export const categories = categoriesData.categories;
export const products = productsData.products;

// Helper functions
export function getProductBySlug(slug) {
  return products.find(product => product.slug === slug);
}

export function getProductsByCategory(categoryName) {
  return products.filter(product => product.category === categoryName);
}

export function getFeaturedProducts() {
  return products.filter(product => product.tags?.includes('Featured') || product.tags?.includes('Best Seller'));
}

export function getProductsOnSale() {
  return products.filter(product => product.originalPrice);
}

export function getProductCategories() {
  return categories;
}

export function getCategoryBySlug(slug) {
  return categories.find(category => category.slug === slug);
}
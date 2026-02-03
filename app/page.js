//edpharma-webshop\app\page.js
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogSection";
import PromoBanner from "@/components/PromoBanner";


export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <PromoBanner />
      <BlogSection />
      
      <Footer />
    </>
  );
}

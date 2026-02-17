import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonials from "@/components/home/Testimonials";
import BrandStory from "@/components/home/BrandStory";
import InstagramFeed from "@/components/home/InstagramFeed";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <BrandStory />
      <InstagramFeed />
    </>
  );
}

import Blog from "../components/Blog";
import CTA from "../components/CTA";
import FeatureList from "../components/FeatureList";
import FeatureWithScreenshot from "../components/FeatureWIthScreenshot";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Testimonial from "../components/Testimonial";

export default function Example() {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <Header />
        <main>
          <HeroSection />
          <FeatureWithScreenshot />
          {/* Feature section with grid */}
          <FeatureList />
          <Testimonial />
          <Blog />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}

import FeatureList from "../components/FeatureList";
import FeatureWithScreenshot from "../components/FeatureWIthScreenshot";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

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
          {/* <Testimonial /> */}
          {/* <Blog /> */}
          {/* <CTA /> */}
          <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6  lg:max-w-7xl lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl">
              <span className="block lg:inline">Simple pricing, </span>
              <span className="block underline lg:inline">no hidden fees</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              A single one-time payment to generate as many wallets as you need.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

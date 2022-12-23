import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative  sm:overflow-hidden ">
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-gray-800">Not Your Keys</span>
              <span className="block font-extrabold text-black underline">
                Not Your Coins
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-center text-lg text-gray-600 sm:max-w-3xl">
              Generate unlimited self-custodial wallets with a single click -
              Offline and Online
            </p>
            <div className="flex items-center justify-center">
              <Link href="/app">
                <p className="mt-4 rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Get Started Today
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

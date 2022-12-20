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
            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-3 text-base font-medium text-indigo-700 sm:px-8"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                >
                  Start Your Free Trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

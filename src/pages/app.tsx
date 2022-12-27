import Feed from "../components/Feed";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Metadata from "../components/Metadata";
import { WEBSITE_NAME } from "../constants/seo";

const App = () => {
  return (
    <>
      <Metadata
        title={`Generate unlimited self-custodial wallets today at ${WEBSITE_NAME}`}
        description={`Generate unlimited self-custodial wallets today at ${WEBSITE_NAME}`}
      />
      <Header />
      <div className="mx-auto mt-20 max-w-3xl lg:max-w-5xl">
        <div className="px-4">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Wallet Generator
          </h2>
          <p className="mt-5 text-xl text-gray-500">
            Let&apos;s generate your wallet in a few simple steps
          </p>
        </div>

        <div className="mt-10">
          <Feed />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;

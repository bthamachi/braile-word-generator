import QRCode from "react-qr-code";
import SeedPhraseWord from "./SeedPhraseWord";

type DesktopWalletPDFProps = {
  seedPhrase: string;
};

const DesktopWalletPDF = ({ seedPhrase }: DesktopWalletPDFProps) => {
  return (
    <div
      id="seedPhrase"
      className="grid bg-white px-4 text-black md:grid-cols-3"
    >
      <div className="col-span-2 mx-2 flex grid grid-cols-2 gap-x-4 gap-y-4 bg-white text-black md:mx-10 ">
        {seedPhrase.length > 0 &&
          seedPhrase.split(" ").map((item, idx) => {
            return <SeedPhraseWord index={idx} key={idx} word={item} />;
          })}
      </div>
      <div className="bg-white text-black">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Your Wallet&apos;s Secret Phrase
        </h3>
        <p className="mt-1 mb-10 text-sm text-gray-500">
          Scan this QR Code and set-up your wallet with any provider today - we
          support metamask, bluewallet and more!
        </p>
        <QRCode size={150} value={seedPhrase} />
      </div>
    </div>
  );
};

export default DesktopWalletPDF;

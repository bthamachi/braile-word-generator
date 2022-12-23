import QRCode from "react-qr-code";
import SeedPhraseWord from "./SeedPhraseWord";

type MobileWalletPdfProps = {
  seedPhrase: string;
  wordlist: string[];
};

const MobileWalletPdf = ({ seedPhrase, wordlist }: MobileWalletPdfProps) => {
  return (
    <div className="block bg-white ">
      <div
        id="braille"
        className="col-span-2 mb-10 block flex grid grid-cols-2 gap-x-4 gap-y-4 bg-white px-2 text-black md:mx-10 "
      >
        {seedPhrase.length > 0 &&
          seedPhrase.split(" ").map((item, idx) => {
            return (
              <SeedPhraseWord
                index={idx}
                key={idx}
                word={item}
                wordlist={wordlist}
              />
            );
          })}
      </div>
      <div className="mb-10 block bg-white px-2 text-black" id="secretPhrase">
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

export default MobileWalletPdf;

import { BIP32Interface } from "bip32";
import { ethers } from "ethers";
import { generateImage, generateMobileImage } from "../lib/jspdf";
import DesktopWalletPDF from "./DesktopWalletPDF";
import FeedItem from "./FeedItem";
import MobileWalletPdf from "./MobileWalletPdf";
import QRCodeGenerator from "./QRCodeGenerator";
import SeedPhraseToBraille from "./SeedPhraseToBraille";
import WalletDetails from "./WalletDetails";

type MnemonicDetailsProps = {
  seedPhrase: string;
  ethWallet: ethers.Wallet | undefined;
  btcWallet: BIP32Interface | undefined;
  generatingSeedPhrase: boolean;
};

const MnemonicDetails = ({
  seedPhrase,
  ethWallet,
  btcWallet,
  generatingSeedPhrase,
}: MnemonicDetailsProps) => {
  if (
    seedPhrase.length == 0 ||
    generatingSeedPhrase ||
    !ethWallet ||
    !btcWallet
  ) {
    return null;
  }

  return (
    <>
      <FeedItem
        index={2}
        ctaButtonText={null}
        sectionTitle="Get Generated Wallet Details"
      >
        <WalletDetails ethWallet={ethWallet!} btcWallet={btcWallet!} />
      </FeedItem>
      <FeedItem
        index={3}
        ctaButtonText={null}
        sectionTitle="Set Up Your new Wallet"
      >
        <QRCodeGenerator seedPhrase={seedPhrase} />
      </FeedItem>
      <FeedItem
        index={4}
        ctaButtonText={null}
        sectionTitle="Create your hardware backup using Braille"
      >
        <SeedPhraseToBraille seedPhrase={seedPhrase} />
      </FeedItem>
      <div className="hidden md:block">
        <FeedItem
          index={5}
          ctaButtonText={"Download PDF"}
          sectionTitle="Collated Instructions"
          onClick={() => generateImage()}
        >
          <DesktopWalletPDF seedPhrase={seedPhrase} />
        </FeedItem>
      </div>
      <div className="block md:hidden">
        <FeedItem
          index={5}
          ctaButtonText={"Download PDF"}
          sectionTitle="Collated Instructions"
          onClick={() => generateMobileImage()}
        >
          <MobileWalletPdf seedPhrase={seedPhrase} />
        </FeedItem>
      </div>
    </>
  );
};

export default MnemonicDetails;

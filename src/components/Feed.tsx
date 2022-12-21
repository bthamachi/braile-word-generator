import { BIP32Interface } from "bip32";
import { ethers } from "ethers";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { generateBtcWallet, generateRandomWallet } from "../lib/crypto";
import FeedItem from "./FeedItem";
import QRCodeGenerator from "./QRCodeGenerator";
import SeedPhraseToBraille from "./SeedPhraseToBraille";
import WalletDetails from "./WalletDetails";

const Feed = () => {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [ethWallet, setEthWallet] = useState<ethers.Wallet>();
  const [btcWallet, setBtcWallet] = useState<BIP32Interface>();

  const [generatingSeedPhrase, setGeneratingSeedPhrase] = useState(false);

  const handleMnemonicGeneration = () => {
    setGeneratingSeedPhrase(true);
    const newEthWallet = generateRandomWallet();
    const rawSeedPhrase = newEthWallet._mnemonic().phrase;
    setSeedPhrase(rawSeedPhrase);
    setEthWallet(newEthWallet);

    const newBtcWallet = generateBtcWallet(rawSeedPhrase);
    setBtcWallet(newBtcWallet);

    setTimeout(() => {
      setGeneratingSeedPhrase(false);
      navigator.clipboard.writeText(seedPhrase).then(() => {
        toast.success("Mnemonic copied to clipboard");
      });
    }, 1000);
  };

  return (
    <div className="flow-root">
      <ul role="list" className="">
        <FeedItem
          index={1}
          ctaButtonText={"Generate Seed Phrase"}
          onClick={handleMnemonicGeneration}
          sectionTitle={"Generate Wallet Mnemonic"}
        >
          <div className="mb-10 flex items-center justify-center">
            {seedPhrase.length > 0 && !generatingSeedPhrase ? (
              <div className="text-left">
                <p className="text-md text-gray-500">
                  Your generated mnemonic is
                  <span className="pl-1 underline ">{seedPhrase}</span>
                </p>
              </div>
            ) : null}
            {generatingSeedPhrase ? <ClipLoader /> : null}
          </div>
        </FeedItem>
        {seedPhrase.length > 0 && !generatingSeedPhrase ? (
          <>
            <FeedItem
              index={2}
              ctaButtonText={null}
              sectionTitle="Get Wallet Details"
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
              sectionTitle="Create your hardware backup"
            >
              <SeedPhraseToBraille seedPhrase={seedPhrase} />
            </FeedItem>
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default Feed;

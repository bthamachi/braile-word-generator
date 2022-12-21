import { BIP32Interface } from "bip32";
import { getDefaultWordlist } from "bip39";
import { ethers, wordlists } from "ethers";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { useState } from "react";
import QRCode from "react-qr-code";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { generateBtcWallet, generateRandomWallet } from "../lib/crypto";
import FeedItem from "./FeedItem";
import QRCodeGenerator from "./QRCodeGenerator";
import SeedPhraseToBraille from "./SeedPhraseToBraille";
import SeedPhraseWord from "./SeedPhraseWord";
import WalletDetails from "./WalletDetails";

const Feed = () => {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [ethWallet, setEthWallet] = useState<ethers.Wallet>();
  const [btcWallet, setBtcWallet] = useState<BIP32Interface>();
  const wordlist = wordlists[getDefaultWordlist()];

  const [generatingSeedPhrase, setGeneratingSeedPhrase] = useState(false);

  const generateImage = async () => {
    const doc = new jsPDF("portrait");
    const img = await htmlToImage.toJpeg(
      document.getElementById("seedPhrase")!,
      { quality: 100 }
    );
    doc.addImage(img, "JPEG", 0, 20, 250, 150);
    doc.save("Setup Instructions.pdf");
  };

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
            <FeedItem
              index={5}
              ctaButtonText={"Download PDF"}
              sectionTitle="Collated Instructions"
              onClick={() => generateImage()}
            >
              <div id="seedPhrase" className="flex bg-white text-black">
                <div className="i mx-2 flex grid grid-cols-2 gap-x-4 gap-y-4 object-center md:mx-10 ">
                  {seedPhrase.length > 0 &&
                    seedPhrase.split(" ").map((item, idx) => {
                      return (
                        <SeedPhraseWord
                          index={idx}
                          key={idx}
                          word={item}
                          wordlist={wordlist as string[]}
                        />
                      );
                    })}
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h1>Seed Phrase</h1>
                    <QRCode value={seedPhrase} />
                  </div>
                </div>
              </div>
            </FeedItem>
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default Feed;

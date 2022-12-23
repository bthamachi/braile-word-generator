import { BIP32Interface } from "bip32";

import { getDefaultWordlist, wordlists } from "bip39";

import { ethers } from "ethers";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { generateBtcWallet, generateRandomWallet } from "../lib/crypto";
import { calculateAspectRatioFit } from "../lib/img";
import DesktopWalletPDF from "./DesktopWalletPDF";
import FeedItem from "./FeedItem";
import MobileWalletPdf from "./MobileWalletPdf";
import QRCodeGenerator from "./QRCodeGenerator";
import SeedPhraseToBraille from "./SeedPhraseToBraille";
import WalletDetails from "./WalletDetails";

const Feed = () => {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [ethWallet, setEthWallet] = useState<ethers.Wallet>();
  const [btcWallet, setBtcWallet] = useState<BIP32Interface>();
  const wordlist = wordlists[getDefaultWordlist()];

  const [generatingSeedPhrase, setGeneratingSeedPhrase] = useState(false);

  // TODO: Generate Mobile Image
  const generateMobileImage = async () => {
    const doc = new jsPDF("p", "px", [794, 1123]);
    const height = doc.internal.pageSize.height;
    const width = doc.internal.pageSize.width;

    const secretPhraseColumnElement = document.getElementById("braille")!;
    const secretPhraseImage = await htmlToImage.toJpeg(
      secretPhraseColumnElement,
      {
        quality: 1,
      }
    );
    const secretPhraseWidth = secretPhraseColumnElement.clientWidth;
    const secretPhraseHeight = secretPhraseColumnElement.clientHeight;

    const { width: newWidth, height: newHeight } = calculateAspectRatioFit(
      secretPhraseWidth!,
      secretPhraseHeight!,
      300,
      900
    );

    const QRCodeElement = document.getElementById("secretPhrase")!;
    const QRCodeElementImage = await htmlToImage.toJpeg(QRCodeElement, {
      quality: 1,
    });

    const QRCodeElementWidth = QRCodeElement.clientWidth;
    const QRCodeElementHeight = QRCodeElement.clientHeight;

    const { width: newQRWidth, height: newQRHeight } = calculateAspectRatioFit(
      QRCodeElementWidth!,
      QRCodeElementHeight!,
      300,
      300
    );

    const gap = 20;
    const combinedWidth = newQRWidth + newWidth + gap;
    const startX = Math.floor((width - combinedWidth) / 2);

    const longerElement = Math.max(newQRHeight, newHeight);
    const startY = Math.floor((height - longerElement) / 2);

    doc.addImage(secretPhraseImage, startX, startY, newWidth, newHeight);
    doc.addImage(
      QRCodeElementImage,
      startX + newWidth + gap,
      startY,
      newQRHeight,
      newQRWidth
    );

    doc.save("Setup Instructions.pdf");
  };

  const generateImage = async () => {
    const doc = new jsPDF("p", "px", [794, 1123]);
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    const img = await htmlToImage.toJpeg(
      document.getElementById("seedPhrase")!,
      {
        quality: 1,
      }
    );

    const originalImageSize = document.getElementById("seedPhrase");
    const imageWidth = originalImageSize?.clientWidth;
    const imageHeight = originalImageSize?.clientHeight;

    const { width: newWidth, height: newHeight } = calculateAspectRatioFit(
      imageWidth!,
      imageHeight!,
      700,
      700
    );

    const startX = Math.floor((width - newWidth) / 2);
    const starty = Math.floor((height - newHeight) / 2);

    doc.addImage(img, "JPEG", startX, starty, newWidth, newHeight);
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
    <div className="">
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
            <div className="hidden md:block">
              <FeedItem
                index={5}
                ctaButtonText={"Download PDF"}
                sectionTitle="Collated Instructions"
                onClick={() => generateImage()}
              >
                <DesktopWalletPDF
                  seedPhrase={seedPhrase}
                  wordlist={wordlist as string[]}
                />
              </FeedItem>
            </div>
            <div className="block md:hidden">
              <FeedItem
                index={5}
                ctaButtonText={"Download PDF"}
                sectionTitle="Collated Instructions"
                onClick={() => generateMobileImage()}
              >
                <MobileWalletPdf
                  seedPhrase={seedPhrase}
                  wordlist={wordlist as string[]}
                />
              </FeedItem>
            </div>
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default Feed;

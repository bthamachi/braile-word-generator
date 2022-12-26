import { BIP32Interface } from "bip32";

import { getDefaultWordlist, wordlists } from "bip39";

import { ethers } from "ethers";

import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { generateBtcWallet, generateRandomWallet } from "../lib/crypto";
import FeedItem from "./FeedItem";
import MnemonicDetails from "./MnemonicDetails";

const Feed = () => {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [ethWallet, setEthWallet] = useState<ethers.Wallet>();
  const [btcWallet, setBtcWallet] = useState<BIP32Interface>();
  const wordlist = wordlists[getDefaultWordlist()];

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
    <div className="">
      <ul role="list" className="px-2">
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
        <MnemonicDetails
          seedPhrase={seedPhrase}
          ethWallet={ethWallet}
          btcWallet={btcWallet}
          generatingSeedPhrase={generatingSeedPhrase}
        />
      </ul>
    </div>
  );
};

export default Feed;

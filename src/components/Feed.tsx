import { BIP32Interface } from "bip32";

import { ethers } from "ethers";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  generateBtcWallet,
  generateRandomWallet,
  validateSeedPhrase,
} from "../lib/crypto";
import FeedItem from "./FeedItem";
import MnemonicDetails from "./MnemonicDetails";
import SeedPhraseInput from "./SeedPhraseInput";
import SwitchToggle from "./SwitchToggle";

const Feed = () => {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [ethWallet, setEthWallet] = useState<ethers.Wallet>();
  const [btcWallet, setBtcWallet] = useState<BIP32Interface>();
  const [userProvidingSeedPhrase, setUserProvidingSeedPhrase] =
    useState<boolean>(false);
  const [error, setError] = useState("");

  const [generatingSeedPhrase, setGeneratingSeedPhrase] = useState(false);

  const handleUserInputSeedPhrase = () => {
    setGeneratingSeedPhrase(true);

    if (!validateSeedPhrase(seedPhrase)) {
      setError("Invalid Seed Phrase entered");
      toast.warning("Please input a valid seed phrase");
      return;
    }

    try {
      const newBtcWallet = generateBtcWallet(seedPhrase);
      const newEthWallet = ethers.Wallet.fromMnemonic(seedPhrase);

      setEthWallet(newEthWallet);
      setBtcWallet(newBtcWallet);
      setSeedPhrase(seedPhrase);

      setTimeout(() => {
        setGeneratingSeedPhrase(false);
        navigator.clipboard.writeText(seedPhrase).then(() => {
          toast.success("Mnemonic copied to clipboard");
        });
      }, 1500);
    } catch {
      setError("Invalid Seed Phrase entered");
      toast.warning("Please input a valid seed phrase");
      return;
    }
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

  useEffect(() => {
    setEthWallet(undefined);
    setBtcWallet(undefined);
    setError("");
    setSeedPhrase("");
  }, [userProvidingSeedPhrase]);

  console.log(ethWallet, btcWallet, seedPhrase);

  return (
    <div className="">
      <SwitchToggle
        enabled={userProvidingSeedPhrase}
        setEnabled={setUserProvidingSeedPhrase}
      />
      <ul role="list" className="px-2">
        {userProvidingSeedPhrase ? (
          <FeedItem
            index={1}
            ctaButtonText={"Generate Wallet Details"}
            onClick={handleUserInputSeedPhrase}
            sectionTitle={"Input Seed Phrase"}
          >
            <SeedPhraseInput
              seedPhrase={seedPhrase}
              setSeedPhrase={setSeedPhrase}
              error={error}
            />
            {ethWallet && (
              <div className="my-4 text-left">
                <p className="text-md text-gray-500">
                  You provided a seed phrase of
                  <span className="pl-1 underline ">{seedPhrase}</span>
                </p>
              </div>
            )}
            {generatingSeedPhrase ? (
              <div className="flex w-screen items-center justify-center">
                <ClipLoader />
              </div>
            ) : null}
          </FeedItem>
        ) : (
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
            </div>

            {generatingSeedPhrase ? (
              <div className="mt-4 flex w-screen items-center justify-center">
                <ClipLoader />
              </div>
            ) : null}
          </FeedItem>
        )}
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

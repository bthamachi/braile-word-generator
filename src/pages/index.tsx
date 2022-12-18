import { getDefaultWordlist, wordlists } from "bip39";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useState } from "react";
import QRCode from "react-qr-code";
import SeedPhraseWord from "../components/SeedPhraseWord";

const Home: NextPage = () => {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const generateBIP = () => {
    const wallet = ethers.Wallet.createRandom();

    setSeedPhrase(wallet._mnemonic().phrase);
    setWalletAddress(wallet.address);
    setPrivateKey(wallet.privateKey);
    setPublicKey(wallet.publicKey);
  };

  const wordlist = wordlists[getDefaultWordlist()];

  return (
    <div className="mx-4 mt-4">
      <button className="bg-blue-400 px-2 py-2" onClick={() => generateBIP()}>
        Generate Seed Phrase
      </button>
      <br />
      <p>Details Of Generated Wallet</p>
      <div className="mt-4 grid max-w-md  grid-cols-1  gap-y-4  break-words">
        <p>Private Key : {privateKey}</p>
        <p>Public Key : {publicKey}</p>
        <p>Address : {walletAddress}</p>
      </div>

      <br />

      <br />
      <div className="mx-2 grid grid-cols-2 gap-x-4 gap-y-4 md:mx-10 md:grid-cols-4">
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
      <br />
      <h1>QR Codes</h1>
      <p>Private Key</p>
      <QRCode value={privateKey} />
      <br />
      <p>Public Key</p>
      <QRCode value={publicKey} />
    </div>
  );
};

export default Home;

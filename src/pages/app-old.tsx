import * as bip39 from "bip39";
import { getDefaultWordlist, wordlists } from "bip39";
import { payments } from "bitcoinjs-lib";
import { ethers } from "ethers";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import type { NextPage } from "next";
import { useState } from "react";
import QRCode from "react-qr-code";
import SeedPhraseWord from "../components/SeedPhraseWord";
import { bip32 } from "../lib/crypto";

const Home: NextPage = () => {
  const [seedPhrase, setSeedPhrase] = useState(
    "flock face noodle fatal thumb dismiss orchard zone cupboard clinic broom pass"
  );
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const [btcPrivateKey, setBtcPrivateKey] = useState("");
  const [btcPublicKey, setBtcPublicKey] = useState("");
  const [btcAddress, setBTCAddress] = useState("");

  const generateImage = async () => {
    const doc = new jsPDF("portrait");
    const img = await htmlToImage.toJpeg(
      document.getElementById("seedPhrase")!
    );
    doc.addImage(img, "JPEG", 10, 10, 450, 250);
    doc.save("First Test Output.pdf");
  };

  const generateBIP = () => {
    const wallet = ethers.Wallet.createRandom();

    setSeedPhrase(wallet._mnemonic().phrase);
    setWalletAddress(wallet.address);
    setPrivateKey(wallet.privateKey);
    setPublicKey(wallet.publicKey);

    const seed = bip39.mnemonicToSeedSync(wallet._mnemonic().phrase);
    const node = bip32.fromSeed(seed);

    const WIF = node.toWIF();

    const privateKey = node.privateKey;
    const publicKey = node.publicKey;
    const addr = payments.p2pkh({ pubkey: publicKey }).address;

    setBtcPrivateKey(privateKey?.toString("hex") as string);
    setBtcPublicKey(publicKey?.toString("hex") as string);
    setBTCAddress(addr as string);
  };

  const wordlist = wordlists[getDefaultWordlist()];

  const generatePDF = () => {
    console.log("---pass typecheck");
  };

  return (
    <div className="mx-4 mt-4">
      <button onClick={() => generateImage()}>Capture Image</button>
      <button onClick={() => generatePDF()}>Generate PDF</button>
      <button className="bg-blue-400 px-2 py-2" onClick={() => generateBIP()}>
        Generate Seed Phrase
      </button>
      <br />
      <p>Details Of Generated Wallet</p>

      <div className="mt-4 grid max-w-md  grid-cols-1  gap-y-4  break-words">
        <h1 className="text-lg font-extrabold">Ethereum Details</h1>
        <p>Private Key : {privateKey}</p>
        <p>Public Key : {publicKey}</p>
        <p>Address : {walletAddress}</p>
      </div>

      <div className="mt-4 grid max-w-md  grid-cols-1  gap-y-4  break-words">
        <h1 className="text-lg font-extrabold">BTC Details</h1>
        <p>Private Key : {btcPrivateKey}</p>
        <p>Public Key : {btcPublicKey}</p>
        <p>Address : {btcAddress}</p>
      </div>

      <br />

      <br />
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
            <h1>BTC Private Key</h1>
            <QRCode value={btcPrivateKey} />
          </div>
          <div>
            <h1>ETH Private Key</h1>
            <QRCode value={btcPrivateKey} />
          </div>
          <div>
            <h1>Seed Phrase</h1>
            <QRCode value={seedPhrase} />
          </div>
        </div>
      </div>

      {/* <br />
      <h1>QR Codes</h1>
      <p>Seed Phrase as QR Code</p>
      <QRCode value={seedPhrase} /> */}
    </div>
  );
};

export default Home;

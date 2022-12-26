import BIP32Factory from "bip32";
import * as bip39 from "bip39";
import { ethers } from "ethers";
import * as ecc from "tiny-secp256k1";

export const generateRandomWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return wallet;
};

export const bip32 = BIP32Factory(ecc);

export const generateBtcWallet = (seedPhrase: string) => {
  const seed = bip39.mnemonicToSeedSync(seedPhrase);
  const node = bip32.fromSeed(seed);

  return node;
};

export const validateSeedPhrase = (phrase: string) => {
  const words = phrase.trim().split(" ");
  if (words.length !== 12) {
    return false;
  }
  for (let i = 0; i < 12; i++) {
    if (!ethers.wordlists.en?.getWordIndex(words[i] as string)) {
      return false;
    }
  }
  return true;
};

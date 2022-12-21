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

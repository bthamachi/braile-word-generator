import {
  ArrowPathIcon,
  CalendarIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";
import { BIP32Interface } from "bip32";
import { payments } from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import * as ecc from "tiny-secp256k1";

const ECPair = ECPairFactory(ecc);

const networkTabs = ["Ethereum", "Bitcoin"];

type WalletDetailsProps = {
  ethWallet: ethers.Wallet;
  btcWallet: BIP32Interface;
};

const WalletDetails = ({ ethWallet, btcWallet }: WalletDetailsProps) => {
  const [activeTab, setActiveTab] = useState("Ethereum");
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    switch (activeTab) {
      case "Ethereum": {
        setWalletAddress(ethWallet.address);
        setPrivateKey(ethWallet.privateKey);
        setPublicKey(ethWallet.publicKey);
        return;
      }
      case "Bitcoin": {
        const privateKeyBuffer = btcWallet.privateKey;
        const publicKeyBuffer = btcWallet.publicKey;

        setPrivateKey(btcWallet.toWIF());
        setPublicKey(publicKeyBuffer?.toString("hex") as string);

        const keyPair = ECPair.fromWIF(btcWallet.toWIF());

        setWalletAddress(
          payments.p2pkh({ pubkey: keyPair.publicKey }).address as string
        );
        return;
      }
      default: {
        throw new Error("Unsupported wallet");
      }
    }
  }, [activeTab]);

  const perks = [
    {
      name: "Private Key",
      value: privateKey,
      icon: CalendarIcon,
    },
    {
      name: "Public Key",
      value: publicKey,
      icon: ArrowPathIcon,
    },
    {
      name: "Network Address",
      value: walletAddress,
      icon: TruckIcon,
    },
  ];

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          {networkTabs.map((tab) => (
            <option key={tab}>{tab}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {networkTabs.map((tab, index) => {
            return (
              <div
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`${index == 0 ? "rounded-l-lg " : ""} ${
                  index == networkTabs.length - 1 ? "rounded-r-lg " : ""
                } group relative min-w-0 flex-1 cursor-pointer overflow-hidden rounded-l-lg bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10`}
              >
                <p
                  className={
                    tab === activeTab
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }
                >
                  {tab}
                </p>
                <span
                  className={`${
                    tab == activeTab ? "bg-indigo-500" : "bg-transparent"
                  } absolute inset-x-0 bottom-0 h-0.5`}
                ></span>
              </div>
            );
          })}
        </nav>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1">
          {perks.map((perk) => {
            return (
              <div key={perk.name} className=" my-4 p-2">
                <h3 className="font-medium text-gray-900">{perk.name}</h3>
                <p className="break-words text-sm">{perk.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;

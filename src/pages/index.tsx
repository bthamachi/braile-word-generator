import {
  generateMnemonic,
  getDefaultWordlist,
  setDefaultWordlist,
  wordlists,
} from "bip39";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import SeedPhraseWord from "../components/SeedPhraseWord";

const options = [
  "english",
  "japanese",
  "spanish",
  "italian",
  "french",
  "korean",
  "czech",
  "portuguese",
  "chinese_traditional",
];

const Home: NextPage = () => {
  const [seedPhrase, setSeedPhrase] = useState("");
  const [language, setLanguage] = useState("english");
  const generateBIP = () => {
    const newSeedPhrase = generateMnemonic();

    setSeedPhrase(newSeedPhrase);
  };

  const wordlist = wordlists[getDefaultWordlist()];
  console.log(
    seedPhrase.split(" ").map((item) => {
      return wordlist?.findIndex((element) => element === item);
    })
  );

  useEffect(() => {
    setDefaultWordlist(language);
  }, [language]);

  const updateLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  return (
    <div className="mx-4 mt-4">
      <div>
        <label htmlFor="language">
          Select Language To Generate Seed Phrase In
        </label>
        <br />
        <select
          value={language}
          onChange={(e) => updateLanguage(e)}
          id="language"
        >
          {options.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>

      <button className="bg-blue-400 px-2 py-2" onClick={() => generateBIP()}>
        Generate Seed Phrase in {language}
      </button>
      <br />
      {seedPhrase}
      <br />

      <br />
      <div className="mx-10 grid grid-cols-4 gap-x-4 gap-y-4">
        {seedPhrase.split(" ").map((item, idx) => {
          return (
            <SeedPhraseWord
              key={idx}
              word={item}
              wordlist={wordlist as string[]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;

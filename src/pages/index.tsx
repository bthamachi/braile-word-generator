import {
  generateMnemonic,
  getDefaultWordlist,
  setDefaultWordlist,
  wordlists,
} from "bip39";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

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
    console.log(newSeedPhrase);
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

  const updateLanguage = (e) => {
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
            return <option value={item}>{item}</option>;
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
      {seedPhrase
        .split(" ")
        .map((item) => {
          return (
            (wordlist?.findIndex((element) => element === item) as number) + 1
          );
        })
        .join(" ")}
      <svg
        id="svgBraille"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <circle fill="#6666FF" cx="25" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="81" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="81" cy="30" r="3.2"></circle>
        <circle fill="#6666FF" cx="137" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="147" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="193" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="203" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="203" cy="30" r="3.2"></circle>
        <circle fill="#6666FF" cx="249" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="259" cy="30" r="3.2"></circle>
        <circle fill="#6666FF" cx="305" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="305" cy="30" r="3.2"></circle>
        <circle fill="#6666FF" cx="315" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="361" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="361" cy="30" r="3.2"></circle>
        <circle fill="#6666FF" cx="371" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="371" cy="30" r="3.2"></circle>
        <circle fill="#6666FF" cx="417" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="417" cy="30" r="3.2"></circle>
        <circle fill="#6666FF" cx="427" cy="30" r="3.2"></circle>
        <circle fill="#6666FF" cx="473" cy="30" r="3.2"></circle>
        <circle fill="#6666FF" cx="483" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="529" cy="30" r="3.2"></circle>
        <circle fill="#6666FF" cx="539" cy="20" r="3.2"></circle>
        <circle fill="#6666FF" cx="539" cy="30" r="3.2"></circle>
      </svg>
    </div>
  );
};

export default Home;

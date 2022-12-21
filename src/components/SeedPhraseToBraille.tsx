import { getDefaultWordlist, wordlists } from "bip39";
import SeedPhraseWord from "./SeedPhraseWord";

type SeedPhraseToBrailleProps = {
  seedPhrase: string;
};

const SeedPhraseToBraille = ({ seedPhrase }: SeedPhraseToBrailleProps) => {
  return (
    <div className="mx-2 grid grid-cols-2 gap-x-4 gap-y-4 md:mx-10 md:grid-cols-4">
      {seedPhrase.length > 0 &&
        seedPhrase.split(" ").map((item, idx) => {
          return (
            <SeedPhraseWord
              index={idx}
              key={idx}
              word={item}
              wordlist={wordlists[getDefaultWordlist()] as string[]}
            />
          );
        })}
    </div>
  );
};

export default SeedPhraseToBraille;

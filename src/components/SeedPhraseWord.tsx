import SeedPhraseWordBraile from "./SeedPhraseWordBraile";

type SeedPhraseWordProps = {
  word: string;
  wordlist: string[];
};

const SeedPhraseWord = ({ word, wordlist }: SeedPhraseWordProps) => {
  const idx = (wordlist.findIndex((element) => element === word) as number) + 1;
  const paddedIdx = idx.toString().padStart(4, "0");
  return (
    <div>
      <p>{word}</p>
      <div className="grid grid-cols-4 border text-center">
        {paddedIdx.split("").map((item) => {
          return <div className="border">{item}</div>;
        })}
        {paddedIdx.split("").map((item) => {
          return (
            <div className="flex items-center justify-center border">
              <SeedPhraseWordBraile value={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeedPhraseWord;

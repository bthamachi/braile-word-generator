import SeedPhraseWordBraile from "./SeedPhraseWordBraile";

type SeedPhraseWordProps = {
  word: string;
  wordlist: string[];
  index: number;
};

const SeedPhraseWord = ({ word, wordlist, index }: SeedPhraseWordProps) => {
  const idx = (wordlist.findIndex((element) => element === word) as number) + 1;
  const paddedIdx = idx.toString().padStart(4, "0");
  return (
    <div>
      <div className="grid grid-cols-4 border">
        <p className="col-span-1 border-r-2 p-2 text-center">
          {(index + 1).toString().padStart(2, "0")}
        </p>
        <p className="col-span-3 p-2 text-center">{word}</p>
      </div>
      <div className="grid grid-cols-4 border text-center">
        {paddedIdx.split("").map((item, idx) => {
          return (
            <div key={idx} className="border">
              {item}
            </div>
          );
        })}
        {paddedIdx.split("").map((item, idx) => {
          return (
            <div key={idx} className="flex items-center justify-center border">
              <SeedPhraseWordBraile value={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeedPhraseWord;

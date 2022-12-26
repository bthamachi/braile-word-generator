import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

type SeedPhraseInputProps = {
  seedPhrase: string;
  setSeedPhrase: (s: string) => void;
  error: string;
};

const SeedPhraseInput = ({
  seedPhrase,
  setSeedPhrase,
  error,
}: SeedPhraseInputProps) => {
  return (
    <div>
      <label
        htmlFor="Seed Phrase Input"
        className="block text-sm font-medium text-gray-700"
      >
        Seed Phrase
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          value={seedPhrase}
          onChange={(e) => setSeedPhrase(e.target.value)}
          type="text"
          name="seedPhrase"
          id="seedPhraseInput"
          className="block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
          placeholder="Seed Phrase"
          defaultValue=""
          aria-invalid="true"
          aria-describedby="seedPhrase-error"
        />
        {error.length > 0 && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error.length > 0 && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default SeedPhraseInput;

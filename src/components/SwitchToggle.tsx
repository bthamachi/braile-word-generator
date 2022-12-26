import { Switch } from "@headlessui/react";

type SwitchToggleProps = {
  enabled: boolean;
  setEnabled: (b: boolean) => void;
};

const joinClassNames = (s1: string, s2: string) => {
  return `${s1} s2`;
};

const SwitchToggle = ({ enabled, setEnabled }: SwitchToggleProps) => {
  return (
    <Switch.Group
      as="div"
      className="flex flex-col space-y-4 px-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <span className="flex flex-grow flex-col">
        <Switch.Label
          as="span"
          className="text-sm font-medium text-gray-900"
          passive
        >
          Provide Your Own Seed Phrase
        </Switch.Label>
        <Switch.Description as="span" className="text-sm text-gray-500">
          We support any seed phrase which is derived from a BIP39 wordlist - or
          let us do the work for you.
        </Switch.Description>
      </span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={` ${
          enabled ? "bg-indigo-600" : "bg-gray-200"
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        <span
          aria-hidden="true"
          className={` ${
            enabled ? "translate-x-5" : "translate-x-0"
          } "pointer-events-none ease-in-out" inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200`}
        />
      </Switch>
    </Switch.Group>
  );
};

export default SwitchToggle;

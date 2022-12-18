import Eight from "./eight";
import Five from "./five";
import Four from "./four";
import Nine from "./nine";
import One from "./one";
import Seven from "./seven";
import Six from "./six";
import Three from "./three";
import Two from "./two";
import Zero from "./zero";

type SeedPhraseWordBraileProps = {
  value: string;
};

const SeedPhraseWordBraile = ({ value }: SeedPhraseWordBraileProps) => {
  switch (value) {
    case "1": {
      return <One />;
    }
    case "2": {
      return <Two />;
    }
    case "3": {
      return <Three />;
    }
    case "4": {
      return <Four />;
    }
    case "5": {
      return <Five />;
    }
    case "6": {
      return <Six />;
    }
    case "7": {
      return <Seven />;
    }
    case "8": {
      return <Eight />;
    }
    case "9": {
      return <Nine />;
    }
    case "0": {
      return <Zero />;
    }
    default: {
      return null;
    }
  }
};

export default SeedPhraseWordBraile;

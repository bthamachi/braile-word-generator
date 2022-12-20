import type { AppType } from "next/dist/shared/lib/utils";
import { ChangeEvent, useState } from "react";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [unlocked, setUnlocked] = useState(true);
  const [password, setPassword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value === "big yams") {
      setUnlocked(true);
    }
  };

  if (!unlocked) {
    return (
      <div>
        <label>Key In Password: </label>
        <input
          className="border px-2 py-4"
          value={password}
          onChange={(e) => handleChange(e)}
        />
      </div>
    );
  }
  return <Component {...pageProps} />;
};

export default MyApp;

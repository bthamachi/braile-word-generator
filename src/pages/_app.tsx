import type { AppType } from "next/dist/shared/lib/utils";
import { ChangeEvent, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Metadata from "../components/Metadata";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const initialUnlockStatus =
    process.env.NODE_ENV === "development" ? true : false;
  const [unlocked, setUnlocked] = useState(initialUnlockStatus);
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
  return (
    <>
      <Metadata />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;

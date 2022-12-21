import QRCode from "react-qr-code";

type QRCodeGeneratorProps = {
  seedPhrase: string;
};

const QRCodeGenerator = ({ seedPhrase }: QRCodeGeneratorProps) => {
  return (
    <div className="flex items-center justify-center">
      <p className="mx-auto mt-5 max-w-xl text-sm text-gray-500 md:text-xl">
        Scan this QR Code to automatically setup your wallet in Metamask, Blue
        Wallet or any other wallet app
      </p>
      <QRCode value={seedPhrase} />
    </div>
  );
};

export default QRCodeGenerator;

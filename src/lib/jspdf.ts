import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { calculateAspectRatioFit } from "./img";

export const generateMobileImage = async () => {
  const doc = new jsPDF("p", "px", [800, 1200]);
  const height = doc.internal.pageSize.getHeight();
  const width = doc.internal.pageSize.getWidth();

  console.log(height, width);

  const secretPhraseColumnElement = document.getElementById("braille")!;
  const secretPhraseImage = await htmlToImage.toJpeg(
    secretPhraseColumnElement,
    {
      quality: 1,
    }
  );

  // Get generated braille container
  const secretPhraseWidth = secretPhraseColumnElement.clientWidth;
  const secretPhraseHeight = secretPhraseColumnElement.clientHeight;

  const { width: newWidth, height: newHeight } = calculateAspectRatioFit(
    secretPhraseWidth!,
    secretPhraseHeight!,
    300,
    900
  );

  // Get generated QR Code
  const qrCode = document.getElementById("qr-code")!;
  const qrCodeImage = await htmlToImage.toJpeg(qrCode, {
    quality: 1,
  });

  const qrCodeElementWidth = qrCode.clientWidth;
  const qrCodeElementHeight = qrCode.clientHeight;

  const { width: newQrCodeWidth, height: newQrCodeHeight } =
    calculateAspectRatioFit(qrCodeElementWidth, qrCodeElementHeight, 300, 300);

  // Get generated instructions
  const qrCodeInstructions = document.getElementById("instructions");
  const qrCodeInstructionWidth = qrCodeInstructions?.clientWidth;
  const qrCodeInstructionsHeight = qrCodeInstructions?.clientHeight;
  const qrCodeInstructionImage = await htmlToImage.toJpeg(qrCodeInstructions!, {
    quality: 1,
  });

  const { width: instructionWidth, height: instructionHeight } =
    calculateAspectRatioFit(
      qrCodeInstructionWidth!,
      qrCodeInstructionsHeight!,
      300,
      100
    );

  const gap = 20;
  const combinedWidth =
    gap + newWidth + Math.max(newQrCodeWidth, instructionWidth);
  const startX = Math.floor((width - combinedWidth) / 2);
  const startY = Math.floor((height - newHeight) / 2);

  doc.addImage(secretPhraseImage, startX, startY, newWidth, newHeight);
  doc.addImage(
    qrCodeInstructionImage,
    startX + gap + newWidth,
    startY,
    instructionWidth,
    instructionHeight
  );
  doc.addImage(
    qrCodeImage,
    startX + gap + newWidth,
    startY + gap + instructionHeight,
    qrCodeElementWidth,
    qrCodeElementHeight
  );

  //   doc.addImage(
  //     QRCodeElementImage,
  //     startX + newWidth + gap,
  //     startY,
  //     newQRHeight,
  //     newQRWidth * 1.02
  //   );

  doc.save("Setup Instructions.pdf");
};

export const generateImage = async () => {
  const doc = new jsPDF("p", "px", [800, 1200]);
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  const img = await htmlToImage.toJpeg(document.getElementById("seedPhrase")!, {
    quality: 1,
  });

  const originalImageSize = document.getElementById("seedPhrase");
  const imageWidth = originalImageSize?.clientWidth;
  const imageHeight = originalImageSize?.clientHeight;

  const { width: newWidth, height: newHeight } = calculateAspectRatioFit(
    imageWidth!,
    imageHeight!,
    700,
    700
  );

  const startX = Math.floor((width - newWidth) / 2);
  const starty = Math.floor((height - newHeight) / 2);

  doc.addImage(img, "JPEG", startX, starty, newWidth, newHeight);
  doc.save("Setup Instructions.pdf");
};

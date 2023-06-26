import { showSuccessToast, showErrorToast } from "../widgets/Toast";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import crypto from "crypto";
import path from "path";
import url from "url";

export const MyFormattedDate = (today) => {
  const [day, month, year] = today.split(".");
  const date = dayjs(`${year}-${month}-${day}`);
  const formattedDate = date
    .locale("uk")
    .format("dddd, MMMM Do")
    .replace(",", "");
  return formattedDate;
};

const getPublicIdFromUrl = (imageUrl) => {
  const parsedUrl = url.parse(imageUrl);
  const parsedPath = path.parse(parsedUrl.pathname);
  const imageFolderPath = parsedPath.dir.split("/").slice(5).join("/");
  const imagePath = path.join(imageFolderPath, parsedPath.name);
  return imagePath;
};

const generateSignature = (publicId, apiSecret) => {
  const timestamp = new Date().getTime();
  const signaturePayload = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto
    .createHash("sha1")
    .update(signaturePayload)
    .digest("hex");
  return {
    signature,
    timestamp,
  };
};

export const handleDeleteImage = async (
  e,
  uploadImage,
  setUploadImage,
  resetFileInput
) => {
  e.preventDefault();
  const publicId = getPublicIdFromUrl(uploadImage);
  const apiSecret = process.env.NEXT_PUBLIC_API_SECR;
  const { signature, timestamp } = generateSignature(publicId, apiSecret);
  const url_c = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_N}/image/destroy`;

  try {
    const response = await fetch(url_c, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_id: publicId,
        signature: signature,
        api_key: process.env.NEXT_PUBLIC_API_KEY,
        timestamp: timestamp,
      }),
    });
    setUploadImage();
    resetFileInput();
    showSuccessToast("УСПІХ: фото видалено з Cloudinary!");
    console.error(response);
  } catch (error) {
    showErrorToast("Помилка: не вдалося видалити.");
  }
};

export const handleDeleteMImage = async (
  e,
  uploadImage
) => {
  e.preventDefault();
  const publicId = getPublicIdFromUrl(uploadImage);
  const apiSecret = process.env.NEXT_PUBLIC_API_SECR;
  const { signature, timestamp } = generateSignature(publicId, apiSecret);
  const url_c = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_N}/image/destroy`;

  try {
    const response = await fetch(url_c, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_id: publicId,
        signature: signature,
        api_key: process.env.NEXT_PUBLIC_API_KEY,
        timestamp: timestamp,
      }),
    });
    showSuccessToast("УСПІХ: фото видалено з Cloudinary!");
    console.error(response);
  } catch (error) {
    showErrorToast("Помилка: не вдалося видалити.");
  }
};

export const handleDeleteImagePage = async (uploadImage) => {
  const publicId = getPublicIdFromUrl(uploadImage);
  const apiSecret = process.env.NEXT_PUBLIC_API_SECR;
  const { signature, timestamp } = generateSignature(publicId, apiSecret);
  const url_c = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_N}/image/destroy`;

  try {
    const response = await fetch(url_c, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_id: publicId,
        signature: signature,
        api_key: process.env.NEXT_PUBLIC_API_KEY,
        timestamp: timestamp,
      }),
    });
    console.error(response);
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentDate = () => {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  return `${day}-${month}-${year}`;
};


export const calculateRows = (text) => {
  const rows = text.split("\n").length;
  return Math.max(rows, 7); // minimum of 3 rows
};

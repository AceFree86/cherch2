import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Upload } from "../helpers/Icons";
import Link from "next/link";
import { handleDeleteImage } from "../helpers/Servise";
import DefaultImage from "../../../public/images/default-image-url.jpg";
import Image from "next/image";
import { showSuccessToast, showErrorToast } from "../widgets/Toast";

const UpdateNewsForm = ({ initialValues, page }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [id, setId] = useState(initialValues._id || "");
  const [uploadImage, setUploadImage] = useState(initialValues.imageUrl || "");
  const [title, setTitle] = useState(initialValues._title || "");
  const [textData, setTextData] = useState(initialValues.text || "");
  const [toDate, setDate] = useState(initialValues._date || "");

  const news = {
    _title: title,
    imageUrl: uploadImage,
    text: textData,
    _date: toDate,
  };


  async function handleOnChange(e) {
    try {
      const fileInput = e.target.files[0];
      const formData = new FormData();
      formData.append("file", fileInput);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_PRESET_NAME);
      const data = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_N}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      showSuccessToast("Успіх: фото збережено в Cloudinary!");
      setUploadImage(data.url);
    } catch (error) {
      showErrorToast("Помилка: не вдалося зберегти.");
      console.error(error);
    }
  }

  const resetFileInput = () => {
    fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/gospel/update", {
        method: "PUT",
        body: JSON.stringify({ id, body: news }),
      });
      showSuccessToast("Успіх: збережено!");
      router.push(page);
    } catch (error) {
      showErrorToast("Помилка: не вдалося зберегти.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="items-center justify-center text-center w-full grid place-items-center mt-4">
        <form className="mx-auto max-w-xl" onSubmit={handleSubmit}>
          <input
            type="text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-sm md:text-base text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 md:font-bold"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="items-center justify-stretch w-full grid place-items-center">
            <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mt-5 ${
                !uploadImage ? "visible" : "hidden"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload />
                <p className="mb-2 text-sm text-gray-500 md:text-center">
                  <span className="font-semibold">
                    Натисніть, щоб завантажити
                  </span>
                  &nbsp;або перетягнути та впусти
                </p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF.</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleOnChange}
              />
            </label>
            <div>
              <Image
                src={uploadImage || DefaultImage}
                alt="Uploaded Image"
                width={50}
                height={50}
                className={`w-auto h-auto inline-block ${
                  !uploadImage ? "hidden" : "visible mt-5"
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <button
                type="button"
                onClick={(e) =>
                  handleDeleteImage(
                    e,
                    uploadImage,
                    setUploadImage,
                    resetFileInput
                  )
                }
                className={`w-full block items-center rounded-md text-sm md:text-base bg-red-600 px-3 py-2 text-white shadow-sm hover:bg-red-500 md:font-bold ${
                  !uploadImage ? "hidden" : "visible mt-5"
                }`}
              >
                Видалити
              </button>
            </div>
          </div>
          <textarea
            id="message"
            value={textData}
            onChange={(e) => setTextData(e.target.value)}
            rows={10}
            className="block p-2.5 w-full text-gray-900 text-sm md:text-base bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-5"
            placeholder={"Напишіть текст..."}
          />

          <div className="mt-10 flex justify-between">
            <button
              type="submit"
              className="block w-min rounded-md text-sm md:text-base bg-hadfieldBlue px-3.5 py-2.5 text-center text-white hover:bg-hadfieldBlueLite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hadfieldBlue md:font-bold"
            >
              Зберегти
            </button>
            <Link
              href={page}
              className="block w-min rounded-md text-sm md:text-base bg-indigo-600 px-3.5 py-2.5 text-center text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:font-bold"
            >
              Назат
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateNewsForm;

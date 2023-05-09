import { useState } from "react";
import Layout from "./Layout";

export const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

   const handleClick = () => {
     setIsOpen(!isOpen);
   };

  return (
    <footer className="w-full font-bold text-lg sm:text-base">
      <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
      {isOpen ? (
        <div className="w-full text-sm flex items-center justify-between bg-blue-50 border-t border-b border-blue-500 text-blue-700 px-4 py-3">
          <p className="text-gray-700">
            моб.{" "}
            <span className="text-blue-500 hover:underline">
              <a href="tel:0667303179">0507832899</a>
            </span>
          </p>
          <p className="text-gray-700">
            Email@:
            <a
              href="mailto:gifler@me.com"
              className="text-blue-500 hover:underline"
            >
              gifler@me.com
            </a>
          </p>
        </div>
      ) : null}
      <Layout className="py-8 flex items-center justify-between lg:flex-col lg:py-6 text-blue-600">
        <span>{new Date().getFullYear()} &copy; Всі права захищені.</span>
        <div className="flex items-center">
          <span>створив&nbsp;&nbsp;Руслан МОРДОВАНЕЦЬ</span>
        </div>
        <button
          className="hover:underline"
          onClick={handleClick}
          title="show my info"
        >
          Контакти
        </button>
      </Layout>
    </footer>
  );
};

export default Footer;

import React from "react";
import Layout from "./Layout";

export const Footer = () => {
  return (
    <footer className="w-full font-bold text-lg sm:text-base">
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <Layout className="py-8 flex items-center justify-between lg:flex-col lg:py-6 text-blue-600">
        <span>{new Date().getFullYear()} &copy; Всі права захищені.</span>
        <div className="flex items-center">
          <span>створив&nbsp;&nbsp;Руслан МОРДОВАНЕЦЬ</span>
        </div>
        <a href="#" className="hover:underline">
          Контакти
        </a>
      </Layout>
    </footer>
  );
};

export default Footer;

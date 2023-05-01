import React from "react";
import Layout from "./Layout";

export const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-solid border-gray-300 font-bold text-lg sm:text-base">
      <Layout className="py-8 flex items-center justify-between lg:flex-col lg:py-6 text-blue-600">
        <span>{new Date().getFullYear()} &copy; Всі права захищені.</span>
        <div className="flex items-center">
          <span>створено&nbsp;&nbsp;Русланом МОРДОВАНЦЕМ</span>
        </div>
      </Layout>
    </footer>
  );
};

export default Footer;

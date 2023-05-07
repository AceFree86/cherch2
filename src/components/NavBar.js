import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { Facebook, Youtube, Viber } from "./helpers/Icons";
import { showInfo } from "./widgets/Toast";
import React, { useState } from "react";
import Logo from "./widgets/Logo";
const { motion } = require("framer-motion");

const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={`${className} relative group`}
      title="btn of main menu"
    >
      {title}
      <samp
        className={`h-[1px] inline-block bg-dark absolute left-0 bottom-0 group-hover:w-full 
        transition-[width] ease duration-300 ${
          router.asPath === href ? "w-full" : "w-0"
        }`}
      >
        &nbsp;
      </samp>
    </Link>
  );
};

const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  const router = useRouter();
  const handleClick = () => {
    toggle();
    router.push(href);
  };

  return (
    <>
      <button
        href={href}
        className={`${className} relative group my-4 text-lg uppercase`}
        onClick={handleClick}
        title="btn of main menu"
      >
        {title}
        <samp
          className={`h-[1px] inline-block bg-light absolute left-0 bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
            router.asPath === href ? "w-full" : "w-0"
          }`}
        >
          &nbsp;
        </samp>
      </button>
    </>
  );
};

const NavBar = () => {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const isActive = (href) => router.asPath === href;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`w-full px-32 py-8 font-medium flex items-center justify-between relative z-10 lg:px-16 md:px12 sm:px-8`}
    >
      <button
        className="flex-col justify-center items-center hidden xl:flex h-10 w-10"
        onClick={handleClick}
        title="main menu"
      >
        <span
          className={`bg-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-dark block transition-all duration-50 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>

      <div className="absolute left-[50%] md:left-[51%] top-2 xl:ml-1 translate-x-[-50%]">
        <Logo />
      </div>

      <div className="w-full flex justify-between items-center">
        <nav className="font-bold xl:hidden">
          <CustomLink href="/" title="Головна" className="mr-2" />
          <CustomLink href="/schedule" title="Розклад" className="mx-2" />
          <CustomLink href="/gospel" title="Проповіді" className="mx-2" />
          <CustomLink href="/news" title="Новини" className="mx-2" />
          {data?.user ? (
            <>
              <Link
                href="/"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  signOut();
                  showInfo("Ви вийшли!");
                }}
              >
                &nbsp;Вихід
              </Link>
            </>
          ) : (
            <CustomLink href="/login" title="Вхід" className="mx-2" />
          )}
        </nav>
        <nav
          className="flex items-center justify-center flex-wrap 
        xl:w-full xl:absolute xl:left-[50%] xl:top-20 xl:translate-x-[-50%]"
        >
          <motion.a
            href="https://invite.viber.com/?g2=AQBg6HCdKwbriFB82gNwLHc0BeA03erP1gdIo5WVZMO1tvCLoSTHD62kL6gMjtj9"
            target={"_blank"}
            className="w-6 mx-3"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Viber />
          </motion.a>
          <motion.a
            href="https://www.facebook.com/people/%D0%93%D1%80%D0%B5%D0%BA%D0%BE-
                  %D0%BA%D0%B0%D1%82%D0%BE%D0%BB%D0%B8%D1%86%D1%8C%D0%BA%D0%B0-%D0%BF%D0%B0%D1%80%D0%B0%D1%84%D1%96%D1%8F
                  -%D0%A0%D1%96%D0%B7%D0%B4%D0%B2%D0%B0-%D0%9F%D1%80%D0%B5%D1%81%D0%B2%D1%8F%D1%82%D0%BE%D1%97
                  -%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B8%D1%86%D1%96-
          %D0%BC%D0%BA%D1%80%D0%94%D1%80%D0%B0%D0%B2%D1%86%D1%96/100064700798125/"
            target={"_blank"}
            className="w-6 mx-3"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Facebook />
          </motion.a>
          <motion.a
            href="https://www.youtube.com/@user-eb8qo7nh7y"
            target={"_blank"}
            className="w-6 ml-3"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Youtube />
          </motion.a>
        </nav>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, opacity: 1 }}
          className="md:min-w-[95vw] min-w-[60vw] flex flex-col text-light1 font-bold justify-between z-30
           items-center fixed top-96 left-1/2 
          -translate-x-1/2 -translate-y-1/2 bg-royalNavy rounded-lg py-32"
        >
          <nav className="uppercase flex items-center flex-col justify-center text-light">
            <CustomMobileLink
              href="/"
              title="Головна"
              className=""
              toggle={handleClick}
            />
            <CustomMobileLink
              href="/schedule"
              title="Розклад"
              className=""
              toggle={handleClick}
            />
            <CustomMobileLink
              href="/gospel"
              title="Проповіді"
              className=""
              toggle={handleClick}
            />
            <CustomMobileLink
              href="/news"
              title="Новини"
              className=""
              toggle={handleClick}
            />
            {data?.user ? (
              <>
                <Link
                  href="/"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    signOut();
                    showInfo("Ви вийшли!");
                  }}
                >
                  Вихід
                </Link>
              </>
            ) : (
              <CustomMobileLink
                href="/login"
                title="Вхід"
                className=""
                toggle={handleClick}
              />
            )}
          </nav>
        </motion.div>
      ) : null}
    </header>
  );
};

export default NavBar;

import Link from "next/link";
import React from "react";
import { Dravtci } from "../helpers/Icons";
const { motion } = require("framer-motion");

const MtionLink = motion(Link);

const Logo = () => {
  return (
    <div className="border-none flex items-center justify-center mt-1">
      <MtionLink
        href="https://uk.wikipedia.org/wiki/%D0%94%D1%80%D0%B0%D0%B2%D1%86%D1%96"
        className="w-16 h-16 flex items-center justify-center rounded-full"
        whileHover={{ scale: 1.5 }}
      >
        <Dravtci />
      </MtionLink>
    </div>
  );
};
export default Logo;

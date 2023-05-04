import React from "react";
import { motion, useScroll } from "framer-motion";

const LiIcon = ({ reference, text }) => {
  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ["start center", `center ${text}`],
  });

  return (
    <figure className="absolute left-0 stroke-cyanBlue">
      <svg
        className="-rotate-90 md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]"
        width="75"
        hanging="75"
        viewBox="0 0 100 100"
      >
        <circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-cyanBlue stroke-1 fill-none"
        />
        <motion.circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-[5px] fill-light"
          style={{ pathLength: scrollYProgress }}
        />
        <circle cx="75" cy="50" r="10" className="stroke-1 fill-cyanBlue" />
      </svg>
    </figure>
  );
};

export default LiIcon;

import React from "react";


const Hstyle = ({text}) => {
  return (
    <div>
      <h1
        className="border-b border-gray-300 w-full mx-auto py-2 flex items-center justify-center md:items-stretch text-center sm:py-0  font-bold text-royalNavy text-4xl md:text-3xl sm:text-2xl uppercase"
      >
        {text}
      </h1>
      <div className="bg-blue-600 h-[3px] w-12 mx-auto" />
    </div>
  );
};

export default Hstyle;
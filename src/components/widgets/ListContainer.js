import React from "react";

const ListContainer = ({ title, text }) => {
  return (
    <li className="first:mt-1 last:mb-5 w-[60%] mx-auto flex flex-col justify-between md:w-[80%]">
      <div>
        <h5
          className="mb-1 capitalize text-left text-blue-600 font-bold text-2xl sm:text-xl xs:text-lg"
        >{`${title}`}</h5>
        <ul className="list-disc max-w-md space-y-1">
          {text.map((label) => (
            <li key={label.get_time} className="">
              <p
                className="border-b border-twilightBlue-400 mb-2 font-semibold
               text-left w-full text-darkShade"
              >{`${label.get_time} год. - ${label.description}.`}</p>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};
export default ListContainer;

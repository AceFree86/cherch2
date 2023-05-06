import React from "react";
import { MyFormattedDate } from "../helpers/Servise";

const Details = ({ title, text }) => {
  return (
    <li className="first:mt-1 last:mb-5 w-[60%] mx-auto flex flex-col justify-between md:w-[80%]">
      <div>
        <h5
          className={`mb-1 capitalize text-left font-bold text-2xl sm:text-xl xs:text-lg
            ${title.includes("неділя") ? "text-red-500" : "text-blue-600"}`}
        >{`${title}`}</h5>
        <ul className="list-disc text-royalNavy max-w-md space-y-1">
          {text.map((label) => (
            <li key={label.get_time}>
              <p className="border-b border-white mb-2 font-semibold text-left w-full text-darkShade">{`${label.get_time} год. - ${label.description}.`}</p>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

const OneList = ({ doc }) => {
  return (
    <>
      {doc.map((document) => (
        <div key={document._id}>
          <div className="">
            <ul className="w-full flex flex-col items-start justify-between ml-4">
              <Details
                title={`${MyFormattedDate(document._day)} 
            ${document.stateDay}
            ${document.namesSaints && ` (${document.namesSaints})`}:`}
                text={document.labels}
              />
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default OneList;

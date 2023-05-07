import React, { useRef } from "react";
import { useRouter } from "next/router";
import { showSuccessToast, showErrorToast } from "./Toast";
import { MyFormattedDate } from "../helpers/Servise";
import { motion, useScroll } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LiIcon from "./LiIcon";

const Details = ({ title, text, state }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="first:mt-1 last:mb-5 w-[60%] mx-auto flex flex-col justify-between md:w-[80%]"
    >
      <LiIcon refarence={ref} text={state} />
      <div initial={{ y: 50 }} whileinview={{ y: 0 }}>
        <h5
          className={`mb-1 capitalize text-left font-bold text-2xl sm:text-xl xs:text-lg
            ${title.includes("неділя") ? "text-red-500" : "text-blue-600"}`}
        >
          {title}
        </h5>
        <ul className="list-disc text-royalNavy md:list-none max-w-md space-y-1">
          {text.map((label) => (
            <li key={label.get_time}>
              <p className="border-b border-twilightBlue-500 mb-2 font-semibold text-left w-full text-darkShade">
                {`${label.get_time} год. - ${label.description}.`}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

const Timetable = ({ state, doc, hiding }) => {
  const router = useRouter();
  const { data } = useSession();
  

  const deleteTodo = async (todoId) => {
    const resp = await fetch("/api/list/delete", {
      method: "DELETE",
      body: JSON.stringify(todoId),
    });
    await resp.json();
    if (resp.ok) {
      router.reload();
      showSuccessToast("Успіх: документ успішно видалено !");
    } else {
      showErrorToast("Помилка: не вдалося видалити документ !");
    }
  };

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", `center ${state}`],
  });

  return (
    <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-9 top-0 w-[4px] h-full bg-blue-600 origin-top md:w-[2px] md:left-[30px] xs:left-[20px]"
      />
      {doc.map((document) => (
        <div key={document._id}>
          <div className="flex items-center self-start mt-2 relative">
            <ul className="w-full flex flex-col items-start justify-between ml-4 md:ml-1">
              <Details
                title={`${MyFormattedDate(document._day)} ${
                  document.stateDay
                } ${document.namesSaints && ` (${document.namesSaints})`}:`}
                text={document.labels}
                state={state}
              />
              <div
                className={`w-full flex justify-around ${
                  hiding ? "invisible mb-0 mt-0" : "visible mb-7"
                }`}
              >
                {data?.user ? (
                  <>
                    <Link
                      href={{
                        pathname: `/form-update`,
                        query: {
                          doc: document._id,
                          path_p: "",
                          form: "schedule",
                          name_coll: "List_Day",
                        },
                      }}
                      className="shadow-sm bg-hadfieldBlue text-sm md:text-base hover:bg-hadfieldBlueLite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hadfieldBlue text-white md:font-bold py-2 px-4 rounded-md"
                    >
                      {"Обновити"}
                    </Link>
                    <button
                      onClick={() => deleteTodo(document._id)}
                      className="text-white shadow-sm text-sm md:text-base bg-red-600 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 py-2 px-4 rounded-md md:font-bold"
                    >
                      {"Видалити"}
                    </button>
                  </>
                ) : null}
              </div>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timetable;

import React from "react";
import {handleDeleteImagePage} from "../helpers/Servise";
import { showSuccessToast, showErrorToast } from "../widgets/Toast";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Infotable = ({
  postsS,
  collection,
  pathPage,
  pathN,
  n_folder,
  router,
  hiding,
}) => {
 
  const { data } = useSession();

  const deleteTodo = async (todoId) => {
    const resp = await fetch(n_folder, {
      method: "DELETE",
      body: JSON.stringify(todoId),
    });
    const data = await resp.json();
    console.log(data);
    if (resp.ok) {
      router.reload();
      showSuccessToast("Успіх: документ успішно видалено !");
    } else {
      showErrorToast("Помилка: не вдалося видалити документ !");
    }
  };

  return (
    <>
      <div className="mt-5 sm:w-full">
        {postsS.map((document) => (
          <div key={document._id}>
            <div className="mt-10 mb-5 relative">
              <ul className="w-full flex flex-col items-start justify-between">
                <div className="flex items-center justify-between md:inline-block">
                  <Image
                    src={document.imageUrl}
                    width={100}
                    height={100}
                    alt="Uploaded Image"
                    priority
                    className="w-1/4 md:w-full h-auto inline-block"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="ml-1.5 md:ml-0">
                    <h3 className="font-mont text-royalNavy font-bold text-2xl uppercase">
                      {document._title}
                    </h3>
                    <div className="">
                      <div className="container">
                        <p className="text-justify font-normal text-stone-600 break-words multiline-ellipsis">
                          {document.text}
                        </p>
                        <Link
                          href={{
                            pathname: "/read-data",
                            query: {
                              name_coll: collection,
                              doc: document._id,
                              path_p: pathPage,
                            },
                          }}
                          className="underline text-blue-500 text-base md:text-sm"
                        >
                          читати далі.
                        </Link>
                      </div>
                      <div
                        className={`w-full mt-7 flex justify-between ${
                          hiding ? "invisible" : "visible"
                        }`}
                      >
                        {data?.user ? (
                          <>
                            <Link
                              href={{
                                pathname: pathN,
                                query: {
                                  doc: document._id,
                                  path_p: pathPage,
                                },
                              }}
                              className="shadow-sm bg-hadfieldBlue hover:bg-hadfieldBlueLite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hadfieldBlue text-white font-bold py-2 px-4 rounded-md"
                            >
                              Обновити
                            </Link>
                            <button
                              onClick={() => {
                                deleteTodo(document._id);
                                handleDeleteImagePage(document.imageUrl);
                              }}
                              className="text-white shadow-sm bg-red-600 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 py-2 px-4 rounded-md"
                            >
                              Видалити
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
            <div className="w-full mx-auto py-3 flex items-center justify-center" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Infotable;

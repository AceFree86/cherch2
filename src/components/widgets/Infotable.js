import { handleDeleteImagePage } from "../helpers/Servise";
import { showSuccessToast, showErrorToast } from "../widgets/Toast";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

function extractNameFromPath(path) {
  const withoutQueryParams =
    path.indexOf("?") !== -1 ? path.split("?")[0] : path;
  const [name] = withoutQueryParams.substring(1).split("/");
  return name;
}

const Infotable = ({
  postsS,
  collection,
  pathPage,
  n_folder,
  router,
  hiding,
}) => {
  const { data } = useSession();

  const deleteAllImages = async (urls) => {
    if (!Array.isArray(urls)) {
      await handleDeleteImagePage(urls);
      return;
    }

    await Promise.all(
      urls.map(async (url) => {
        try {
          await handleDeleteImagePage(url);
        } catch (error) {
          console.error(error);
        }
      })
    );
  };

  const deleteTodo = async (todoId) => {
    const resp = await fetch(n_folder, {
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

  return (
    <>
      <div className="mt-5 grid">
        {postsS.map((document) => (
          <div key={document._id}>
            <div className="col-span-12">
              <article className="w-full flex justify-center p-7 md:flex-col md:p-8 xs:p-4">
                <div className="w-1/2 md:w-full">
                  {Array.isArray(document.imageUrl) ? (
                    <Image
                      key={0}
                      src={document.imageUrl[0]}
                      width={100}
                      height={100}
                      alt="Uploaded Image"
                      className="md:w-full w-[60%] h-auto inline-block float-right"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      as="image"
                    />
                  ) : (
                    <Image
                      src={document.imageUrl}
                      width={100}
                      height={100}
                      alt="Uploaded Image"
                      className="md:w-full w-[60%] h-auto inline-block float-right"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      as="image"
                    />
                  )}
                </div>
                <ul className="w-1/2 md:w-full flex flex-col items-start pl-6 md:pl-0 md:pt-6">
                  <p className="text-sm font-normal border-b border-gray-200 w-full">{`Додано: ${document._date}`}</p>
                  <h3 className="font-mont text-royalNavy font-bold text-2xl uppercase">
                    {document._title}
                  </h3>
                  <div className="container">
                    <p className="text-justify font-normal text-stone-600 break-words multiline-ellipsis">
                      {document.text}
                    </p>
                  </div>

                  <Link
                    href={{
                      pathname: "/read-data",
                      query: {
                        name_coll: collection,
                        doc: document._id,
                        path_p: pathPage,
                      },
                    }}
                    className="py-2 px-4 mt-1 text-sm md:text-base rounded-md bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 hover:border-transparent"
                  >
                    Читати далі...
                  </Link>
                  <div
                    className={`w-full mt-7 flex justify-around md:justify-between ${
                      hiding ? "invisible" : "visible"
                    }`}
                  >
                    {data?.user ? (
                      <>
                        <Link
                          href={{
                            pathname: "/form/update",
                            query: {
                              doc: document._id,
                              path_p: pathPage,
                              form: extractNameFromPath(pathPage),
                              name_coll: collection,
                            },
                          }}
                          className="shadow-sm bg-hadfieldBlue text-sm md:text-base hover:bg-hadfieldBlueLite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hadfieldBlue text-white md:font-bold py-2 px-4 rounded-md"
                        >
                          Обновити
                        </Link>
                        <button
                          onClick={() => {
                            deleteAllImages(document.imageUrl);
                            deleteTodo(document._id);
                          }}
                          className="text-white shadow-sm text-sm md:text-base bg-red-600 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 py-2 px-4 rounded-md md:font-bold"
                        >
                          Видалити
                        </button>
                      </>
                    ) : null}
                  </div>
                </ul>
              </article>
            </div>
            <div className="w-full mx-auto py-3 flex items-center justify-center" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Infotable;

import React, { useState, useEffect } from "react";
import { connectToDatabase } from "../../lib/mongodb";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Infotable from "@/components/widgets/Infotable";
import Hstyle from "@/components/helpers/Hstyle";
import Layout from "@/components/Layout";

export default function Gospel({ list, currentPage, numPages }) {
  const [currentPag, setCurrentPage] = useState(currentPage);
  const [postsState, setPostsState] = useState([]);
  const { data } = useSession();
  const router = useRouter();
  const pathPage = router.asPath;

  useEffect(() => {
    let didCancel = false;
    async function fetchData() {
      if (!didCancel) {
        setPostsState(list);
      }
    }
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [list]);

  const handleClick = (page) => {
    setCurrentPage(page);
    router.push(`/gospel?page=${page}`);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPag + 1);
    router.push(`/gospel?page=${currentPag + 1}`);
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
    router.push(`/gospel?page=${currentPag - 1}`);
  };

  return (
    <>
      <Head>
        <title>Проповіді</title>
        <meta name="description" content="any description" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen">
        <Layout className="pt-16 sm:pt-8 ">
          <div className="text-4xl md:text-3xl sm:text-2xl">
            <Hstyle text="Проповіді" />
          </div>
          <div className="flex items-center justify-center text-center w-full mx-auto py-2">
            {data?.user ? (
              <>
                <Link
                  href="/form-gospel-add"
                  className="shadow-sm bg-hadfieldBlue hover:bg-hadfieldBlueLite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hadfieldBlue text-white font-bold py-2 px-4 rounded-md"
                >
                  Додати
                </Link>
              </>
            ) : null}
          </div>
          <Infotable
            postsS={postsState}
            collection={"List_Gospel"}
            pathPage={pathPage}
            pathN={"/form-gospel-update"}
            n_folder={"/api/gospel/delete"}
            router={router}
            hiding={false}
          />
        </Layout>
        <nav
          aria-label="Page navigation"
          className="flex flex-col items-center mb-10 lg:w-11/12"
        >
          <ul className="flex -space-x-px flex-wrap">
            <li>
              <button
                disabled={currentPag === 1}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={handlePrevClick}
              >
                Назад
              </button>
            </li>
            {Array.from({ length: numPages }, (_, i) => (
              <li key={i}>
                <button
                  className={`px-3 py-2 leading-tight ${
                    currentPag === i + 1
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-500 bg-white"
                  } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                  onClick={() => handleClick(i + 1)}
                  aria-current={currentPag === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                disabled={currentPag === numPages}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={handleNextClick}
              >
                Далі
              </button>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const { db } = await connectToDatabase();
    const collection = await db.collection("List_Gospel");

    const page = query.page ? parseInt(query.page) : 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const list = await collection
      .find()
      .skip(skip)
      .sort({ _id: -1 })
      .limit(limit)
      .toArray();
    const total = await collection.countDocuments();
    const numPages = Math.ceil(total / limit);

    return {
      props: {
        list: JSON.parse(JSON.stringify(list)),
        currentPage: page,
        numPages,
      },
    };
  } catch (e) {
    console.error(e);
  }
}

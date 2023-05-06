import Head from "next/head";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import Hstyle from "@/components/helpers/Hstyle";
import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

function NewlineText(props) {
  const text = props.text;
  const paragraphs = text.split(/\n{2,}/); // Split text into paragraphs with consecutive \n characters
  const newText = paragraphs.map((paragraph, i) => (
    <React.Fragment key={i}>
      {paragraph.split("\n").map((line, j) => (
        <p key={j}>{line}</p>
      ))}
      {i < paragraphs.length - 1 && <p>&nbsp;</p>}
    </React.Fragment>
  ));
  return newText;
}

export async function getServerSideProps(context) {
  try {
    const { db } = await connectToDatabase();
    const list = await db.collection(context.query.name_coll).findOne({
      _id: new ObjectId(context.query.doc),
    });
    return {
      props: {
        list: JSON.parse(JSON.stringify(list)),
        path_p: context.query.path_p,
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default function ReadData({ list, path_p }) {
  const [postsState, setPostsState] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setPostsState([list]);
    }
    fetchData();
  }, [list]);

  return (
    <>
      <Head>
        <title>Прочитати</title>
        <meta name="description" content="any description" />
      </Head>

      <main className="w-full flex flex-col items-center justify-center mt-1 min-h-screen">
        <Layout className="pt-16 sm:pt-8">
          <div className="text-4xl md:text-3xl sm:text-2xl">
            <Hstyle text="Читати" />
          </div>
          <div className="mt-5 sm:w-full"></div>
          {postsState.map((document) => (
            <div key={document._id}>
              <div className="mt-2 relative">
                <ul className="w-full flex flex-col items-start justify-between">
                  <div className="flex place-items-start lg:items-center justify-between lg:inline-block">
                    <Image
                      src={document.imageUrl}
                      width={100}
                      height={100}
                      alt="Uploaded Image"
                      className="w-1/4 lg:w-full h-auto inline-block"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="ml-1.5 md:ml-0">
                      <h3 className="font-mont text-royalNavy font-bold text-2xl uppercase">
                        {document._title}
                      </h3>
                      <div className="container ">
                        <p className="text-left font-normal text-stone-700 leading-6 text-base break-words">
                          <NewlineText text={document.text} />
                        </p>
                        <Link
                          href={path_p}
                          className="block w-min rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto mt-5"
                        >
                          Назад
                        </Link>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          ))}
        </Layout>
      </main>
    </>
  );
}

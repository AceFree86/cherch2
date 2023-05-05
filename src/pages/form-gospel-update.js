import Head from "next/head";
import React from "react";
import Hstyle from "@/components/helpers/Hstyle";
import Layout from "@/components/Layout";
import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import UpdateGospelForm from "@/components/form/UpdateGospelForm";

export default function FormGospelUpdate({ list, path_p }) {
  return (
    <>
      <Head>
        <title>Обновити Новини</title>
        <meta name="description" content="any description" />
      </Head>

      <main className="flex w-full flex-col items-center justify-center mt-1 min-h-screen">
        <Layout className="pt-16 sm:pt-8">
          <div className="text-4xl md:text-3xl sm:text-2xl">
            <Hstyle text="Обновлення ДАННих" />
          </div>
          <div className="flex items-center justify-center text-center w-full mx-auto py-2 "></div>
          <UpdateGospelForm initialValues={list} page={path_p} />
        </Layout>
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const { db } = await connectToDatabase();
    const list = await db.collection("List_Gospel").findOne({
      _id: new ObjectId(query.doc),
    });
    return {
      props: {
        list: JSON.parse(JSON.stringify(list)),
        path_p: query.path_p,
      },
    };
  } catch (e) {
    console.error(e);
  }
}

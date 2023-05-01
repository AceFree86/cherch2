import Head from "next/head";
import React from "react";
import Hstyle from "@/components/helpers/Hstyle";
import Layout from "@/components/Layout";
import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import UpdateNewsForm from "@/components/form/UpdateNewsForm";

export default function FormNewsUpdate({ list, path_p }) {
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
          <UpdateNewsForm initialValues={list} page={path_p} />
        </Layout>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { db } = await connectToDatabase();
    const list = await db.collection("List_News").findOne({
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

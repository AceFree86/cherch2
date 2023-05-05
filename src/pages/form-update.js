import Head from "next/head";
import React from "react";
import Layout from "@/components/Layout";
import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import UpdateGraphForm from "@/components/form/UpdateGraphForm";

export default function FormUpdate({ list }) {
  return (
    <>
      <Head>
        <title>Обновити список Богослужінь</title>
        <meta name="description" content="any description" />
      </Head>

      <main className="flex w-full flex-col items-center justify-center mt-1 min-h-screen">
        <Layout className="pt-16 sm:pt-8">
          <div className="text-4xl md:text-3xl sm:text-2xl ">
            <h1
              className="w-full mx-auto py-2 flex items-center justify-center
                 text-center overflow-hidden sm:py-0
                 font-mont text-royalNavy font-bold capitalize"
            >
              Обновити розклад
            </h1>
          </div>
          <UpdateGraphForm initialValues={list} />
        </Layout>
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const { db } = await connectToDatabase();
    const list = await db.collection("List_Day").findOne({
      _id: new ObjectId(query.doc),
    });
    return {
      props: { list: JSON.parse(JSON.stringify(list)) },
    };
  } catch (e) {
    console.error(e);
  }
}

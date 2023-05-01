import Head from "next/head";
import React from "react";
import Hstyle from "@/components/helpers/Hstyle";
import Layout from "@/components/Layout";
import AddNewsForm from "@/components/form/AddNewsForm";


export default function FormNewsAdd() {
  return (
    <>
      <Head>
        <title>Додати Новини</title>
        <meta name="description" content="any description" />
      </Head>

      <main className="flex w-full flex-col items-center justify-center mt-1 min-h-screen">
        <Layout className="pt-16 sm:pt-8">
          <div className="text-4xl md:text-3xl sm:text-2xl">
            <Hstyle text="ВНЕСТИ ДАННІ" />
          </div>
          <div className="flex items-center justify-center text-center w-full mx-auto py-2 "></div>
          <AddNewsForm />
        </Layout>
      </main>
    </>
  );
}

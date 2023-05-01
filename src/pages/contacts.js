import React, { useState, useEffect } from "react";
import Head from "next/head";
import Hstyle from "@/components/helpers/Hstyle";
import Layout from "@/components/Layout";

export default function Contacts() {
  

  return (
    <>
      <Head>
        <title>Контакти</title>
        <meta name="description" content="any description" />
      </Head>

      <main className="flex w-full flex-col items-center justify-center mt-1 min-h-screen">
        <Layout className="pt-16 sm:pt-8 ">
          <div className="text-4xl md:text-3xl sm:text-2xl">
            <Hstyle text="Контакти" />
          </div>
          <div className="flex items-center justify-center text-center w-full mx-auto py-2"></div>
        </Layout>
      </main>
    </>
  );
}

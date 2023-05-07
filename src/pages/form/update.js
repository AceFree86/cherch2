import Head from "next/head";
import React from "react";
import Layout from "@/components/Layout";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import Hstyle from "@/components/helpers/Hstyle";
import UpdateGraphForm from "@/components/form/UpdateGraphForm";
import UpdateGospelForm from "@/components/form/UpdateGospelForm";
import UpdateNewsForm from "@/components/form/UpdateNewsForm";

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
        form: context.query.form,
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default function FormUpdate({ list, path_p, form }) {
  let componentToRender;
  switch (form) {
    case "schedule":
      componentToRender = <UpdateGraphForm initialValues={list} />;
      break;
    case "gospel":
      componentToRender = <UpdateGospelForm initialValues={list} page={path_p} />;
      break;
    case "news":
      componentToRender = <UpdateNewsForm initialValues={list} page={path_p} />;
      break;
    default:
      componentToRender = null;
  }
  return (
    <>
      <Head>
        <title>Обновити Форму</title>
        <meta name="description" content="any description" />
      </Head>

      <main className="flex w-full flex-col items-center justify-center mt-1 min-h-screen">
        <Layout className="pt-16 sm:pt-8">
          <div className="text-4xl md:text-3xl sm:text-2xl ">
            <Hstyle text="ОБНОВИТИ ДАННІ" />
          </div>
          {componentToRender}
        </Layout>
      </main>
    </>
  );
}

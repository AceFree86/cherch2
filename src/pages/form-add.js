import Head from "next/head";
import { useRouter } from "next/router";
import Hstyle from "@/components/helpers/Hstyle";
import Layout from "@/components/Layout";
import AddGraphForm from "@/components/form/AddGraphForm";
import AddGospelForm from "@/components/form/AddGospelForm";
import AddNewsForm from "@/components/form/AddNewsForm";

export default function FormAdd() {
  const router = useRouter();
  const form = router.query.form;
  let componentToRender;
  switch (form) {
    case "gospel":
      componentToRender = <AddGospelForm />;
      break;
    case "news":
      componentToRender = <AddNewsForm />;
      break;
    default:
      componentToRender = <AddGraphForm />;
  }

  return (
    <>
      <Head>
        <title>Додати</title>
        <meta name="description" content="any description" />
      </Head>

      <main className="flex w-full flex-col items-center justify-center mt-1 min-h-screen">
        <Layout className="pt-16 sm:pt-8">
          <div className="text-4xl md:text-3xl sm:text-2xl">
            <Hstyle text="ВНЕСТИ ДАННІ" />
          </div>
          <div className="flex items-center justify-center text-center w-full mx-auto py-2 "></div>
          {componentToRender}
        </Layout>
      </main>
    </>
  );
}

import { connectToDatabase } from "../../lib/mongodb";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Hstyle from "@/components/helpers/Hstyle";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Timetable from "@/components/widgets/Timetable";

export const getStaticProps = async () => {
  try {
    const { db } = await connectToDatabase();
    const list = await db
      .collection("List_Day")
      .aggregate([
        {
          $addFields: {
            dayAsDate: {
              $dateFromString: {
                dateString: "$_day",
                format: "%d.%m.%Y",
              },
            },
          },
        },
        {
          $sort: {
            dayAsDate: 1,
          },
        },
      ])
      .toArray();

    return {
      props: { list: JSON.parse(JSON.stringify(list)) },
    };
  } catch (e) {
    console.error(e);
  }
};

export default function Schedule({ list }) {
  const { data } = useSession();
  return (
    <>
      <Head>
        <title>Розклад Богослужінь</title>
        <meta name="description" content="any description" />
      </Head>

      <main className="flex w-full flex-col items-center justify-center mt-1 min-h-screen">
        <Layout className="pt-16 sm:pt-8">
          <div className="text-4xl md:text-3xl sm:text-2xl">
            <Hstyle text="Розклад" />
          </div>
          <div className="flex items-center justify-center text-center w-full mx-auto py-2">
            {data?.user ? (
              <>
                <Link
                  href="/form-add"
                  className="shadow-sm bg-hadfieldBlue text-sm md:text-base hover:bg-hadfieldBlueLite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hadfieldBlue text-white py-2 px-4 rounded-md md:font-bold"
                >
                  Додати
                </Link>
              </>
            ) : null}
          </div>
          <div className="mt-5 sm:w-full">
            <Timetable state="start" doc={list} hiding={false} />
          </div>
        </Layout>
      </main>
    </>
  );
}

import { connectToDatabase } from "../../lib/mongodb";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import Hstyle from "@/components/helpers/Hstyle";
import Timetable from "@/components/widgets/Timetable";
import Infotable from "@/components/widgets/Infotable";
import OneList from "@/components/widgets/OneList";
import Pic from "../../public/images/nativite.jpeg"

export const getServerSideProps = async () => {
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

    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedToday = `${day}.${month}.${year}`;

    const filteredList = list.filter((post) => post._day === formattedToday);

    const gospel = await db
      .collection("List_Gospel")
      .find({})
      .limit(1)
      .sort({ $natural: -1 })
      .toArray();

    const news = await db
      .collection("List_News")
      .find({})
      .limit(2)
      .sort({ $natural: -1 })
      .toArray();

    const history = await db.collection("History").find({}).toArray();

    return {
      props: {
        todayList: JSON.parse(JSON.stringify(filteredList)),
        list: JSON.parse(JSON.stringify(list)),
        gospel: JSON.parse(JSON.stringify(gospel)),
        news: JSON.parse(JSON.stringify(news)),
        history: JSON.parse(JSON.stringify(history)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        list: [],
        gospel: [],
        news: [],
        history: [],
      },
    };
  }
};

export default function Home({todayList, list, gospel, news, history }) {
  return (
    <>
      <Head>
        <title>
          Греко-католицька парафія Різдва Пресвятої Богородиці мкр.Дравці
        </title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main className=" flex items-center text-dark w-full">
        <Layout className="min-h-screen pt-0 md:pt-16 sm:pt-8 grid place-items-center h-screen">
          <div className="border-t border-gray-500 border-b-gray-500 flex items-center justify-between w-full lg:flex-col rounded-lg bg-moonlight border">
            <div className="w-1/2">
              <Image
                src={Pic}
                width={100}
                height={100}
                alt="Церква Різдва Богородиці"
                className="w-full h-auto inline-block rounded-lg ml-2.5 mt-2.5 mb-2.5"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                as="image"
              />
            </div>

            <div className="w-1/2 lg:w-full ml-5 md:ml-0 flex-col items-center self-center text-left">
              <h1 className="w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden sm:py-0 font-mont text-royalNavy font-bold capitalize text-4xl md:text-3xl sm:text-2xl">
                {"Греко-Католицька парафія Різдва Пресвятої Богородиці"}
              </h1>
              <p className="w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden sm:py-0 font-mont text-royalNavy font-bold text-4xl md:text-3xl sm:text-2xl">
                {"мкр. Дравці"}
              </p>

              <OneList doc={todayList} />
              <div className="first:mt-1 last:mb-5 w-[60%] mx-auto flex flex-col justify-between md:w-[80%]">
                <ul className="border-b border-twilightBlue-400 mb-2 font-bold text-left w-full text-darkShade ist-disc max-w-md space-y-1">
                  <li>Настоятель храму </li>
                  <li>о. Павло Фіцай</li>
                  <li>
                    <a href={`tel:0667303179`}>моб. 0667303179</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Layout>
      </main>
      <main className="flex items-center text-dark w-full min-h-screen">
        <Layout className="pt-16 sm:pt-8">
          <Hstyle text="Розклад" />
          <div className="mt-5 sm:w-full">
            <Timetable state="center" doc={list} hiding={true} />
          </div>
        </Layout>
      </main>
      <section className="flex items-center text-dark w-full">
        <Layout className="pt-8">
          <Hstyle text="Проповіді" />
          <Infotable
            postsS={gospel}
            collection={"List_Gospel"}
            pathPage={"/"}
            n_folder={""}
            router={null}
            hiding={true}
          />
        </Layout>
      </section>
      <section className="flex items-center text-dark w-full">
        <Layout className="pt-8">
          <Hstyle text="Новини" />
          <Infotable
            postsS={news}
            collection={"List_News"}
            pathPage={"/"}
            n_folder={""}
            router={null}
            hiding={true}
          />
        </Layout>
      </section>
      <section className="w-full mb-16 flex flex-col items-center justify-center text-dark">
        <Layout className="pt-8">
          <Hstyle text="Історія" />
          <Infotable
            postsS={history}
            collection={"History"}
            pathPage={"/"}
            n_folder={""}
            router={null}
            hiding={true}
          />
        </Layout>
      </section>
      <section className="w-full mb-16 flex flex-col items-center justify-center text-dark">
        <Layout className="pt-8">
          <Hstyle text="Контакти" />
          <div className="mt-5 grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <article className="w-full flex items-center justify-between p-12 lg:flex-col lg:p-8 xs:p-4">
                <div className="w-1/2 lg:w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10557.696192339188!2d22.325410000000005!3d48.58257900000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47391bde37af41d3%3A0xa82320aab776021a!2z0KbQtdGA0LrQstCwINCg0ZbQt9C00LLQsCDQn9GA0LXRgdCy0Y_RgtC-0Zcg0JHQvtCz0L7RgNC-0LTQuNGG0ZY!5e0!3m2!1suk!2sua!4v1683050758815!5m2!1suk!2sua"
                    width="100%"
                    height="450"
                    className="w-full"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <h3 className="w-1/2 lg:w-full font-mont text-royalNavy font-bold flex flex-col items-start justify-between pl-6 lg:pl-0 lg:pt-6">
                  {
                    "вул. Жатковича, № 1, м. Ужгород (мкр. Дравці), Закарпатська обл. 88006"
                  }
                </h3>
              </article>
            </div>
          </div>
        </Layout>
      </section>
    </>
  );
}

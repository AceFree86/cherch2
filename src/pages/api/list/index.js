import { connectToDatabase } from "../../../../lib/mongodb";

async function getData(req, res) {
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

    res.status(200).json({
      list: JSON.parse(JSON.stringify(list)),
      todayList: JSON.parse(JSON.stringify(filteredList)),
      gospel: JSON.parse(JSON.stringify(gospel)),
      news: JSON.parse(JSON.stringify(news)),
      history: JSON.parse(JSON.stringify(history)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error fetching data",
    });
  }
}

export default getData;

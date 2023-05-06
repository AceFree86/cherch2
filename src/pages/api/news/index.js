import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const collection = await db.collection("List_News");

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const list = await collection
      .find()
      .skip(skip)
      .sort({ _id: -1 })
      .limit(limit)
      .toArray();
    const total = await collection.countDocuments();
    const numPages = Math.ceil(total / limit);

    res.status(200).json({
      list: JSON.parse(JSON.stringify(list)),
      currentPage: page,
      numPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error fetching data",
    });
  }
}

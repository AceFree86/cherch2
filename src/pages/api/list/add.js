import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const bodyObject = JSON.parse(req.body);
        const collection = await db.collection("List_Day");
        const result = await collection.insertOne(bodyObject);
        res.status(200).json({ message: "Save successfully" });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
      }
      break;
    default:
      break;
  }
}

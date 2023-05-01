import { connectToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { method } = req;
  switch (method) {
    case "DELETE":
      try {
        const todoID = JSON.parse(req.body);
        const collection = await db.collection("List_Gospel");
        await collection.deleteOne({
          _id: new ObjectId(todoID),
        });
        res.status(200).json({ message: "Todo deleted successfully" });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
      }
      break;
    default:
      break;
  }
}

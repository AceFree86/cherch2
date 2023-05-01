import { connectToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { method } = req;
  switch (method) {
    case "PUT":
      try {
        const { id, body } = JSON.parse(req.body);
        await db.collection("List_Day").updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              _day: body._day,
              stateDay: body.stateDay,
              namesSaints: body.namesSaints,
              labels: body.labels,
            },
          }
        );
        res.status(200).json({ message: "Update successfully" });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
      }
      break;
    default:
      break;
  }
}

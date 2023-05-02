import { connectToDatabase } from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const bodyObject = JSON.parse(req.body);
      const { db } = await connectToDatabase();
      const hashedPassword = await bcrypt.hash(bodyObject.password, 11);
      const result = await db.collection("User_Admin").insertOne({
        email: bodyObject.email,
        password: hashedPassword,
      });
      res.status(200).json({ message: "Save successfully" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}

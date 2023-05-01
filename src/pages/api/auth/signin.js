import { signIn } from "next-auth/react";

export default async function sign(req, res) {
  try {
    const data = await signIn("credentials", {
      redirect: false,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(data + " signIn");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

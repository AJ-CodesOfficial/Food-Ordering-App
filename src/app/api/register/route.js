import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();
  await mongoose.connect(process.env.MONGO_URL);

  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    return new Error("Password must be at least 5 characters long");
  }
  const notHashedPassword = pass;

  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}

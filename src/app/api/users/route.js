import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);

  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}

export async function DELETE(req) {
  await mongoose.connect(process.env.MONGO_URL);

  if (await isAdmin()) {
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");
    const user = await User.findOne({ _id });

    await User.findByIdAndDelete(_id);
    await UserInfo.findOneAndDelete({ email: user.email });

    return Response.json(true);
  } else {
    return Response.json([]);
  }
}

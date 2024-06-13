import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);

  if (await isAdmin()) {
    const { name } = await req.json();

    const categoryDoc = await Category.create({ name }).catch((error) => {
      throw new Error(error);
    });

    return Response.json(categoryDoc);
  } else {
    return Response.json([]);
  }
}

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);

  if (await isAdmin()) {
    const { _id, name } = await req.json();
    await Category.updateOne({ _id }, { name });

    return Response.json(true);
  } else {
    return Response.json([]);
  }
}

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);
  return Response.json(await Category.find());
}

export async function DELETE(req) {
  await mongoose.connect(process.env.MONGO_URL);

  if (await isAdmin()) {
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    await Category.findByIdAndDelete(_id);

    return Response.json(true);
  } else {
    return Response.json([]);
  }
}

import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, default: "User" },
    email: { type: String, unique: true, required: true },
    image: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = models?.User || model("User", UserSchema);

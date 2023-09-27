import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

export const User = new mongoose.model("User", Schema);

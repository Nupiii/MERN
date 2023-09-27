import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  }
});

export const Task = new mongoose.model("Task", Schema);

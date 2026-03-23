import {model, Schema } from "mongoose";

const chunkSchema = new Schema({
  text: { type: String, required: true },
  embedding: { type: [Number], required: true }, // vector array
});

const contentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["youtube", "tweet"], required: true },
    title: { type: String },
    link: { type: String, required: true },
    videoId: { type: String },
    summary: { type: String },
    tags: [{ type: String }],
    chunks: [chunkSchema], // array of { text, embedding }
  },
  { timestamps: true }
);

export default model("Content", contentSchema);
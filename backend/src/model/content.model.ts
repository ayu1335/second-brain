import { Schema,model } from "mongoose";

const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  // tags: [{ type: Schema.ObjectId, ref: 'Tag' }], 
  userId: { type: Schema.ObjectId, ref: 'User', required: true },
});

export default model('content', contentSchema);
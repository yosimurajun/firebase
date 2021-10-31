import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  type: String,
  title: String,
  content: Array,
  writer: String,
  photo: {
    type: String,
    require: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("blog", blogSchema);

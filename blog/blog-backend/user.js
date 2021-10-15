import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  type: {
    type: String,
    default: "guest",
  },
  userid: String,
  password: String,
});

export default mongoose.model("user", userSchema);

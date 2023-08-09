import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    // immutable: true,
    ref: "Author",
  },
});

export const User = mongoose.model("User", userSchema);

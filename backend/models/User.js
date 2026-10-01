import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    niches: {
      type: [String],
      default: [],
    },
    language: {
      type: String,
      default: "en",
    },
    bookmarks: {
      type: [
        {
          id: String,
          title: String,
          snippet: String,
          category: String,
          categoryBg: String,
          categoryText: String,
          source: String,
          sourceUrl: String,
          listenTime: String,
          durationMinutes: String,
          nicheId: String,
          savedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;


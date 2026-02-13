import mongoose from "mongoose";

const adminReplySchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      unique: true, 
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    replyText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model("AdminReply", adminReplySchema)

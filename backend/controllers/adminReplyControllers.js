import AdminReply from "../models/AdminReply.js"

export const addAdminReply = async (req, res) => {
  const { replyText } = req.body

  if (!replyText) {
    return res.status(400).json({ message: "Reply text required" });
  }

  const reply = await AdminReply.findOneAndUpdate(
    { postId: req.params.postId },
    {
      replyText,
      adminId: req.user._id,
    },
    { new: true, upsert: true }
  );

  res.status(201).json(reply)
};

export const getAdminReply = async (req, res) => {
  const reply = await AdminReply.findOne({
    postId: req.params.postId,
  }).populate("adminId", "name");

  res.json(reply)
}

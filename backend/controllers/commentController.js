import Comment from "../models/Comment.js"

export const addComment = async (req, res) => {
  const { text } = req.body

  if (!text) {
    return res.status(400).json({ message: "Comment text required" })
  }

  const comment = await Comment.create({
    postId: req.params.postId,
    userId: req.user._id,
    text,
  })

  await comment.populate("userId", "name")

  res.status(201).json(comment)
}

export const getCommentsByPost = async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId })
    .populate("userId", "name")
    .sort({ createdAt: -1 })

  res.json(comments)
}
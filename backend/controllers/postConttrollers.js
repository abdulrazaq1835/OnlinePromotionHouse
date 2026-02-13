import Post from "../models/Post.js";

export const createPost = async (req, res) => {
 try {
   const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }

  const post = await Post.create({
    title,
    content,
    author: req.user._id,
  });

  res.status(201).json({message:"Post created succesfully",post});
 } catch (error) {
  res.status(500).json({message:"internal server error post"})
 }
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author", "name role")
    .sort({ createdAt: -1 });

  res.json(posts)
};

export const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "name role"
  );

  if (!post) {
    return res.status(404).json({ message: "Post not found" })
  }

  res.json(post)
};

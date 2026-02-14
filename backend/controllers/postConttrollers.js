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
      author: req.user.id,
    });

    await post.populate("author", "name role");

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Internal server error post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name role")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name role"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Get single post error:", error);
    res.status(500).json({ message: "Failed to fetch post" });
  }
};
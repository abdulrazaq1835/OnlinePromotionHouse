import { useState } from "react";
import API from "../api/axios";

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/posts", { title, content });
      alert("Post created!");
      setTitle("");
      setContent("");
      if(onPostCreated) onPostCreated(res.data);
    } catch (err) {
      alert("Failed to create post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Create a Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full p-3 mb-3 border rounded focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full p-3 mb-3 border rounded focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
        Post
      </button>
    </form>
  );
};

export default CreatePost;

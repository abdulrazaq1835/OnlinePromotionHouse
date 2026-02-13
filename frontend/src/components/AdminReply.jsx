import { useState } from "react"
import API from "../api/axios"

const AdminReply = ({ postId, onReplyAdded }) => {
  const [content, setContent] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/reply", { postId, content });
      setContent("");
      if(onReplyAdded) onReplyAdded(res.data);
      alert("Admin reply added!");
    } catch (err) {
      alert("Failed to add admin reply")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-yellow-100 p-4 rounded">
      <textarea
        placeholder="Admin reply..."
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full p-3 border rounded mb-2 focus:ring-2 focus:ring-yellow-500"
      />
      <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition">
        Reply
      </button>
    </form>
  );
};

export default AdminReply

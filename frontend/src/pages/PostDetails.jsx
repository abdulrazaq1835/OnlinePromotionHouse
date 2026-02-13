import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../api/axios"
import CommentBox from "../components/CommentBox"
import AdminReply from "../components/AdminReply"

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null)

  const fetchPost = async () => {
    const res = await API.get(`/posts/${id}`);
    setPost(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center mt-10">Loading</p>

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white p-6 rounded shadow mb-4">
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p>{post.content}</p>
        </div>

        <CommentBox postId={post._id} onCommentAdded={fetchPost} />
        <AdminReply postId={post._id} onReplyAdded={fetchPost} />
      </div>
    </div>
  );
};

export default PostDetails

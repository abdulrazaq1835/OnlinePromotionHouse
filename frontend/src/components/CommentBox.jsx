import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import API from "../api/axios"

const CommentBox = ({ postId, onCommentAdded, isLoggedIn }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`)
      setComments(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      await API.post(`/comments/${postId}`, { text: newComment })
      setNewComment("")
      fetchComments()
      if (onCommentAdded) onCommentAdded()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-700">Comments</h3>
      
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 p-3 sm:p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-sm sm:text-base"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all text-sm sm:text-base whitespace-nowrap"
            >
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-4 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg text-center">
          <p className="text-gray-700 text-xs sm:text-sm md:text-base">
            <Link to="/login" className="text-purple-600 font-bold hover:underline">Login</Link>
            {" "}or{" "}
            <Link to="/register" className="text-pink-600 font-bold hover:underline">Register</Link>
            {" "}to comment
          </p>
        </div>
      )}

      <div className="space-y-2 sm:space-y-3">
        {comments.length === 0 && (
          <p className="text-gray-400 text-xs sm:text-sm italic text-center py-4">No comments yet. Be the first to comment!</p>
        )}
        
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs sm:text-sm">
                {comment.userId?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">
                  {comment.userId?.name || "Anonymous"}
                </p>
                <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base break-words leading-relaxed">
                  {comment.text}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentBox
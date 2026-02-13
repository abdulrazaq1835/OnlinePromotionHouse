import { useEffect, useState, useContext } from "react"
import API from "../api/axios"
import CreatePost from "../components/CreatePost"
import CommentBox from "../components/CommentBox"
import { AuthContext } from "../context/AuthContext"

const Home = () => {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts")
      setPosts(res.data.reverse())
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto">
        {user && <CreatePost onPostCreated={(newPost) => setPosts([newPost, ...posts])} />}
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Community Posts
        </h1>

        <div className="space-y-4 sm:space-y-6">
          {posts.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm sm:text-base">No posts yet. Be the first to share!</p>
            </div>
          )}

          {posts.map(post => (
            <div key={post._id} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-md">
                  {post.author?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm sm:text-base">
                    {post.author?.name || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gray-800">{post.title}</h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-600 leading-relaxed">{post.content}</p>

              <CommentBox postId={post._id} onCommentAdded={fetchPosts} isLoggedIn={!!user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
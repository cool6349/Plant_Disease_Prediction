import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminPanel() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handleAddPost = async () => {
    try {
      await axios.post("http://localhost:5000/api/posts", {
        title,
        content,
      });
      setTitle("");
      setContent("");
      fetchPosts(); // refresh list
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
        <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded">
          Back to Home
        </Link>
      </header>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Post Description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleAddPost}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Post
        </button>
      </div>

      <div>
        <h3 className="text-xl mb-2">All Posts</h3>
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <div>
                <h4 className="font-semibold">{post.title}</h4>
                <p className="text-sm">{post.content}</p>
              </div>
              <button
                onClick={() => handleDeletePost(post._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;

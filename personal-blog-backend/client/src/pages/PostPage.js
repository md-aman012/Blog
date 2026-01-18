import React from "react";
import { data, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import '../markdown-styles.css'
const PostPage = () => {
  const { id } = useParams(); //const params = useParams(); const id = params.id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const url = `http://localhost:5000/api/posts/${id}`;
    const fetchpost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url);
        setPost(response.data);
      } catch (error) {
        console.log("Error on postpage", error);
        if (error.response && error.response.status === 404) {
          setError("Post not found.");
        } else {
          setError("Failed to load the post. Please try again later.");
        }
      }finally{
        setLoading(false)
      }
    };
    fetchpost();
  }, [id]);

  
  if (loading) {
    return <div>Loading post...</div>;
  }

   if (error) {
    // We can render a more prominent error message
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>Error: {error}</div>;
  }
    if (!post) {
    return <div>Post not found.</div>;
  }
  return (
    <article className="post-full">
        <h1>{post.title}</h1>
        <div className="post-full-meta">
            <span>by {post.author}</span>
            <span>Published on {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="post-full-content">
            <ReactMarkdown>
              {post.markdownContent}
            </ReactMarkdown>
        </div>
    </article>
  );
};
export default PostPage;

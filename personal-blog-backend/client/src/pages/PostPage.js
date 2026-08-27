import React from "react";
import {useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import '../markdown-styles.css'
import apiService from "../services/apiService";
const PostPage = () => {
  const { slug} = useParams(); //const params = useParams(); const id = params.id;
  console.log(slug);
  // console.log(id, "this is id");
  
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    // const url = `http://localhost:5000/api/posts/${slug}`;
    const fetchpost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.get(`/api/posts/${slug}`);
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
  }, [slug]);

  
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
            <span>by By: {post.author?.username || 'Anonymous'}</span>
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

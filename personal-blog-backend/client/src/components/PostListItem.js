import React from "react";
import { Link } from "react-router-dom";
const PostListItem = ({post}) => {
    const snippet = post.markdownContent
        snippet.replace(/[#*`]/g, '') // A simple regex to remove common markdown characters
        snippet.substring(0, 150)
    return(
        <Link to={`/post/${post.slug}`} className="post-link">
        <article className="post-list-item">
            <h2>{post.title}</h2>
            <div className="post-meta">
                <span>by:{post.author?.username || 'Anonymous'}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <p>{snippet}</p>
        </article>
        </Link>
    )
}

export default PostListItem
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import apiService from '../services/apiService'
import './AdminDashboard.css'
const AdminDashboard = () => {
    const [post,setPost] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        const fetchpost = async () =>{
            try {
                const response = await apiService.get('/posts/admin/my-posts');
                setPost(response.data);
            } catch (error) {
                console.log("Failed to fetch post:", error);
                setError("failed to fetch post,please try again");
                
            }finally{
              setLoading(false)
            }
        }
        fetchpost();
    },[]);

    const handleDelete = async (postid) => {
      const isConfirmed = window.confirm('Are you sure want to deleted this post');
      if(!isConfirmed){
        return;
      }
      try {
        await apiService.delete(`/posts/${postid}`)
        
        // We use the functional form of setPosts to ensure we're working with the latest state.
      // The .filter() method creates a NEW array containing only the posts whose _id does NOT match the deleted postId.
      // This is the correct, immutable way to remove an item from state in React.

        setPost(currentpost => currentpost.filter(post => post._id !== postid))
        alert("Post deleted successfully")
      } catch (error) {
          console.error('Failed to delete post:', error);
        alert('Failed to delete the post. Please try again.');
      }
    }

    if(loading){
         return <div className="loading-message">Loading posts...</div>;
    }
    if (error) {
    return <div className="error-message">{error}</div>;
  }

    return(
       <div className="admin-dashboard">
        
            <div className="dashboard-header">
                <h2>Manage Post</h2>
                <Link to="/admin/create-post" className="create-post-btn">
          + create New Post
          </Link>
            </div>
            <table className="posts-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* 10. Check if there are posts to display */}
          {post.length > 0 ? (
            // 11. Map over the posts array to render a table row for each post.
            post.map((post) => (
              // The 'key' prop is essential for React's rendering performance.
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.author?.username|| "Anonymous"  }</td>
                
                {/* Format the date for better readability */}
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                 <td className="action-buttons">
                  <Link to={`/admin/edit-post/${post._id}`} className="btn-edit-btn">
                    Edit
                  </Link>
                  <button className="btn-delete-btn" 
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            // 12. Display a message if no posts are found.
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No posts found.</td>
            </tr>
          )}
        </tbody>
      </table>

       </div>
    )
}
export default AdminDashboard;
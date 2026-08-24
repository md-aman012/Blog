import React from "react";
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import './CreatePost.css';
import apiService from "../services/apiService";

const EditPost = () => {
    const {id} = useParams();

    console.log(id)
    const[title, setTitle] = useState('');
    const[markdownContent, setMarkdownContent] = useState('');
    const[error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    const[submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchpost = async () =>{
            setLoading(true);
            try {
              const response = await apiService.get(`/api/posts/id/${id}`);
                console.log(response.data.title);
                
                setTitle(response.data.title);
                setMarkdownContent(response.data.markdownContent);

            } catch (error) {
                // console.log('failed to fetch post editing',error);
                // setError('failed to load post data please try again');
                console.log('failed to fetch post editing', error?.response || error);
                setError(error?.response?.data?.message || 'failed to load post data please try again');
            }finally{
                setLoading(false);
            }
        };
        fetchpost();
    },[id]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError('');
        if(!title.trim() || !markdownContent.trim()){
            setError('Please Enter Title and Content');
            setSubmitting(false);
            return;
        }
        try {
            await apiService.put(`/api/posts/${id}`,{
                title,
                markdownContent,
            });
            navigate('/admin/dashboard');
        } catch (error) {
            console.log("Failed to update post", error);
             setError(error.response?.data?.message || 'Failed to update post. Please try again.');
            setSubmitting(false);
            
        }
    };
    if(loading){
          return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading post...</div>;
    }
    return(
    <div className="create-post-page">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="markdownContent">Content (Markdown)</label>
          <textarea
            id="markdownContent"
            className="form-control markdown-input"
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            disabled={submitting}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
    );
}

export default EditPost;
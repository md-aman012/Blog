import React, {useState} from "react";
import { useNavigate,useParams } from "react-router-dom";
import apiService from "../services/apiService";
import './CreatePost.css'

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [markdownContent, setMarkdownContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if(!title.trim() || !markdownContent.trim()){
            setError('Title and content are required');
            setLoading(false);
            return;
        }

        try {
            await apiService.post('/posts',{
                title,
                markdownContent
            });
            navigate('/admin/dashboard');
        } catch (error) {
            console.log("failed to create post", error)
            setError(error.response?.data?.message || 'failed to create post. please try again')
            setLoading(false);
        }
    }
    return (
        <div className="create-post-page">
            <h2>Create New post</h2>
            <form onSubmit={handleSubmit} className="create-post-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Post Title"
                        disabled={loading}
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="markdownContent">Content (markdown)</label>
                    <textarea 
                        id="markdownContent"
                        className="form-control markdown-input"
                        value={markdownContent}
                        onChange={(e) => setMarkdownContent(e.target.value)}
                        placeholder="Write your post content here using Markdown ..."
                        disabled={loading}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
               <button type="submit" className="submit-btn" disabled={loading}>
                 {loading ? 'Publishing' : 'Publish Post'}
               </button>

            </form>
        </div>
    )
}

export default CreatePost;
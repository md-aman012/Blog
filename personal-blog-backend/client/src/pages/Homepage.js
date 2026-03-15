import { useState,useEffect } from "react";
import axios from 'axios';
import PostListItem from "../components/PostListItem";
import apiService from "../services/apiService";
const Homepage = () => {
    // post = array , loading = boolean, error = string
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchpost = async () =>{
            try {
                //Use axios to send a GET request to our backend API endpoint.
                // Make sure your backend server is running! The URL must match the port your server is on.
                const response = await apiService.get("api/posts")
                setPosts(response.data);
                setError(null);
            } catch (error) {
                setError("failed to get post please try again")
                console.log("error fetching post",error)
            }finally{
                setLoading(false)
            }

        }
        fetchpost();

    }, [])

    if(loading){
        return <div>loading post ...</div>
    }
    if(error){
        return <div style={{color:'red'}}>{error}</div>
    }
    return(
        <div>
            <h1>Blog Posts</h1>
            {posts.length === 0 ?(
                <p>No post yet</p>
            ): (
                <div>
                     {posts.map(post => (
                        <PostListItem key={post._id} post={post}/>
                    ))}
                </div>
            )}
        </div>
    )
}
export default Homepage;
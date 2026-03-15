import axios from "axios";
const apiService = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
apiService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        //If an error occurs during the request setup, we pass it along.
    // This is for handling errors before the request is even sent.
        return Promise.reject(error)
    }
);


export default apiService;
// client/src/pages/LoginPage.js

import React from 'react';
import { useState } from 'react';
import './LoginPage.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (event) =>{
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login',{
        username,
        password
      })
      
      localStorage.setItem('token',response.data.token);
      
      navigate('/admin/dashboard')
      // console.log("login successful:" , response.data)
      // alert("Login successful check the console for token");

    } catch (error) {
      console.log("login failed" ,error);
      if(error.response&& error.response.data && error.response.data.message){
           setError(error.response.data.message);
      }else{
         setError('Login failed. Please try again.');
      }
    }finally{
      setLoading(false);
    }
    

  }
  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <div classname="form-group">
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id = 'username'
            name='username'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className='form-group'>
           <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            // The input's value is controlled by the 'password' state variable.
            value={password}
            // The 'onChange' handler updates the state.
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <button type='submit' className='login-button' disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
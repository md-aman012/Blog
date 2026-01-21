// client/src/pages/LoginPage.js

import React from 'react';
import { useState } from 'react';
import './LoginPage.css'

const LoginPage = () => {
  const [username,setUsername] = useState('');
  const [pass,setPassword] = useState('');

  const handleSubmit = (event) =>{
    event.preventDefault();
    

  }
  return (
    <div>
      <h1>Admin Login</h1>
      <p>The login form will be here.</p>
    </div>
  );
};

export default LoginPage;
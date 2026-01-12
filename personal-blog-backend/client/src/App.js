import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import PostPage from "./pages/PostPage";
import Navbar from "./components/Navbar";
import './index.css';
function App() {
  return (
   <BrowserRouter>
      <div className="App">
        <Navbar/>
       <main style={{ padding: '1rem' }}>
         <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/post/:id" element={<PostPage/>} />
          <Route path="/admin/login" element={<AdminDashboard/>} />
          <Route path="/login" element={<LoginPage/>} />
          
        </Routes>
       </main>
      </div>
   </BrowserRouter>
  );
}

export default App;

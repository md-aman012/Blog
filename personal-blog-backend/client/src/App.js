import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import PostPage from "./pages/PostPage";
import Navbar from "./components/Navbar";
import './index.css';
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost"
function App() {
  return (
   <BrowserRouter>
      <div className="App">
        <Navbar/>
       <main style={{ padding: '1rem' }}>
         <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/post/:id" element={<PostPage/>} />
          <Route path="/admin/dashboard" 
             element={<ProtectedRoute>
              <AdminDashboard/>
             </ProtectedRoute>}
           />
          <Route path="/admin/login" element={<LoginPage/>} />
          <Route path="/admin/create-post"
            element={<ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>}
          />
          <Route path="/admin/edit-post/:id"
            element={<ProtectedRoute>
              <EditPost />
            </ProtectedRoute>}
          />
          
        </Routes>
       </main>
      </div>
   </BrowserRouter>
  );
}

export default App;

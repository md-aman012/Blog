import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

 const Navbar = () => {
    const [isAuthed, setIsAuthed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setIsAuthed(Boolean(localStorage.getItem("token")));
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthed(false);
        navigate("/admin/login");
    };

    return(
        <nav className="navbar">
            <Link to="/" className="navbar-brand">My Blog</Link>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isAuthed ? (
                    <>
                        <li>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <button type="button" onClick={handleLogout} className="link-button">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/admin/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </>
                )}
                

            </ul>
        </nav>
    )
 }

export default Navbar;
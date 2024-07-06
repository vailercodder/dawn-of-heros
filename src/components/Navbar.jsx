import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="nav">
      <img
        src="./img/mr-incredible-logo-the-incredibles-symbol-superhero-the-incredibles-7e2b5efdca604a64903f39db9c7c0776 (1).png"
        alt="Logo"
        className="nav_img"
      />
      <ul className="nav_bar">
        <li className="nav_opt">
          <Link to="/home">Home</Link>
        </li>
        <li className="nav_opt">
          <Link to="/hero-gallery">Hero gallery</Link>
        </li>
        <li className="nav_opt">
          <Link to="/my-collection">My collection</Link>
        </li>
        <li className="nav_opt">
          <Link to="/battle">Battle!</Link>
        </li>
        <li className="nav_opt">
          <button className="nav_opt_btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

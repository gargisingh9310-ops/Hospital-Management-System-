import React from "react";
import { FiBell, FiUser, FiMenu } from "react-icons/fi";
import "../stylesheet/Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <button className="menu-btn">
          <FiMenu />
        </button>
        <h1 className="navbar-title">Hospital Dashboard</h1>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <div className="icon-btn">
          <FiBell />
          <span className="badge">3</span>
        </div>

        <div className="user">
          <FiUser />
          <span>Admin</span>
        </div>
      </div>

    </div>
  );
}
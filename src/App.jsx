import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { FiMenu } from "react-icons/fi";
import "./stylesheet/App.css";

export default function App() {
  const [activeModule, setActiveModule] = useState("patients");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">

      {/* Sidebar */}
      <Sidebar
        setActiveModule={setActiveModule}
        activeModule={activeModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Area */}
      <div className="main-container">

        {/* Navbar */}
        <div className="navbar">
          <h1 className="navbar-title">Hospital Dashboard</h1>

          <div
            className="menu-icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu size={22} />
          </div>
        </div>

        {/* Dashboard */}
        <div className="dashboard-container">
          <Dashboard activeModule={activeModule} />
        </div>
      </div>
    </div>
  );
}
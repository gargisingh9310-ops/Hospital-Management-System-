import React from "react";
import { FiBox, FiActivity } from "react-icons/fi";
import "../stylesheet/Inventory.css";

export default function Inventory() {
  return (
    <div className="inventory-container">

      {/* HEADER CARD */}
      <div className="inventory-card">
        <h2>
          <FiBox /> Inventory Management
        </h2>
        <p>Manage medicines, stock and hospital inventory easily.</p>
      </div>

      {/* GRID */}
      <div className="inventory-grid">

        <div className="inventory-box">
          <FiActivity className="icon" />
          <h3>Medicine Stock</h3>
          <p>Track available medicines and quantities.</p>
        </div>

        <div className="inventory-box">
          <FiActivity className="icon" />
          <h3>Low Stock Alert</h3>
          <p>Identify medicines that need restocking.</p>
        </div>

        <div className="inventory-box">
          <FiActivity className="icon" />
          <h3>Purchase History</h3>
          <p>View all previous medicine purchases.</p>
        </div>

        <div className="inventory-box">
          <FiActivity className="icon" />
          <h3>Medicine Shop</h3>
          <p>Sell medicines directly to patients.</p>
        </div>

      </div>
    </div>
  );
}
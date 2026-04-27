import React from "react";
import "../stylesheet/Popup.css";

export default function Popup({ message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <p>{message}</p>

        <button className="popup-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
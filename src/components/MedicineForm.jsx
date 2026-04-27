import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_MEDICINE } from "../Redux/constants";
import { FiBox, FiDollarSign, FiLayers, FiPackage } from "react-icons/fi";
import "../stylesheet/MedicineForm.css";

export default function MedicineForm() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    manufacturer: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: ADD_MEDICINE,
      payload: { id: Date.now(), ...form },
    });

    setForm({
      name: "",
      price: "",
      quantity: "",
      manufacturer: "",
    });

    alert("Medicine added successfully");
  };

  return (
    <div className="medicine-wrapper">
      <form className="medicine-form" onSubmit={handleSubmit}>
        <h2><FiBox /> Add Medicine</h2>

        <div className="form-grid">

          {/* NAME */}
          <div className="form-group">
            <label><FiPackage /> Medicine Name</label>
            <input
              type="text"
              placeholder="Enter medicine name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
          </div>

          {/* PRICE */}
          <div className="form-group">
            <label><FiDollarSign /> Price (₹)</label>
            <input
              type="number"
              placeholder="Enter price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              required
              min="0"
            />
          </div>

          {/* QUANTITY */}
          <div className="form-group">
            <label><FiLayers /> Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
              required
              min="0"
            />
          </div>

          {/* MANUFACTURER */}
          <div className="form-group">
            <label>Manufacturer</label>
            <input
              type="text"
              placeholder="Enter manufacturer"
              value={form.manufacturer}
              onChange={(e) =>
                setForm({ ...form, manufacturer: e.target.value })
              }
              required
            />
          </div>

        </div>

        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
}
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_MEDICINE } from "../Redux/constants";
import { FiTrash2 } from "react-icons/fi";
import "../stylesheet/MedicineList.css";

export default function MedicineList() {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines);

  const handleDelete = (id) => {
    dispatch({ type: DELETE_MEDICINE, payload: id });
  };

  return (
    <div className="medicine-list">
      <h2>Medicine Inventory</h2>

      {medicines.length === 0 ? (
        <p className="empty">No medicines in inventory</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Price (₹)</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {medicines.map((m) => (
                <tr key={m.id}>
                  <td className="name">{m.name}</td>
                  <td>{m.manufacturer}</td>
                  <td>₹{m.price}</td>

                  <td>
                    <span
                      className={`badge ${
                        m.quantity <= 5
                          ? "low"
                          : m.quantity <= 15
                          ? "medium"
                          : "high"
                      }`}
                    >
                      {m.quantity}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(m.id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
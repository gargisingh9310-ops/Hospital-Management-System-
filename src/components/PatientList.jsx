import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_PATIENT } from "../Redux/constants";
import { FiTrash2 } from "react-icons/fi";
import "../stylesheet/PatientList.css";

export default function PatientList() {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients);

  const handleDelete = (id) => {
    dispatch({ type: DELETE_PATIENT, payload: id });
  };

  return (
    <div className="patient-list">
      <h2>Patients List</h2>

      {patients.length === 0 ? (
        <p className="empty">No patients added yet</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td className="id">{p.id}</td>
                  <td className="name">{p.name}</td>
                  <td>
                    <span className="age-badge">{p.age}</span>
                  </td>
                  <td>
                    <span
                      className={`gender ${
                        p.gender === "Male" ? "male" : "female"
                      }`}
                    >
                      {p.gender}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(p.id)}
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
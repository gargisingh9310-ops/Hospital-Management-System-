import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_BILL } from "../Redux/constants";
import { FiPrinter, FiTrash2 } from "react-icons/fi";
import "../stylesheet/BillList.css";

export default function BillList() {
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bills);

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [popup, setPopup] = useState(""); // ✅ custom popup

  const handleDelete = (id) => {
    dispatch({ type: DELETE_BILL, payload: id });
    setDeleteConfirm(null);

    // ❌ alert removed → custom popup
    setPopup("Bill deleted successfully ✔");

    setTimeout(() => setPopup(""), 1200);
  };

  const handlePrint = (bill) => {
    const printWindow = window.open("", "", "height=600,width=800");

    printWindow.document.write(`
      <html>
      <head>
        <title>Bill - ${bill.patientName}</title>
        <style>
          body { font-family: Arial; padding:20px; }
          .container { max-width:600px; margin:auto; }
          h1 { text-align:center; }
          .row { display:flex; justify-content:space-between; margin:10px 0; }
          table { width:100%; border-collapse: collapse; margin-top:20px; }
          th, td { padding:10px; border-bottom:1px solid #ddd; }
          .total { text-align:right; font-weight:bold; margin-top:20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hospital Bill</h1>

          <div class="row">
            <div>Patient: ${bill.patientName}</div>
            <div>Doctor: Dr. ${bill.doctorName}</div>
          </div>

          <div class="row">
            <div>Date: ${bill.date}</div>
            <div>Time: ${bill.time}</div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Consultation</td>
                <td>${bill.doctorFee}</td>
              </tr>

              ${bill.medicines
                .map(
                  (m) => `
                  <tr>
                    <td>${m.name}</td>
                    <td>${m.price}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>

          <div class="total">
            Total: ₹${bill.totalAmount}
          </div>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bill-list">

      {/* ✅ POPUP */}
      {popup && <div className="custom-popup">{popup}</div>}

      <h2>Billing Records</h2>

      {bills.length === 0 ? (
        <p className="no-data">No bills available</p>
      ) : (
        <div className="bills-container">
          {bills.map((bill) => (
            <div key={bill.id} className="bill-card">

              {/* HEADER */}
              <div className="bill-header">
                <div>
                  <h3>{bill.patientName}</h3>
                  <p>Dr. {bill.doctorName} • {bill.date}</p>
                </div>
                <span className="amount">₹{bill.totalAmount}</span>
              </div>

              {/* BODY */}
              <div className="bill-body">
                <div className="row">
                  <span>Consultation</span>
                  <span>₹{bill.doctorFee}</span>
                </div>

                {bill.medicines.length > 0 && (
                  <>
                    <div className="divider"></div>
                    {bill.medicines.map((m, i) => (
                      <div key={i} className="row">
                        <span>{m.name}</span>
                        <span>₹{m.price}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* FOOTER */}
              <div className="bill-footer">

                {deleteConfirm === bill.id ? (
                  <div className="confirm-box">
                    <p>Delete this bill?</p>

                    <div className="confirm-actions">
                      <button
                        className="btn danger"
                        onClick={() => handleDelete(bill.id)}
                      >
                        Yes
                      </button>

                      <button
                        className="btn"
                        onClick={() => setDeleteConfirm(null)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      className="btn print"
                      onClick={() => handlePrint(bill)}
                    >
                      <FiPrinter /> Print
                    </button>

                    <button
                      className="btn delete"
                      onClick={() => setDeleteConfirm(bill.id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </>
                )}

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
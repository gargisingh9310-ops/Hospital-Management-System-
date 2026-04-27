import React, { useState } from "react";
import { useSelector } from "react-redux";
import SalesAnalytics from "./SalesAnalytics";
import { FiPrinter } from "react-icons/fi";
import "../stylesheet/PurchaseHistory.css";

export default function PurchaseHistory() {
  const purchaseHistory = useSelector((state) => state.purchaseHistory);
  const [filterPatient, setFilterPatient] = useState("");

  const filtered = filterPatient
    ? purchaseHistory.filter((p) => p.patientId.toString() === filterPatient)
    : purchaseHistory;

  const handlePrint = (purchase) => {
    const w = window.open("", "", "height=600,width=800");

    w.document.write(`
      <html>
      <head>
        <title>Receipt - ${purchase.patientName}</title>
        <style>
          body{font-family:Arial;padding:20px}
          h1{text-align:center}
          table{width:100%;border-collapse:collapse;margin-top:20px}
          th,td{border-bottom:1px solid #ddd;padding:8px;text-align:left}
          .total{margin-top:20px;text-align:right;font-weight:bold}
        </style>
      </head>
      <body>
        <h1>Hospital Receipt</h1>
        <p><strong>Patient:</strong> ${purchase.patientName}</p>
        <p><strong>Date:</strong> ${purchase.date} | ${purchase.time}</p>

        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${purchase.medicines
              .map(
                (m) => `
              <tr>
                <td>${m.name}</td>
                <td>${m.quantity}</td>
                <td>${m.price}</td>
                <td>${m.subtotal}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>

        <div class="total">Total: ₹${purchase.totalAmount}</div>
      </body>
      </html>
    `);

    w.document.close();
    w.print();
  };

  return (
    <div className="purchase-container">
      <SalesAnalytics />

      <div className="purchase-history">
        <h2>Purchase History</h2>

        {purchaseHistory.length > 0 && (
          <div className="filter">
            <label>Filter by Patient</label>
            <select
              value={filterPatient}
              onChange={(e) => setFilterPatient(e.target.value)}
            >
              <option value="">All</option>
              {[...new Map(purchaseHistory.map(p => [p.patientId, p])).values()]
                .map((p) => (
                  <option key={p.patientId} value={p.patientId}>
                    {p.patientName}
                  </option>
                ))}
            </select>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="empty">No purchases found</p>
        ) : (
          <div className="cards">
            {filtered.map((p) => (
              <div key={p.id} className="card">
                <div className="card-head">
                  <div>
                    <h3>{p.patientName}</h3>
                    <p>{p.date} • {p.time}</p>
                  </div>
                  <span className="amount">₹{p.totalAmount}</span>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Medicine</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.medicines.map((m, i) => (
                        <tr key={i}>
                          <td>{m.name}</td>
                          <td>{m.quantity}</td>
                          <td>{m.price}</td>
                          <td>{m.subtotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  className="btn-print"
                  onClick={() => handlePrint(p)}
                >
                  <FiPrinter /> Print
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
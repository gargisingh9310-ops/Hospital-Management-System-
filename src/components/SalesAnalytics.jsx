import React from "react";
import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../stylesheet/SalesAnalytics.css";

export default function SalesAnalytics() {
  const bills = useSelector((state) => state.bills) || [];
  const purchaseHistory = useSelector((state) => state.purchaseHistory) || [];

  const calculateData = () => {
    let doctor = 0;
    let meds = 0;

    bills.forEach((b) => {
      doctor += b.doctorFee || 0;
      b.medicines?.forEach((m) => (meds += m.price || 0));
    });

    purchaseHistory.forEach((p) => {
      p.medicines?.forEach((m) => (meds += m.subtotal || 0));
    });

    const total = doctor + meds;
    if (!total) return [];

    return [
      {
        name: "Doctor Fees",
        value: doctor,
        percentage: Math.round((doctor / total) * 100),
      },
      {
        name: "Medicines",
        value: meds,
        percentage: Math.round((meds / total) * 100),
      },
    ];
  };

  const data = calculateData();
  const total = data.reduce((a, b) => a + b.value, 0);

  const COLORS = ["#4f46e5", "#06b6d4"];

  return (
    <div className="analytics">
      <h2>Hospital Revenue Analytics</h2>

      {data.length === 0 ? (
        <div className="no-data">No revenue data available</div>
      ) : (
        <div className="analytics-grid">
          {/* CHART */}
          <div className="chart-card">
            <h3>Revenue Distribution</h3>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* SUMMARY */}
          <div className="summary-card">
            <h3>Summary</h3>

            <div className="cards">
              {data.map((item, i) => (
                <div key={i} className="mini-card">
                  <span
                    className="dot"
                    style={{ background: COLORS[i] }}
                  ></span>

                  <div>
                    <h4>{item.name}</h4>
                    <p>₹{item.value.toLocaleString()}</p>
                    <small>{item.percentage}%</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="total-box">
              <p>Total Collection</p>
              <h2>₹{total.toLocaleString()}</h2>
            </div>

            {/* TABLE */}
            <div className="table-box">
              <table>
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Amount</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.name}</td>
                      <td>₹{d.value}</td>
                      <td>{d.percentage}%</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td>Total</td>
                    <td>₹{total}</td>
                    <td>100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
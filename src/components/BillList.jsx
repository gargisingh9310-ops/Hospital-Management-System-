import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_BILL } from '../Redux/constants';
import "../stylesheet/BillList.css";

export default function BillList() {
    const dispatch= useDispatch();
    const bills= useSelector((state) => state.bills)
    const [deleteConfirm, setDeleteConfirm]= useState(null);

    const handleDelete= (id)=> {
        dispatch({type: DELETE_BILL, payload: id});
        setDeleteConfirm(null);
        alert("Bill deleted successfully")
    };

    const handlePrint= (bill)=> {
        const printWindow= window.open("", "", "height=600, width=800");
        printWindow.document.write(`
            <html>
            <head>
            <title>Bill - ${bill.patientName}</title>
            <style>
            body { font-family: Arial, sans-serif; margin:20px; }
            .bill-container{max-width: 600px; margin:0 auto;}
            .bill-header {text-align: center; border-bottom: 2px sollid #333; padding-bottom: 10px; margin-bottom: 2px}
            .bill-header h1 {margin: 0;}
            .info-section {margin: 20px 0; display: flex; justify-content: space-between;}
            info-block{flex:1;}
            .info-block label {font-weight: bold; color: #666;}
            .info-block p{margin: 5px 0;}
            table{width: 100%; border-collapse: collapse; margin: 20px 0;}
            th{background-color: #f0f0f0; padding:10px; text-align:left; border-bottom: 1px solid #ddd;}
            td{padding: 10px; border-bottom: 1px solid #ddd}
            .bill-total{text-align: right; font-weight: bold; font-size: 18px; padding-top: 20px; border-top: 2px solid #333}
            .print-footer{text-align: center; margin-top: 30px; color: #999}
          </style> 
        </head>
      <body>
  <div class="bill-container">
    <div class="bill-header">
      <h1>Hospital Management System</h1>
      <p>Bill Receipt</p>
    </div>

    <div class="info-section">
      <div class="info-block">
        <label>Patient:</label>
        <p>${bill.PatientName}</p>
      </div>
      <div class="info-block">
        <label>Doctor:</label>
        <p>Dr. ${bill.doctorName}</p>
      </div>
    </div>

    <div class="info-section">
      <div class="info-block">
        <label>Date:</label>
        <p>${bill.date}</p>
      </div>
      <div class="info-block">
        <label>Time:</label>
        <p>${bill.time}</p>
      </div>
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
          <td>Doctor consultation</td>
          <td>₹{bill.doctorFee}</td>
        </tr>
        ${bill.medicines.map((med)=> `
          <tr>
            <td>${med.name}</td>
            <td>${med.price}</td>
          </tr>
          `).join("")}
      </tbody>
    </table>

    <div class="bill-total">
      <div>Total Amount: ₹${bill.totalAmount}</div>
    </div>

    <div class="print-footer">
      <p>Thank you for visiting us!</p>
    </div>
  </div>
</body>
</html>  
`);
printWindow.document.close();
printWindow.print();
};

  return (
    <div className='bill-list'>
      <h2>Bills</h2>
      {bills.length === 0? (
        <p className='no-data'>No bills generated yet</p>
      ): (
        <div className='bills-container'>
          {bills.map((bill)=> (
            <div key={bill.id} className='bill-card'>
              <div className='bill-card-header'>
                <div>
                  <h3>{bill.patientName}</h3>
                  <p className='bill-date'> Dr. {bill.doctorName} . {bill.date}</p>
                </div>
                <div className='bill-amount'>₹{bill.totalAmount}</div>
              </div>

              <div className='bill-card-body'>
                <div className='bill-item'>
                  <span>Consultation Fee</span>
                  <span>₹{bill.doctorFee}</span>
                </div>

                {bill.medicines.length > 0 &&(
                  <>
                  <div className='bill-divider'></div>
                  <div className='medicines-section'>
                    <p className='section-title'>Medicines:</p>
                    {bill.medicines.map((med, idx)=> (
                      <div key={idx} className='medicine-line'>
                        <span>{med.name}</span>
                        <span>₹{med.price}</span>
                      </div>
                    ))}
                  </div>
                  </>
                )}
              </div>

              <div className='bill-card-footer'>
                {deleteConfirm === bill.id ? (
                  <div className='confirm-delete'>
                    <p>Delete this bill?</p>
                    <button className='btn-confirm-delete' onClick={()=> handleDelete(bill.id)}>
                      Yes
                    </button>
                    <button className='btn-cancel-delete' onClick={()=> setDeleteConfirm(null)}>
                      No
                    </button>
                  </div>
                ): (
                  <>
                  <button className='btn-print' onClick={()=> handlePrint(bill)}>Print Bill</button>
                  <button className='btn-delete-bill' onClick={()=> setDeleteConfirm(bill.id)}>Delete</button>
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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BillGeneration from "./BillGeneration";
import { DELETE_APPOINTMENT } from "../Redux/constants";
import {
  FiUser,
  FiClock,
  FiCalendar,
  FiTrash2,
  FiFileText,
} from "react-icons/fi";
import "../stylesheet/AppointmentList.css";

export default function AppointmentList({ doctorFilter = null }) {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);
  const patients = useSelector((state) => state.patients);
  const doctors = useSelector((state) => state.doctors);

  const [cancelConfirm, setCancelConfirm] = useState(null);
  const [billAppointment, setBillAppointment] = useState(null);

  const filteredAppointments = doctorFilter
    ? appointments.filter((apt) => apt.doctorId === doctorFilter)
    : appointments;

  const handleCancel = (id) => {
    dispatch({ type: DELETE_APPOINTMENT, payload: id });
    setCancelConfirm(null);
    alert("Appointment cancelled");
  };

  const getPatientName = (id) =>
    patients.find((p) => p.id === id)?.name || "Unknown";

  const getDoctorName = (id) =>
    doctors.find((d) => d.id === id)?.name || "Unknown";

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN");

  return (
    <div className="appointment-list">
      <h2>
        {doctorFilter ? "Doctor Appointments" : "All Appointments"}
      </h2>

      {filteredAppointments.length === 0 ? (
        <p className="no-data">
          {doctorFilter
            ? "No appointments for this doctor"
            : "No appointments yet"}
        </p>
      ) : (
        <div className="appointment-cards">
          {filteredAppointments.map((apt) => (
            <div key={apt.id} className="appointment-card">

              {/* HEADER */}
              <div className="card-header">
                <div className="info">
                  <FiUser />
                  <span>{getPatientName(apt.patientId)}</span>
                </div>
                <div className="info">
                  <FiUser />
                  <span>Dr. {getDoctorName(apt.doctorId)}</span>
                </div>
              </div>

              {/* BODY */}
              <div className="card-body">
                <div className="detail">
                  <FiCalendar />
                  <span>{formatDate(apt.date)}</span>
                </div>

                <div className="detail">
                  <FiClock />
                  <span>{apt.time}</span>
                </div>

                <div className="detail full">
                  <strong>Reason:</strong>
                  <p>{apt.reason}</p>
                </div>
              </div>

              {/* FOOTER */}
              <div className="card-footer">
                {cancelConfirm === apt.id ? (
                  <div className="confirm-box">
                    <p>Cancel appointment?</p>
                    <div className="confirm-actions">
                      <button
                        className="btn confirm"
                        onClick={() => handleCancel(apt.id)}
                      >
                        Yes
                      </button>
                      <button
                        className="btn cancel"
                        onClick={() => setCancelConfirm(null)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="actions">
                    {!apt.visited ? (
                      <button
                        className="btn bill"
                        onClick={() => setBillAppointment(apt)}
                      >
                        <FiFileText /> Bill
                      </button>
                    ) : (
                      <span className="visited">Visited</span>
                    )}

                    <button
                      className="btn delete"
                      onClick={() => setCancelConfirm(apt.id)}
                    >
                      <FiTrash2 /> Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {billAppointment && (
        <BillGeneration
          appointment={billAppointment}
          onClose={() => setBillAppointment(null)}
        />
      )}
    </div>
  );
}
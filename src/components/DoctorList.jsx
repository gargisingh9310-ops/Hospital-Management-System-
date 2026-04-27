import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_DOCTOR } from "../Redux/constants";
import { FiEye, FiTrash2, FiPhone, FiMail } from "react-icons/fi";
import "../stylesheet/DoctorList.css";
import AppointmentList from "./AppointmentList";

export default function DoctorList() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors);
  const appointments = useSelector((state) => state.appointments);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleDelete = (id) => {
    dispatch({ type: DELETE_DOCTOR, payload: id });
  };

  const getDoctorAppointmentCount = (doctorId) => {
    return appointments.filter((apt) => apt.doctorId === doctorId).length;
  };

  return (
    <div className="doctor-list-container">

      {/* LIST */}
      <div className="doctor-list">
        <h2>Doctors</h2>

        {doctors.length === 0 ? (
          <p className="empty">No doctors added yet</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialty</th>
                  <th>Contact</th>
                  <th>Appointments</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {doctors.map((doctor) => (
                  <tr
                    key={doctor.id}
                    title={`Available: ${doctor.startTime} - ${doctor.endTime}`}
                  >
                    <td>
                      <div className="doctor-name">
                        Dr. {doctor.name}
                      </div>
                    </td>

                    <td>{doctor.specialty}</td>

                    <td className="contact">
                      <span><FiPhone /> {doctor.phone}</span>
                      <span><FiMail /> {doctor.email}</span>
                    </td>

                    <td>
                      <span className="badge">
                        {getDoctorAppointmentCount(doctor.id)}
                      </span>
                    </td>

                    <td className="actions">
                      <button
                        className="btn view"
                        onClick={() =>
                          setSelectedDoctor(
                            selectedDoctor?.id === doctor.id ? null : doctor
                          )
                        }
                      >
                        <FiEye />
                        {selectedDoctor?.id === doctor.id
                          ? "Hide"
                          : "View"}
                      </button>

                      <button
                        className="btn delete"
                        onClick={() => handleDelete(doctor.id)}
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

      {/* APPOINTMENTS */}
      {selectedDoctor && (
        <div className="doctor-appointments">
          <h3>Dr. {selectedDoctor.name}'s Appointments</h3>
          <AppointmentList doctorFilter={selectedDoctor.id} />
        </div>
      )}
    </div>
  );
}
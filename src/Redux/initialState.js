export const initialState={
    patients: JSON.parse(localStorage.getItem("patients")) || [],
    appointments: JSON.parse(localStorage.getItem("appointments")) || [],
    doctors: JSON.parse(localStorage.getItem("doctors")) || [],
}
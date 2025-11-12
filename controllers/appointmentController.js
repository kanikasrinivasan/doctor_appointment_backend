import Appointment from "../models/Appointment.js";

// ➕ Book new appointment
export const bookAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Get appointments by patient ID
export const getAppointmentsByUser = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.params.id }).populate("doctorId");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Get appointments by doctor ID
export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.id }).populate("patientId");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update appointment status
export const updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Cancel appointment
export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

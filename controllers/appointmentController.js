// backend/controllers/appointmentController.js
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

// Book appointment (uses authenticated user)
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason, patientId } = req.body;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const appointment = await Appointment.create({
      doctorId,
      patientId,
      date,
      time,
      reason,
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server error while booking appointment" });
  }
};

// Get appointments for a user (patient)
export const getAppointmentsByUser = async (req, res) => {
  try {
    const userId = req.params.id; // frontend will call /api/appointments/user/<user._id>

    const appointments = await Appointment.find({ patientId: userId })
      .populate("doctorId", "name specialization")
      .populate("patientId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Get Appointments By User Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Get appointments for a doctor
export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const appointments = await Appointment.find({ doctorId })
      .populate("doctorId", "name specialization")
      .populate("patientId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Get Appointments By Doctor Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Update appointment (including status updates)
export const updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Appointment not found" });
    return res.status(200).json({ success: true, appointment: updated });
  } catch (error) {
    console.error("Update Appointment Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Appointment not found" });
    return res.status(200).json({ success: true, message: "Appointment deleted" });
  } catch (error) {
    console.error("Delete Appointment Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

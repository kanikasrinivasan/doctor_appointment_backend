import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    phone: { type: String },
    availableDays: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);

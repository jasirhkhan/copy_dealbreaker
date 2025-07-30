import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  city: { type: String, required: true },
  address: String,
  phone: String
}, {
  timestamps: true,
  versionKey: false
});

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;

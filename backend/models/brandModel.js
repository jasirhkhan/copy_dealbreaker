import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  logoUrl: String,
  websiteUrl: String,
  description: String
}, {
  timestamps: true,
  versionKey: false
});

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;

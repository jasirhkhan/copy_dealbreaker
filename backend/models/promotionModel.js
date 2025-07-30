import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  discountPercent: Number,
  linkUrl: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "PromotionEvent" },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }]
}, {
  timestamps: true,
  versionKey: false
});

const Promotion = mongoose.model("Promotion", promotionSchema);
export default Promotion;

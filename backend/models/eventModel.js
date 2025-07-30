import mongoose from "mongoose";

const promotionEventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
}, { timestamps: true });

const PromotionEvent = mongoose.model("PromotionEvent", promotionEventSchema);

export default PromotionEvent;

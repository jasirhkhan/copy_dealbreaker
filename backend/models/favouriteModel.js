import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  promotion: { type: mongoose.Schema.Types.ObjectId, ref: "Promotion", required: true }
}, { timestamps: true });

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;

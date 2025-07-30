import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 3 },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, {
  timestamps: true,
  versionKey: false
});

const User = mongoose.model("User", userSchema);
export default User;

import mongoose from "mongoose";
import { userRole } from "../../utils/userEnum.js";

const userSchema = mongoose.Schema(
  {
    userName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    role: {
      type: String,
      required: true,
      enum: Object.values(userRole),
      default: userRole.USER,
    },
  },
);

export default mongoose.model("user", userSchema);
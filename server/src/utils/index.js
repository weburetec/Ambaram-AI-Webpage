import mongoose from "mongoose";

// validation mongoose id
export const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
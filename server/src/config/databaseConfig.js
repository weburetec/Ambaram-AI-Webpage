import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Mongodb connection SUCCESS ⭐");
  } catch (error) {
    console.log("Mongodb connection FAIL 💥");
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;

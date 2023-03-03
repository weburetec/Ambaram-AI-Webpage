import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../../models/user/userModel.js";

/* -------------------------------------------------------------------------- */
/*                                 user signup                                */
/* -------------------------------------------------------------------------- */

export const signup = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const oldUser = await UserModel.findOne({ email });
      if (oldUser)
        return res.status(400).json({ message: "User already exists" });
  
    //   const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await UserModel.create({
        // password: hashedPassword,
        ...req.body,
      });
  
      const token = jwt.sign({ user: result }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
  
      res
        .status(201)
        .json({ message: "New User created successfully", result, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
};

/* -------------------------------------------------------------------------- */
/*                                 user signIn                                */
/* -------------------------------------------------------------------------- */

export const signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const oldUser = await UserModel.findOne({ email });
  
      if (!oldUser)
        return res.status(404).json({ message: "User doesn't exist" });
  
    //   const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    //   console.log(isPasswordCorrect)
  
      if (password!==oldUser.password)
        return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ user: oldUser }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
  
      return res.cookie("_user_", token, {
          maxAge: 24 * 60 * 60 * 1000, //1 day
        })
        .status(200)
        .json({ message: "Login successfully", result: oldUser, token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  /* -------------------------------------------------------------------------- */
  /*                                user signout                                */
  /* -------------------------------------------------------------------------- */
  
  export const userSignout = async (req, res) => {
    try {
      res.clearCookie("_user_", "", { maxAge: 0 });
      return res.status(200).json({ message: "logout succesfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const deleteMny = async (req, res) => {
    try {
        const oldUser = await UserModel.deleteMany();
      return res.status(200).json({ message: "logout succesfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
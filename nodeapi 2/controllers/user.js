import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { sendCookie } from "../utils/features.js";

config({ path: "./data/config.env" });

export const getAllUsers = async (req, res) => { };

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  try {
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });

    sendCookie(user, res, `Welcome Back ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  try {
    if (user)
      return res.status(404).json({
        success: false,
        message: "User already exist",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  // console.log(decoded._id);
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  // console.log(decoded._id);
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
      message: "you logged out",
    });
};

// export const updateUser = async(req,res)=>{

//     const {id} = req.params;

//     const user = await User.findById(id);
//     // console.log(req.params.id);
//     // console.log(req.query);
//     res.json({
//         success : true,
//         message : "updated",
//     })
// }

// export const deleteUser = async(req,res)=>{

//     const {id} = req.params;

//     const user = await User.findById(id);

//     await user.remove;
//     // console.log(req.params.id);
//     // console.log(req.query);
//     res.json({
//         success : true,
//         message : "user is deleted",
//     })
// }

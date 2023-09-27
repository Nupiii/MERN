import express from "express";
import {
  //   deleteUser,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  //   updateUser,
  //   userId,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

// router.get("/:id", userId);

// router.route("/:id").get(userId).put(updateUser).delete(deleteUser);

export default router;

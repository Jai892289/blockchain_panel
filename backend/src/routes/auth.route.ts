import express from "express";
import passport from "passport";
import { register, login, getProfile,updateProfile } from "../controllers/auth.controller";
import {authMiddleware} from "../middleware/auth.middleware";

const router = express.Router();

/* EMAIL AUTH */
router.post("/register", register);
router.post("/login", login);
router.get("/me",authMiddleware, getProfile);
router.put(
  "/update-profile",
  authMiddleware,
  updateProfile
);

/* GOOGLE AUTH */
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   googleSuccess
// );

export default router;
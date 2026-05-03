import express from "express";
import passport from "passport";
import { register, login, googleSuccess } from "../controllers/auth.controller";

const router = express.Router();

/* EMAIL AUTH */
router.post("/register", register);
router.post("/login", login);

/* GOOGLE AUTH */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleSuccess
);

export default router;
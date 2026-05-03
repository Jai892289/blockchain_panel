import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import "../config/passport"
import authRoutes from "../routes/auth.route"

dotenv.config();

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  })
);
app.use(express.json());
app.use(passport.initialize());

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

app.use("/api/auth", authRoutes);


export default app;
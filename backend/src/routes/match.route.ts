import express from "express";
import { startMatching, getMatchReports, getDashboardStats } from "../controllers/match.controller";

const router = express.Router();

router.post("/match", startMatching);
router.get("/match-report", getMatchReports);
router.get("/dashboard/stats", getDashboardStats);




export default router;
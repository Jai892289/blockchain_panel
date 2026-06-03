import express from "express";
import { createBlockchainRecord, getMatchReports, getDashboardStats } from "../controllers/match.controller";

const router = express.Router();

router.post("/match", createBlockchainRecord);
router.get("/match-report", getMatchReports);
router.get("/dashboard/stats", getDashboardStats);




export default router;
import express from "express";
import { startMatching, getMatchReports } from "../controllers/match.controller";

const router = express.Router();

router.post("/match", startMatching);
router.get("/match-report", getMatchReports);

export default router;
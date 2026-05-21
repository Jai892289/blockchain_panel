"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const match_controller_1 = require("../controllers/match.controller");
const router = express_1.default.Router();
router.post("/match", match_controller_1.startMatching);
router.get("/match-report", match_controller_1.getMatchReports);
exports.default = router;

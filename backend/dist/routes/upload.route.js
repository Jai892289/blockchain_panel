"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_middleware_1 = require("../middleware/upload.middleware");
const upload_controller_1 = require("../controllers/upload.controller");
const router = express_1.default.Router();
router.post("/upload", upload_middleware_1.upload.single("file"), upload_controller_1.uploadFile);
exports.default = router;

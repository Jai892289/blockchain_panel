"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        const file = req.file;
        console.log("Uploaded File:", file.originalname);
        // EXCEL FILE
        if (file.originalname.endsWith(".xlsx") ||
            file.originalname.endsWith(".xls")) {
            const workbook = xlsx_1.default.read(file.buffer, {
                type: "buffer",
            });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx_1.default.utils.sheet_to_json(sheet);
            console.log(data);
            return res.status(200).json({
                success: true,
                data,
            });
        }
        return res.status(200).json({
            success: true,
            message: "File uploaded successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Upload failed",
        });
    }
};
exports.uploadFile = uploadFile;

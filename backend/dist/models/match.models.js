"use strict";
// import mongoose from "mongoose";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const matchSchema = new mongoose.Schema(
//   {
//     uploadedData: {
//       type: Object,
//       required: true,
//     },
//     selectedFields: {
//       type: [String],
//       default: [],
//     },
//     format: {
//       type: String,
//       required: true,
//     },
//     fromDate: String,
//     toDate: String,
//     totalRecords: Number,
//     matchedRecords: Number,
//     mismatchedRecords: Number,
//     accuracyRate: String,
//     records: [
//       {
//         recordId: String,
//         recordType: String,
//         status: String,
//         remark: String,
//         timestamp: Date,
//       },
//     ],
//     status: {
//       type: String,
//       default: "pending",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// export default mongoose.model(
//   "Match",
//   matchSchema
// );
const mongoose_1 = __importDefault(require("mongoose"));
const matchSchema = new mongoose_1.default.Schema({
    uploadedData: {
        type: Object,
        required: true,
    },
    selectedFields: {
        type: [String],
        default: [],
    },
    format: {
        type: String,
        required: true,
    },
    fromDate: String,
    toDate: String,
    status: {
        type: String,
        default: "pending",
    },
    blockchain: {
        txHash: String,
        blockNumber: Number,
        network: String,
        explorerUrl: String,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Match", matchSchema);

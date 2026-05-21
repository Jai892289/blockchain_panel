"use strict";
// // import mongoose from "mongoose";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// // const userSchema = new mongoose.Schema(
// //   {
// //     name: String,
// //     email: { type: String, unique: true, required: true },
// //     password: String,
// //     image: String,
// //     provider: {
// //       type: String,
// //       enum: ["local", "google"],
// //       default: "local",
// //     },
// //     resetPasswordToken: { type: String },
// //     resetPasswordExpire: { type: Date },
// //   },
// //   { timestamps: true }
// // );
// // export const User =
// //   mongoose.models.User || mongoose.model("User", userSchema);
// import mongoose from "mongoose";
// const userSchema = new mongoose.Schema(
//   {
//     // =========================================
//     // AUTH
//     // =========================================
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//     },
//     provider: {
//       type: String,
//       enum: ["local", "google"],
//       default: "local",
//     },
//     // =========================================
//     // ORGANIZATION DETAILS
//     // =========================================
//     organizationName: {
//       type: String,
//     },
//     organizationId: {
//       type: String,
//     },
//     registrationDate: {
//       type: String,
//     },
//     status: {
//       type: String,
//       default: "Active",
//     },
//     // =========================================
//     // LICENSE DETAILS
//     // =========================================
//     licenseType: {
//       type: String,
//     },
//     validUntil: {
//       type: String,
//     },
//     daysRemaining: {
//       type: String,
//     },
//     // =========================================
//     // CONTACT PERSON
//     // =========================================
//     contactPersonName: {
//       type: String,
//     },
//     contactPersonRole: {
//       type: String,
//     },
//     phone: {
//       type: String,
//     },
//     profileImage: {
//       type: String,
//       default:
//         "https://i.pravatar.cc/150?img=12",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// export const User = mongoose.model(
//   "User",
//   userSchema
// );
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },
    image: {
        type: String,
    },
    organizationName: {
        type: String,
    },
    organizationId: {
        type: String,
    },
    registrationDate: {
        type: String,
    },
    status: {
        type: String,
        default: "Active",
    },
    licenseType: {
        type: String,
    },
    validUntil: {
        type: String,
    },
    daysRemaining: {
        type: String,
    },
    contactPersonName: {
        type: String,
    },
    contactPersonRole: {
        type: String,
    },
    phone: {
        type: String,
    },
    profileImage: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.User = mongoose_1.default.model("User", userSchema);

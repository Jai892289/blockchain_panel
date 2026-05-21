"use strict";
// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import { User } from "../models/user.models";
// import { generateToken } from "../utils/jwt";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.googleSuccess = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_models_1 = require("../models/user.models");
const jwt_1 = require("../utils/jwt");
/* =========================================
   REGISTER
========================================= */
const register = async (req, res) => {
    try {
        const { name, email, password, organizationName, organizationId, registrationDate, licenseType, validUntil, daysRemaining, contactPersonName, contactPersonRole, phone, } = req.body;
        // =====================================
        // CHECK USER
        // =====================================
        const existing = await user_models_1.User.findOne({
            email,
        });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        // =====================================
        // HASH PASSWORD
        // =====================================
        const hashed = await bcryptjs_1.default.hash(password, 10);
        // =====================================
        // CREATE USER
        // =====================================
        const user = await user_models_1.User.create({
            name,
            email,
            password: hashed,
            provider: "local",
            organizationName,
            organizationId,
            registrationDate,
            status: "Active",
            licenseType,
            validUntil,
            daysRemaining,
            contactPersonName,
            contactPersonRole,
            phone,
        });
        // =====================================
        // TOKEN
        // =====================================
        const token = (0, jwt_1.generateToken)(user);
        // =====================================
        // RESPONSE
        // =====================================
        res.status(201).json({
            success: true,
            message: "Registered successfully",
            token,
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Registration failed",
        });
    }
};
exports.register = register;
/* =========================================
   LOGIN
========================================= */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // =====================================
        // FIND USER
        // =====================================
        const user = await user_models_1.User.findOne({
            email,
        });
        if (!user || !user.password) {
            return res.status(400).json({
                success: false,
                message: "Use Google login for this account",
            });
        }
        // =====================================
        // PASSWORD MATCH
        // =====================================
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        // =====================================
        // TOKEN
        // =====================================
        const token = (0, jwt_1.generateToken)(user);
        // =====================================
        // RESPONSE
        // =====================================
        res.status(200).json({
            success: true,
            token,
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
};
exports.login = login;
/* =========================================
   GOOGLE SUCCESS
========================================= */
const googleSuccess = (req, res) => {
    const token = (0, jwt_1.generateToken)(req.user);
    res.redirect(`http://localhost:3000/login-success?token=${token}`);
};
exports.googleSuccess = googleSuccess;
const getProfile = async (req, res) => {
    try {
        const user = await user_models_1.User.findById(req.user.id).select("-password");
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
        });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const updatedUser = await user_models_1.User.findByIdAndUpdate(req.user.id, req.body, {
            new: true,
        }).select("-password");
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
};
exports.updateProfile = updateProfile;

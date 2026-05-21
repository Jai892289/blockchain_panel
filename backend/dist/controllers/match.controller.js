"use strict";
// import { Request, Response } from "express";
// import Match from "../models/match.models";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchReports = exports.startMatching = void 0;
// import axios from "axios";
const match_models_1 = __importDefault(require("../models/match.models"));
const startMatching = async (req, res) => {
    try {
        const { uploadedData, selectedFields, format, fromDate, toDate, } = req.body;
        // ==========================================
        // VALIDATION
        // ==========================================
        if (!uploadedData) {
            return res.status(400).json({
                success: false,
                message: "Uploaded data is required",
            });
        }
        // ==========================================
        // SAVE IN LOCAL DB FIRST
        // ==========================================
        const match = await match_models_1.default.create({
            uploadedData,
            selectedFields,
            format,
            fromDate,
            toDate,
            status: "pending",
            blockchain: null,
        });
        // ==========================================
        // BLOCKCHAIN API PAYLOAD
        // ==========================================
        const blockchainPayload = {
            matchId: match._id,
            uploadedData,
            selectedFields,
            format,
            fromDate,
            toDate,
        };
        console.log("Blockchain Payload:", blockchainPayload);
        // ==========================================
        // FUTURE BLOCKCHAIN API CALL
        // ==========================================
        /*
        
        UNCOMMENT WHEN MAINNET API COMES
        
        const blockchainResponse = await axios.post(
          "https://your-mainnet-api.com/verify",
          blockchainPayload
        );
    
        console.log(
          "Blockchain Response:",
          blockchainResponse.data
        );
    
        */
        // ==========================================
        // MOCK RESPONSE FOR NOW
        // ==========================================
        const blockchainResponse = {
            data: {
                success: true,
                txHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
                blockNumber: 19234567,
                network: "Ethereum Mainnet",
                explorerUrl: "https://etherscan.io/tx/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
            },
        };
        // ==========================================
        // UPDATE DB WITH BLOCKCHAIN RESPONSE
        // ==========================================
        match.status = "completed";
        match.blockchain = {
            txHash: blockchainResponse.data.txHash,
            blockNumber: blockchainResponse.data.blockNumber,
            network: blockchainResponse.data.network,
            explorerUrl: blockchainResponse.data.explorerUrl,
        };
        await match.save();
        // ==========================================
        // FINAL RESPONSE
        // ==========================================
        return res.status(201).json({
            success: true,
            message: "Matching + Blockchain verification completed",
            data: match,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Matching failed",
        });
    }
};
exports.startMatching = startMatching;
// ==========================================
// GET REPORT
// ==========================================
const getMatchReports = async (req, res) => {
    try {
        const reports = await match_models_1.default.find()
            .sort({ createdAt: -1 })
            .limit(1);
        return res.status(200).json({
            success: true,
            data: reports[0],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch reports",
        });
    }
};
exports.getMatchReports = getMatchReports;

// import { Request, Response } from "express";
// import Match from "../models/match.models";

// export const startMatching = async (
//   req: Request,
//   res: Response
// ) => {
//   try {

//     const {
//       uploadedData,
//       selectedFields,
//       format,
//       fromDate,
//       toDate,
//     } = req.body;

//     // VALIDATION
//     if (!uploadedData) {
//       return res.status(400).json({
//         success: false,
//         message: "Uploaded data is required",
//       });
//     }

//     // SAVE DATA
//     const match = await Match.create({
//       uploadedData,
//       selectedFields,
//       format,
//       fromDate,
//       toDate,
//       status: "completed",
//     });

//     // RESPONSE
//     return res.status(201).json({
//       success: true,
//       message: "Matching started successfully",
//       data: match,
//     });

//   } catch (error) {

//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Matching failed",
//     });
//   }
// };


// export const getMatchReports = async (
//   req: Request,
//   res: Response
// ) => {
//   try {

//     const reports = await Match.find()
//       .sort({ createdAt: -1 })
//       .limit(1);

//     return res.status(200).json({
//       success: true,
//       data: reports[0],
//     });

//   } catch (error) {

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch reports",
//     });
//   }
// };



// ==========================================
// FUTURE BLOCKCHAIN READY CONTROLLER
// ==========================================

import { Request, Response } from "express";
// import axios from "axios";

import Match from "../models/match.models";

export const startMatching = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      uploadedData,
      selectedFields,
      format,
      fromDate,
      toDate,
    } = req.body;

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

    const match = await Match.create({

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

    console.log(
      "Blockchain Payload:",
      blockchainPayload
    );

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

        txHash:
          "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",

        blockNumber: 19234567,

        network: "Ethereum Mainnet",

        explorerUrl:
          "https://etherscan.io/tx/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
      },
    };

    // ==========================================
    // UPDATE DB WITH BLOCKCHAIN RESPONSE
    // ==========================================

    match.status = "completed";

    match.blockchain = {

      txHash:
        blockchainResponse.data.txHash,

      blockNumber:
        blockchainResponse.data.blockNumber,

      network:
        blockchainResponse.data.network,

      explorerUrl:
        blockchainResponse.data.explorerUrl,
    };

    await match.save();

    // ==========================================
    // FINAL RESPONSE
    // ==========================================

    return res.status(201).json({

      success: true,

      message:
        "Matching + Blockchain verification completed",

      data: match,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Matching failed",
    });
  }
};

// ==========================================
// GET REPORT
// ==========================================

export const getMatchReports = async (
  req: Request,
  res: Response
) => {
  try {

    const reports = await Match.find()
      .sort({ createdAt: -1 })
      .limit(1);

    return res.status(200).json({

      success: true,

      data: reports[0],
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: "Failed to fetch reports",
    });
  }
};
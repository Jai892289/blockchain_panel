


// ==========================================
// FUTURE BLOCKCHAIN READY CONTROLLER
// ==========================================

import { Request, Response } from "express";
// import axios from "axios";

import Match from "../models/match.models";
import { generateHash }
from "../utils/hash";

export const createBlockchainRecord = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      action,
      uploadedData,
      selectedFields,
      format,
      fromDate,
      toDate,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !uploadedData ||
      !Array.isArray(uploadedData) ||
      uploadedData.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Uploaded data is required",
      });
    }

    // ==========================================
    // GENERATE HASHES
    // ==========================================

    const hashes = uploadedData.map(
      (row: any) => generateHash(row)
    );

    // ==========================================
    // VERIFY
    // ==========================================

    if (action === "verify") {
      const blockchainRecords =
        await Match.find({
          action: "create",
        });

      const blockchainHashes =
        blockchainRecords.flatMap(
          (item: any) =>
            item.hashes || []
        );

      const matched =
        hashes.filter(
          (hash: string) =>
            blockchainHashes.includes(
              hash
            )
        );

      const unmatched =
        hashes.filter(
          (hash: string) =>
            !blockchainHashes.includes(
              hash
            )
        );

      const totalRecords =
        hashes.length;

      const matchedRecords =
        matched.length;

      const unmatchedRecords =
        unmatched.length;

      const matchPercentage =
        totalRecords > 0
          ? Math.round(
              (matchedRecords /
                totalRecords) *
                100
            )
          : 0;

      // ==========================================
      // BUILD REPORT ROWS
      // ==========================================

    const verificationRecords =
  uploadedData.map(
    (row: any) => {

      const hash =
        generateHash(row);

      const isMatched =
        blockchainHashes.includes(
          hash
        );

      return {
        data: row,

        status:
          isMatched
            ? "matched"
            : "unmatched",

        txnId:
          "TXN-" +
          Date.now() +
          "-" +
          Math.floor(
            Math.random() * 10000
          ),

        hash,
      };
    }
  );

      // ==========================================
      // SAVE REPORT
      // ==========================================

     const report =
  await Match.create({

    action: "verify",

    uploadedData,

    selectedFields,

    format,

    fromDate,

    toDate,

    columns:
      Object.keys(
        uploadedData[0] || {}
      ),

    verificationRecords,

    totalRecords,

    matchedRecords,

    unmatchedRecords,

    matchPercentage,

    status: "completed",
  });

  return res.status(200).json({
  success: true,

  action: "verify",

  message:
    "Verification completed",

  data: {
    reportId:
      report._id,

    createdAt:
      report.createdAt,

    totalRecords,

    matchedRecords,

    unmatchedRecords,

    matchPercentage,

    columns:
      Object.keys(
        uploadedData[0] || {}
      ),

    verificationRecords,
  },
});

//       return res.status(200).json({
//   success: true,

//   action: "verify",

//   message:
//     "Verification completed",

//   data: {
//     reportId:
//       report._id,

//     totalRecords,

//     matchedRecords,

//     unmatchedRecords,

//     matchPercentage,

//     columns:
//       Object.keys(
//         uploadedData[0] || {}
//       ),

//     verificationRecords,
//   },
// });
    }

    // ==========================================
    // CREATE
    // ==========================================

    const existing =
      await Match.findOne({
        action: "create",

        hashes: {
          $in: hashes,
        },
      });

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          "Data already in blockchain",
      });
    }

    // ==========================================
    // DUMMY BLOCKCHAIN
    // ==========================================

    const blockchainResponse = {
      txHash:
        "0x" +
        Math.random()
          .toString(16)
          .substring(2) +
        Date.now(),

      blockNumber:
        Date.now(),

      network:
        "Dummy Blockchain",

      explorerUrl:
        "#",
    };

    // ==========================================
    // SAVE BLOCKCHAIN RECORD
    // ==========================================

    const match =
      await Match.create({
        action: "create",

        uploadedData,

        hashes,

        selectedFields,

        format,

        fromDate,

        toDate,

        recordCount:
          uploadedData.length,

        status: "completed",

        blockchain: {
          txHash:
            blockchainResponse.txHash,

          blockNumber:
            blockchainResponse.blockNumber,

          network:
            blockchainResponse.network,

          explorerUrl:
            blockchainResponse.explorerUrl,
        },
      });

    return res.status(201).json({
      success: true,

      action: "create",

      message:
        "Records successfully stored on blockchain",

      data: match,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Blockchain operation failed",
    });
  }
};


export const getMatchReports = async (
  req: Request,
  res: Response
) => {
  try {

    const report =
      await Match.findOne({
        action: "verify",
      })
      .sort({
        createdAt: -1,
      });

    if (!report) {
      return res.status(404).json({
        success: false,
        message:
          "No matching reports found",
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch reports",
    });
  }
};


// export const createBlockchainRecord = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const {
//       action,
//       uploadedData,
//       selectedFields,
//       format,
//       fromDate,
//       toDate,
//     } = req.body;

//     // ==========================================
//     // VALIDATION
//     // ==========================================

//     if (
//       !uploadedData ||
//       !Array.isArray(uploadedData) ||
//       uploadedData.length === 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Uploaded data is required",
//       });
//     }

//     // ==========================================
//     // GENERATE HASHES
//     // ==========================================

//     const hashes = uploadedData.map(
//       (row: any) => generateHash(row)
//     );

//     // ==========================================
//     // VERIFY BLOCKCHAIN RECORDS
//     // ==========================================

//     if (action === "verify") {
//       const blockchainRecords =
//         await Match.find({
//           action: "create",
//         });

//       const blockchainHashes =
//         blockchainRecords.flatMap(
//           (item: any) =>
//             item.hashes || []
//         );

//       const matched =
//         hashes.filter((hash: string) =>
//           blockchainHashes.includes(hash)
//         );

//       const unmatched =
//         hashes.filter(
//           (hash: string) =>
//             !blockchainHashes.includes(
//               hash
//             )
//         );

//       const totalRecords =
//         hashes.length;

//       const matchedRecords =
//         matched.length;

//       const unmatchedRecords =
//         unmatched.length;

//       const matchPercentage =
//         totalRecords > 0
//           ? Math.round(
//               (matchedRecords /
//                 totalRecords) *
//                 100
//             )
//           : 0;

//       await Match.create({
//         action: "verify",

//         uploadedData,

//         selectedFields,

//         format,

//         fromDate,

//         toDate,

//         totalRecords,

//         matchedRecords,

//         unmatchedRecords,

//         matchPercentage,

//         status: "completed",
//       });

//       return res.status(200).json({
//         success: true,

//         action: "verify",

//         message:
//           "Verification completed",

//         data: {
//           totalRecords,
//           matchedRecords,
//           unmatchedRecords,
//           matchPercentage,
//         },
//       });
//     }

//     // ==========================================
//     // CREATE BLOCKCHAIN RECORD
//     // ==========================================

//     const existing =
//       await Match.findOne({
//         action: "create",

//         hashes: {
//           $in: hashes,
//         },
//       });

//     if (existing) {
//       return res.status(409).json({
//         success: false,
//         message:
//           "Data already in blockchain",
//       });
//     }

//     // ==========================================
//     // DUMMY BLOCKCHAIN
//     // ==========================================

//     const blockchainResponse = {
//       txHash:
//         "0x" +
//         Math.random()
//           .toString(16)
//           .substring(2) +
//         Date.now(),

//       blockNumber: Date.now(),

//       network:
//         "Dummy Blockchain",

//       explorerUrl: "#",
//     };

//     // ==========================================
//     // SAVE RECORD
//     // ==========================================

//     const match = await Match.create({
//       action: "create",

//       uploadedData,

//       hashes,

//       selectedFields,

//       format,

//       fromDate,

//       toDate,

//       recordCount:
//         uploadedData.length,

//       status: "completed",

//       blockchain: {
//         txHash:
//           blockchainResponse.txHash,

//         blockNumber:
//           blockchainResponse.blockNumber,

//         network:
//           blockchainResponse.network,

//         explorerUrl:
//           blockchainResponse.explorerUrl,
//       },
//     });

//     return res.status(201).json({
//       success: true,

//       action: "create",

//       message:
//         "Records successfully stored on blockchain",

//       data: match,
//     });

//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,

//       message:
//         "Blockchain operation failed",
//     });
//   }
// };

// export const createBlockchainRecord = async (
//   req: Request,
//   res: Response
// ) => {
//   try {

//     const {
//       action,
//       uploadedData,
//       selectedFields,
//       format,
//       fromDate,
//       toDate,
//     } = req.body;

//     // ==========================================
//     // VALIDATION
//     // ==========================================

//     if (!uploadedData) {

//       return res.status(400).json({
//         success: false,
//         message: "Uploaded data is required",
//       });
//     }

//     // ==========================================
//     // SAVE IN LOCAL DB FIRST
//     // ==========================================

//     const match = await Match.create({
//       action,

//       uploadedData,

//       selectedFields,

//       format,

//       fromDate,

//       toDate,

//       status: "pending",

//       blockchain: null,
//     });

//     // ==========================================
//     // BLOCKCHAIN API PAYLOAD
//     // ==========================================

//     const blockchainPayload = {

//       matchId: match._id,

//       uploadedData,

//       selectedFields,

//       format,

//       fromDate,

//       toDate,
//     };

//     console.log(
//       "Blockchain Payload:",
//       blockchainPayload
//     );

//     // ==========================================
//     // FUTURE BLOCKCHAIN API CALL
//     // ==========================================

//     /*
    
//     UNCOMMENT WHEN MAINNET API COMES
    
//     const blockchainResponse = await axios.post(
//       "https://your-mainnet-api.com/verify",
//       blockchainPayload
//     );

//     console.log(
//       "Blockchain Response:",
//       blockchainResponse.data
//     );

//     */

//     // ==========================================
//     // MOCK RESPONSE FOR NOW
//     // ==========================================

//     const blockchainResponse = {
//       data: {
//         success: true,

//         txHash:
//           "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",

//         blockNumber: 19234567,

//         network: "Ethereum Mainnet",

//         explorerUrl:
//           "https://etherscan.io/tx/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
//       },
//     };

//     // ==========================================
//     // UPDATE DB WITH BLOCKCHAIN RESPONSE
//     // ==========================================

//     match.status = "completed";

//     match.blockchain = {

//       txHash:
//         blockchainResponse.data.txHash,

//       blockNumber:
//         blockchainResponse.data.blockNumber,

//       network:
//         blockchainResponse.data.network,

//       explorerUrl:
//         blockchainResponse.data.explorerUrl,
//     };

//     await match.save();

//     // ==========================================
//     // FINAL RESPONSE
//     // ==========================================

//     return res.status(201).json({

//       success: true,

//       message:
//         "Matching + Blockchain verification completed",

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

// ==========================================
// GET REPORT
// ==========================================

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



export const getDashboardStats = async (
  req: any,
  res: any
) => {
  try {
    const totalUploads =
      await Match.countDocuments();

    const successfulMatches =
      await Match.countDocuments({
        status: "completed",
      });

    const failedMatches =
      await Match.countDocuments({
        status: {
          $in: ["failed", "error"],
        },
      });

    const latestUpload =
      await Match.findOne()
        .sort({ createdAt: -1 })
        .select("createdAt");

    // ================= YEARLY =================
    const yearlyStats =
      await Match.aggregate([
        {
          $group: {
            _id: {
              $year: "$createdAt",
            },
            uploads: { $sum: 1 },
            matches: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "completed",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

    // ================= MONTHLY =================
    const monthlyStats =
      await Match.aggregate([
        {
          $group: {
            _id: {
              $month: "$createdAt",
            },
            uploads: { $sum: 1 },
            matches: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "completed",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // ================= WEEKLY =================
    const weeklyStats =
      await Match.aggregate([
        {
          $group: {
            _id: {
              $dayOfWeek:
                "$createdAt",
            },
            uploads: { $sum: 1 },
            matches: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "completed",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

    const weekNames = [
      "",
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    // ================= DAILY =================
    const dailyStats =
      await Match.aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%d-%m",
                date: "$createdAt",
              },
            },
            uploads: { $sum: 1 },
            matches: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "completed",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);

    return res.status(200).json({
      success: true,

      data: {
        lastUploadDate:
          latestUpload?.createdAt ||
          null,

        totalUploads,

        successfulMatches,

        failedMatches,

        dailyTrends:
          dailyStats.map(
            (item) => ({
              label: item._id,
              uploads:
                item.uploads,
              matches:
                item.matches,
            })
          ),

        weeklyTrends:
          weeklyStats.map(
            (item) => ({
              label:
                weekNames[
                  item._id
                ],
              uploads:
                item.uploads,
              matches:
                item.matches,
            })
          ),

        monthlyTrends:
          monthlyStats.map(
            (item) => ({
              label:
                monthNames[
                  item._id - 1
                ],
              uploads:
                item.uploads,
              matches:
                item.matches,
            })
          ),

        yearlyTrends:
          yearlyStats.map(
            (item) => ({
              label: String(
                item._id
              ),
              uploads:
                item.uploads,
              matches:
                item.matches,
            })
          ),
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch dashboard stats",
    });
  }
};
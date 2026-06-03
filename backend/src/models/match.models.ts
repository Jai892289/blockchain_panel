import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ["create", "verify"],
      default: "create",
    },

    uploadedData: {
      type: Object,
      required: true,
    },

    hashes: {
      type: [String],
      default: [],
    },

    selectedFields: {
      type: [String],
      default: [],
    },

    format: {
      type: String,
      required: true,
    },

    fromDate: {
      type: String,
      default: "",
    },

    toDate: {
      type: String,
      default: "",
    },

    recordCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "completed",
        "failed",
      ],
      default: "pending",
    },

    blockchain: {
      txHash: String,
      blockNumber: Number,
      network: String,
      explorerUrl: String,
    },

    totalRecords: {
      type: Number,
      default: 0,
    },

    matchedRecords: {
      type: Number,
      default: 0,
    },

    unmatchedRecords: {
      type: Number,
      default: 0,
    },

    matchPercentage: {
      type: Number,
      default: 0,
    },

    columns: {
      type: [String],
      default: [],
    },

    verificationRecords: [
      {
        data: {
          type: Object,
          default: {},
        },

        status: {
          type: String,
          enum: [
            "matched",
            "unmatched",
          ],
        },

        txnId: String,

        hash: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Match",
  matchSchema
);
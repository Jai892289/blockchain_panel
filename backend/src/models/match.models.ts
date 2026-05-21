// import mongoose from "mongoose";

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


import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Match",
  matchSchema
);
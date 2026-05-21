// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: { type: String, unique: true, required: true },
//     password: String,
//     image: String,
//     provider: {
//       type: String,
//       enum: ["local", "google"],
//       default: "local",
//     },
//     resetPasswordToken: { type: String },
//     resetPasswordExpire: { type: Date },
//   },
//   { timestamps: true }
// );

// export const User =
//   mongoose.models.User || mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // =========================================
    // AUTH
    // =========================================

    name: {
      type: String,
      required: true,
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

    // =========================================
    // ORGANIZATION DETAILS
    // =========================================

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

    // =========================================
    // LICENSE DETAILS
    // =========================================

    licenseType: {
      type: String,
    },

    validUntil: {
      type: String,
    },

    daysRemaining: {
      type: String,
    },

    // =========================================
    // CONTACT PERSON
    // =========================================

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
      default:
        "https://i.pravatar.cc/150?img=12",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model(
  "User",
  userSchema
);
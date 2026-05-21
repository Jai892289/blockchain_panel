// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import { User } from "../models/user.models";
// import { generateToken } from "../utils/jwt";

// /* REGISTER */
// export const register = async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;

//   const existing = await User.findOne({ email });
//   if (existing) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashed = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     password: hashed,
//     provider: "local",
//   });

//   res.json({ message: "Registered", user });
// };

// /* LOGIN */
// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user || !user.password) {
//     return res.status(400).json({
//       message: "Use Google login for this account",
//     });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     return res.status(400).json({ message: "Invalid credentials" });
//   }

//   const token = generateToken(user);

//   res.json({ token });
// };

// /* GOOGLE SUCCESS */
// export const googleSuccess = (req: any, res: Response) => {
//   const token = generateToken(req.user);

//   res.redirect(`http://localhost:3000/login-success?token=${token}`);
// };



import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { User } from "../models/user.models";

import { generateToken } from "../utils/jwt";

/* =========================================
   REGISTER
========================================= */

export const register = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      name,
      email,
      password,
      organizationName,
      organizationId,
      registrationDate,
      licenseType,
      validUntil,
      daysRemaining,
      contactPersonName,
      contactPersonRole,
      phone,
    } = req.body;

    // =====================================
    // CHECK USER
    // =====================================

    const existing = await User.findOne({
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

    const hashed = await bcrypt.hash(
      password,
      10
    );

    // =====================================
    // CREATE USER
    // =====================================

    const user = await User.create({

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

    const token = generateToken(user);

    // =====================================
    // RESPONSE
    // =====================================

    res.status(201).json({

      success: true,

      message: "Registered successfully",

      token,

      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Registration failed",
    });
  }
};

/* =========================================
   LOGIN
========================================= */

export const login = async (
  req: Request,
  res: Response
) => {
  try {

    const { email, password } = req.body;

    // =====================================
    // FIND USER
    // =====================================

    const user = await User.findOne({
      email,
    });

    if (!user || !user.password) {

      return res.status(400).json({

        success: false,

        message:
          "Use Google login for this account",
      });
    }

    // =====================================
    // PASSWORD MATCH
    // =====================================

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message: "Invalid credentials",
      });
    }

    // =====================================
    // TOKEN
    // =====================================

    const token = generateToken(user);

    // =====================================
    // RESPONSE
    // =====================================

    res.status(200).json({

      success: true,

      token,

      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Login failed",
    });
  }
};

/* =========================================
   GOOGLE SUCCESS
========================================= */

export const googleSuccess = (
  req: any,
  res: Response
) => {

  const token = generateToken(req.user);

  res.redirect(
    `http://localhost:3000/login-success?token=${token}`
  );
};



export const getProfile = async (
  req: any,
  res: Response
) => {
  try {

    const user = await User.findById(
      req.user.id
    ).select("-password");

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};



export const updateProfile = async (
  req: any,
  res: Response
) => {
  try {

    const updatedUser =
      await User.findByIdAndUpdate(
        req.user.id,

        req.body,

        {
          new: true,
        }
      ).select("-password");

    return res.status(200).json({

      success: true,

      message:
        "Profile updated successfully",

      user: updatedUser,
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        "Failed to update profile",
    });
  }
};
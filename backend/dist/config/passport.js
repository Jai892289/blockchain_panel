"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_models_1 = require("../models/user.models");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0].value;
        let user = await user_models_1.User.findOne({ email });
        if (!user) {
            user = await user_models_1.User.create({
                name: profile.displayName,
                email,
                image: profile.photos?.[0].value,
                provider: "google",
            });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err, false);
    }
}));

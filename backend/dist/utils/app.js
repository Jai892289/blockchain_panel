"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
require("../config/passport");
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const upload_route_1 = __importDefault(require("../routes/upload.route"));
const match_route_1 = __importDefault(require("../routes/match.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// app.use(cors());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.get("/health", (_, res) => {
    res.json({ status: "OK" });
});
app.use("/api/auth", auth_route_1.default);
app.use("/api", upload_route_1.default);
app.use("/api", match_route_1.default);
exports.default = app;

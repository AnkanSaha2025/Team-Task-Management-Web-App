"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_TOKEN;
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (e) {
        return res.status(403).json({});
    }
};
exports.authMiddleware = authMiddleware;

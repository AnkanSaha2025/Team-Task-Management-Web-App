"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.userRouter = express_1.default.Router();
const db_1 = require("../db");
const z = __importStar(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middleware");
const userSchema = z.object({
    username: z.string(),
    password: z.string()
});
exports.userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const success = userSchema.safeParse(req.body);
        if (!success.success) {
            res.status(403).send("invalid");
        }
        const exits = yield db_1.User.findOne({
            username: req.body.username
        });
        if (exits) {
            res.json({
                message: "User already exists"
            });
            return;
        }
        const user = yield db_1.User.create({
            username: (_a = success.data) === null || _a === void 0 ? void 0 : _a.username,
            password: (_b = success.data) === null || _b === void 0 ? void 0 : _b.password
        });
        res.json({
            message: "User created",
            id: user._id
        });
    }
    catch (error) {
        res.status(403).json({
            error
        });
    }
}));
exports.userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const success = userSchema.safeParse(req.body);
        if (!success.success) {
            res.status(403).send("invalid");
        }
        const user = yield db_1.User.findOne({
            username: (_a = success.data) === null || _a === void 0 ? void 0 : _a.username,
        });
        if (!user) {
            res.json({
                message: "User doesnt exist"
            });
            return;
        }
        if (user.password !== ((_b = success.data) === null || _b === void 0 ? void 0 : _b.password)) {
            res.status(403).json({
                message: "Password doesn't match"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, process.env.JWT_TOKEN);
        res.json({
            message: "Signed in",
            jwtToken: token
        });
    }
    catch (error) {
        res.status(403).json({
            error
        });
    }
}));
exports.userRouter.get('/all', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.User.find();
        res.json({
            users
        });
    }
    catch (error) {
        res.json({
            error
        });
    }
}));

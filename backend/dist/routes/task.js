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
exports.taskSchema = exports.taskRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.taskRouter = express_1.default.Router();
const middleware_1 = require("../middleware");
const z = __importStar(require("zod"));
const db_1 = require("../db");
exports.taskSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    status: z.enum(["To Do", "In Progress", "Done"]),
    userId: z.array(z.string()).min(1)
});
exports.taskRouter.get('/:userId', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const tasks = yield db_1.Task.find({ userId: { $in: [userId] } });
        res.json({ tasks });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.taskRouter.get('/', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const tasks = yield db_1.Task.find({ userId: { $in: [userId] } });
        res.json({ tasks });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.taskRouter.post('/', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = exports.taskSchema.safeParse(req.body);
        if (!success.success) {
            res.status(403).json({});
            return;
        }
        const task = yield db_1.Task.create(req.body);
        res.json({
            task
        });
    }
    catch (error) {
        res.json({
            error
        });
    }
}));
exports.taskRouter.put('/:taskId', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.taskId;
        const success = exports.taskSchema.safeParse(req.body);
        if (!success.success) {
            res.status(403).json({});
            return;
        }
        const task = yield db_1.Task.updateOne({
            _id: taskId
        }, {
            title: success.data.title,
            description: success.data.description,
            status: success.data.status,
            userId: success.data.userId
        });
        res.json({
            task
        });
    }
    catch (error) {
        res.json({ error });
    }
}));
exports.taskRouter.delete('/:taskId', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.taskId;
        const success = exports.taskSchema.safeParse(req.body);
        if (!success.success) {
            res.status(403).json({});
            return;
        }
        const task = yield db_1.Task.deleteOne({
            _id: taskId
        });
        res.json({
            message: "Deleted"
        });
    }
    catch (error) {
        res.json({ error });
    }
}));

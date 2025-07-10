"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.User = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.DATABASE_URL);
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const taskSchema = new mongoose_1.default.Schema({
    userId: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }],
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Done"],
        required: true
    }
});
exports.User = new mongoose_1.default.Model('User', userSchema);
exports.Task = new mongoose_1.default.Model("Task", taskSchema);

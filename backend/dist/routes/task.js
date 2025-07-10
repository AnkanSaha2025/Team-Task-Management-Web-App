"use strict";
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
exports.taskRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.taskRouter = express_1.default.Router();
const middleware_1 = require("../middleware");
exports.taskRouter.get('/', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.taskRouter.post('/', (req, res) => {
});
exports.taskRouter.put('/', (req, res) => {
});
exports.taskRouter.delete('/', (req, res) => {
});

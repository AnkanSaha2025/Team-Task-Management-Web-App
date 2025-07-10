import dotenv from "dotenv";
dotenv.config();


const JWT_SECRET = process.env.JWT_TOKEN;
const jwt = require("jsonwebtoken")
import { Request, Response, NextFunction } from "express"

export const authMiddleware = (req: Request, res: Response, next: NextFunction ) =>{
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.id;
        next();
    }catch(e){
        return res.status(403).json({});
    }
};


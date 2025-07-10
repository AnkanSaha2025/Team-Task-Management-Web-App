import express from 'express'
export const userRouter = express.Router()
import { User } from '../db'
import * as z from "zod";
import jwt from 'jsonwebtoken'
import { authMiddleware } from '../middleware';

const userSchema = z.object({
    username: z.string(),
    password: z.string()
})

userRouter.post('/signup', async(req, res)=>{
    try{
        const success = userSchema.safeParse(req.body);
        if(!success.success){
            res.status(403).send("invalid")
        }

        const exits = await User.findOne({
            username: req.body.username
        });
        if(exits){
            res.json({
                message: "User already exists"
            })
            return
        }
        const user = await User.create({
            username: success.data?.username,
            password: success.data?.password
        })

        res.json({
            message: "User created",
            id: user._id
        })

    }catch(error){
        res.status(403).json({
            error
        })
    }

})

userRouter.post('/signin', async(req, res)=>{
    try{
        const success = userSchema.safeParse(req.body);
        if(!success.success){
            res.status(403).send("invalid")
        }
        const user = await User.findOne({
            username: success.data?.username,
        })

        if(!user){
            res.json({
                message: "User doesnt exist"
            })
            return;
        }

        if(user.password !== success.data?.password){
            res.status(403).json({
                message: "Password doesn't match"
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_TOKEN as string)

        res.json({
            message: "Signed in",
            jwtToken: token
        })
        
    }catch(error){
        res.status(403).json({
            error
        })
    }
})

userRouter.get('/all', authMiddleware, async (req, res)=>{
    try{
        const users = await User.
    }catch(error){
        res.json({
            error
        })
    }
})

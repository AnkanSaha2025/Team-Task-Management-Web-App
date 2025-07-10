import express from 'express'
export const taskRouter = express.Router()
import { authMiddleware } from '../middleware'
import * as z from "zod";
import { Task } from '../db';

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(["To Do", "In Progress", "Done"]),
  userIds: z.array(z.string()).min(1)
});

taskRouter.get('/', authMiddleware, async (req, res)=>{
    const tasks = await Task.find
})

taskRouter.get('/:userId', authMiddleware, async (req, res)=>{
    try{
        const user
    }catch(error){
        res.json({error})
    }
})

taskRouter.post('/', authMiddleware, async (req, res)=>{
    try{
        const success = taskSchema.safeParse(req.body)

        if(!success.success){
            res.status(403).json({})
            return
        }

        const task = await Task.create(req.body)

        res.json({
            task
        })
    }catch(error){
        res.json({
            error
        })
    }
})

taskRouter.put('/:taskId', authMiddleware, async (req, res)=>{
    try{
        const taskId = req.params.taskId;
        const success = taskSchema.safeParse(req.body)

        if(!success.success){
            res.status(403).json({})
            return
        }
        const task = await Task.updateOne({
            _id: taskId
        },{
            title: success.data.title,
            description: success.data.description,
            status: success.data.status,
            userId: success.data.userIds
        })
    }catch(error){
        res.json({error})
    }
})

taskRouter.delete('/', authMiddleware, async (req, res)=>{
    
})
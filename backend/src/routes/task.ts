import express from 'express'
export const taskRouter = express.Router()
import { authMiddleware } from '../middleware'
import * as z from "zod";
import { Task } from '../db';

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(["To Do", "In Progress", "Done"]),
  userId: z.array(z.string()).min(1)
});

taskRouter.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;

    const tasks = await Task.find({ userId: { $in: [userId] } });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
});

taskRouter.get('/all', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({});

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
});


taskRouter.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const tasks = await Task.find({ userId: { $in: [userId] } });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
});

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
            userId: success.data.userId
        })

        res.json({
            task
        })
    }catch(error){
        res.json({error})
    }
})

taskRouter.delete('/:taskId', authMiddleware, async (req, res)=>{
    try{
        const taskId = req.params.taskId;
        const success = taskSchema.safeParse(req.body)

        if(!success.success){
            res.status(403).json({})
            return
        }
        const task = await Task.deleteOne({
            _id: taskId
        })

        res.json({
            message: "Deleted"
        })
    }catch(error){
        res.json({error})
    }
})
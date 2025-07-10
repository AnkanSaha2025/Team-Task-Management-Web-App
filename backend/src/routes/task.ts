import express from 'express'
export const taskRouter = express.Router()
import { authMiddleware } from '../middleware'

taskRouter.get('/', authMiddleware, async (req, res)=>{
    
})

taskRouter.post('/', (req, res)=>{
    
})

taskRouter.put('/', (req, res)=>{
    
})

taskRouter.delete('/', (req, res)=>{
    
})
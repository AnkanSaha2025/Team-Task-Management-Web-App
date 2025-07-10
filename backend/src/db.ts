import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

mongoose.connect(process.env.DATABASE_URL as string);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    }
})

const taskSchema = new mongoose.Schema({
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
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
})

export const User = mongoose.model('User', userSchema)
export const Task = mongoose.model("Task", taskSchema)

import mongoose from "mongoose";

import User from "./Auth.js"


const todoSchema = new mongoose.Schema({

   


    todo: String,
    isCompleted: { type: Boolean, default: false },
    userId:String

})

const Todo = mongoose.model("Todo", todoSchema)
export default Todo


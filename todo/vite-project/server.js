import express from "express"

import mongoose from "mongoose"

import Todo from "./Todo.js"

import cors from "cors"

const port = 3000

const app = express()
app.use(cors())
app.use(express.json())

console.log("hi")

await mongoose.connect('mongodb://localhost:27017/todos')



app.get("/", async (req, res) => {

    const todos = await Todo.find()
    
    const ar=[]
    
    
    todos.forEach((e)=>{

        ar.push(e)
    })

    res.send(ar)
    res.statusCode(200)


})

app.post("/",async (req,res)=>{

    const todo=await Todo.create({todo:req.body.todo})
    res.json(todo)
    

    
})
app.delete("/:id",async (req,res)=>{


    await Todo.findByIdAndDelete(req.params.id)

    res.send("deleted successfully")
  })
app.listen(port, () => {

    console.log(`Serevr running on ${port}`)
})


import express from "express"



import Todo from "../models/Todo.js"



import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();






const router=express.Router()

const SECRET = process.env.SECRET_KEY
const REFRESH = process.env.REFRESH_SECRET_KEY











router.get("/todos", async (req, res) => {

  if (req.cookies?.accesstoken) {

    const value = req.cookies.accesstoken.accesstoken


    const decoded = jwt.verify(value, SECRET);





    const todos = await Todo.find({ userId: decoded.id })



    res.json({ todos: todos, authenticated: true, id: decoded.id, name: decoded.name })



      ;
  } else if (req.cookies?.refreshtoken) {



    const value = req.cookies.refreshtoken.refreshtoken






    const decoded = jwt.verify(value, REFRESH);


    const accesstoken = jwt.sign({ id: decoded.id, name: decoded.name }, SECRET, { expiresIn: "15m" });
    res.cookie("accesstoken", { accesstoken }, {


      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000



    });





    const todos = await Todo.find({ userId: decoded.id })




    res.json({ todos: todos, authenticated: true })




  } else {

    res.json({ authenticated: false })
  }


















})


 



















router.get("/", async (req, res) => {

  if (req.cookies?.accesstoken) {

    const value = req.cookies.accesstoken.accesstoken


    const decoded = jwt.verify(value, SECRET);





    const todos = await Todo.find({ userId: decoded.id })




    res.json({ todos: todos, authenticated: true, id: decoded.id, name: decoded.name })



      ;
  } else if (req.cookies?.refreshtoken) {


    const value = req.cookies.refreshtoken.refreshtoken






    const decoded = jwt.verify(value, REFRESH);



    const accesstoken = jwt.sign({ id: decoded.id, name: decoded.name }, SECRET, { expiresIn: "15m" });
    res.cookie("accesstoken", { accesstoken }, {


      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000



    });





    const todos = await Todo.find({ userId: decoded.id })
    



    res.json({ todos: todos, authenticated: true })




  } else {

    res.json({ authenticated: false })
  }


















})

router.post("/", async (req, res) => {

  const value = req.cookies.accesstoken.accesstoken



  const decoded = jwt.verify(value, SECRET);



  const todo = await Todo.create({ userId: decoded.id, todo: req.body.todo })
  res.json(todo)



})

router.patch("/:id", async (req, res) => {


  const id = req.params.id




  await Todo.findOneAndUpdate({ _id: req.params.id }, { todo: req.body.todo })
  const now = await Todo.find({ _id: req.params.id })

  res.json(now)








})


router.patch("/complete/:id", async (req, res) => {


  const id = req.params.id




  const todo = await Todo.findById(id)
  todo.isCompleted = await !(todo.isCompleted)
  await todo.save()

  res.json(todo)








})







router.delete("/:id", async (req, res) => {

  const id = req.params.id



  const result = await Todo.deleteOne({ _id: id }); // match manual id

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json({ message: "Deleted successfully" });
});

export default router
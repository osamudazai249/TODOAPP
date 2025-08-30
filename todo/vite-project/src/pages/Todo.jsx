import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Todo = () => {


    const [todos, settodos] = useState([])

    const [todo, settodo] = useState("")

    const [edit, setedit] = useState()

    const [name, setname] = useState()

    const navigate=useNavigate()



    useEffect(() => {

        fetchTodo()

    }, [])

    const fetchTodo = async () => {

        const res = await fetch("http://localhost:3000/api/todos", {
            headers: {
                "Content-Type": "application/json",

            }, credentials: "include"
        })



        const data = await res.json()
   

        if(data.authenticated===false){

            navigate("/")
        }
        const todos = data.todos

        setname(data.name)


        settodos(todos)
       




    }




    const savetodo = async () => {


        if (edit) {


            const set = todos.find(todo => todo._id === edit)


            settodo(set.todo)



            const res = await fetch(`http://localhost:3000/api/todos/${edit}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" }, credentials: "include",
                body: JSON.stringify({ todo: todo })
            })

            const data = await res.json()

            const newTodo = await data[0].todo
      



            settodos(todos.map(todo => todo._id == edit ? data[0] : todo))

           



            setedit()
            settodo("")





        } else {

            const res = await fetch("http://localhost:3000/api/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, credentials: "include",
                body: JSON.stringify({ todo })
            })

            const newTodo = await res.json()

            settodos([...todos, newTodo])
            settodo("")

        }








    }

    const change = async (id) => {




        const set = todos.find(todo => todo._id === id)

   
        settodo(set.todo)

   

        setedit(id)
















    }

    const del = async (id) => {

        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: "DELETE",


        })





        fetchTodo()





    }
    const handleComplete = async (id) => {
        const res = await fetch(`http://localhost:3000/api/todos/complete/${id}`, {
            method: "PATCH",


        })


        const todocheck = todos.find(item => item._id == id)

        const data = await res.json()


        fetchTodo()






    }
    return (
        <>

            <div className="py-5">

                <p className="text-white text-3xl md:text-4xl items-center justify-self-center">Welcome {name}</p>
            </div>

            <div className="flex flex-col justify-center items-center gap-5 justify-self-center w-1/2 my-4">
                <input value={todo} onChange={e => { settodo(e.target.value) }} type="text" placeholder="Add Task" className=" search bg-[#201f1f] text-white w-full rounded-xl px-3 py-3 focus:outline-none" id="search" />
                <button onClick={savetodo} className="save bg-[#0ab6ab]  text-white px-10 py-2 rounded-2xl hover:cursor-pointer"
                    id="save">Save</button>


            </div>
            <div className="tasks  mx-10 md:mx-40 border-red-700 text-amber-50 flex flex-col gap-5 pb-2">

                <p className="md:text-2xl text-xl">Your Tasks</p>
                <ul className="flex flex-col gap-5">

                    {todos.map(todo => (


                        <li key={todo.todo}><div className="task flex justify-between bg-[#201f1f] rounded-xl px-5 py-5">
                            <input onChange={() => { handleComplete(todo._id) }} type="checkbox" name="" id="" className="check h-4  rounded-2xl self-center "  checked={todo.isCompleted}/>
                            
                            <div className={`item bg-[#201f1f] w-1/3 content-center items-center  ${todo.isCompleted  ? "line-through":""} `} >{todo.todo}</div>
                            <div className="flex gap-5">
                                <button onClick={() => { change(todo._id) }} className=" edit cursor-pointer bg-[#0ab6ab] px-3 py-2 rounded-xl hover:scale-150 transition-transform duration 100"><img src="edit.svg" alt="" className="h-4" /></button>
                                <button onClick={() => { del(todo._id) }} className="delete cursor-pointer bg-[#0ab6ab] px-3 py-2 rounded-xl hover:scale-150 transition-transform duration 100"><img src="trash.svg" alt="" className="h-4" /></button>
                            </div>
                        </div></li>



                    ))}</ul>





            </div>

        </>

    )
}

export default Todo

import { use, useEffect, useState} from "react"
import Header from "./components/Header"
import { BrowserRouter, Routes, Route, useFetcher,useNavigate } from "react-router-dom";


import mongoose from "mongoose"
import Todo from "./pages/Todo"
import Login from "./pages/Login"






function App() {

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {

    check()
  
  

  }, [navigate])
  


  const check=async ()=>{

    const res = await fetch("http://localhost:3000/api/todos",{
        headers: {
          "Content-Type": "application/json",
            
        },credentials:"include"})

        

        const data = await res.json()
     
        if(data.authenticated){

          


          navigate("/todos")
        }else{

          navigate("/")
        }

        





  }















  return (


    <>

      <Header></Header>

      
      <Routes>


        <Route path="/" element={<Login />}></Route>
        <Route path="/todos" element={<Todo />}></Route>
      </Routes>

      





    </>
  )
}

export default App

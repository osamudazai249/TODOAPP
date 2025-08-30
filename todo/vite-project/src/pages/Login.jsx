import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'




const Login = () => {


    const API_URL = import.meta.env.VITE_API_URL;

    const [name, setname] = useState("")
    const [pass, setpass] = useState("")

    const navigate = useNavigate()










    const saveUser = async () => {

        const save = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, pass })
        })

        setname("")
        setpass("")









    }

    const loginUser = async () => {


        const save = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
            body: JSON.stringify({ name, pass })
        })



        const data = await save.json();
  

        if (save.ok) {
            


            navigate("/todos")


                ; 
        } else {
            alert(data.error || "Login failed");
        }



    }




    return (

        <>

            <div className='bg-[#0ab6ab] flex h-[83vh] '>

                <div className='flex flex-col w-1/2 text-white  items-center px-5 gap-3 py-10 '>
                    Register

                    <input onChange={e => setname(e.target.value)} className='bg-[#201f1f] w-full outline-none placeholder:text-gray-900 rounded-4xl px-5 py-3 ' placeholder='Enter' type="text" />
                    <input onChange={e => setpass(e.target.value)} className='bg-[#201f1f] w-full outline-none placeholder:text-gray-900 rounded-4xl px-5 py-3 ' placeholder='Enter' type="password" />
                  

                    <button onClick={saveUser} className='bg-[#201f1f] px-5 py-2 rounded-2xl self-center'>Register</button>
                </div>

                <div className='bg-white w-0.5'></div>

                <div className='flex flex-col w-1/2 text-white  items-center px-5 gap-3 py-10 '>
                    Login

                    <input onChange={e => setname(e.target.value)} className='bg-[#201f1f] w-full outline-none placeholder:text-gray-900 rounded-4xl px-5 py-3 ' placeholder='Enter' type="text" />
                    <input onChange={e => setpass(e.target.value)} className='bg-[#201f1f] w-full outline-none placeholder:text-gray-900 rounded-4xl px-5 py-3 ' placeholder='Enter' type="password" />
                    <button onClick={loginUser} className='bg-[#201f1f] px-5 py-2 rounded-2xl self-center'>Login</button>
                </div>


            </div>






        </>

    )
}

export default Login

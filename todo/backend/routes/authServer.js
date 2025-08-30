import express from "express"



import User from "../models/Auth.js"


import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();




const router =express.Router()

const SECRET=process.env.SECRET_KEY

const REFRESH=process.env.REFRESH_SECRET_KEY

const MONGO=process.env.MONGO_URI














function createAccessToken(userId,user) {
  return jwt.sign({ id: userId ,name:user}, SECRET, { expiresIn: "15m" });
}
function createRefreshToken(userId,user) {
  return jwt.sign({ id: userId,name:user }, REFRESH, { expiresIn: "7d" });
}





router.post("/register", async (req, res) => {



    const hashedpass = await bcrypt.hash(req.body.pass, 10)


    await User.create({ name: req.body.name, password:hashedpass })

    res.json("Done")













})


router.post("/login", async (req, res) => {



  try {
    const { name, pass } = req.body;
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const accesstoken=createAccessToken(user._id,user.name)

   

    const refreshtoken=createRefreshToken(user._id,user.name)

    res.cookie("accesstoken",{accesstoken},{


      httpOnly:true,
      secure:false,
      sameSite:"Strict",
      maxAge:15*60*1000



    });

    res.cookie("refreshtoken",{refreshtoken},{


      httpOnly:true,
      secure:false,
      sameSite:"Strict",
      maxAge:7*24*60*60*1000
    });





    res.json( {message:"Login successful"} )
  

    console.log("success")
    console.log(accesstoken)


  } catch (err) {
    res.status(500).json({ error: "Login failed" });

    
  }


});


router.post("/refresh", (req, res) => {
  const token = req.cookies.refreshtoken;
  if (!token) return res.status(401).json({ error: "No refresh token" });

  try {
    const decoded = jwt.verify(token, REFRESH);
    const newAccessToken = createAccessToken(decoded.id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000
    });

    res.json({ message: "Access token refreshed" });
  } catch {
    res.status(401).json({ error: "Invalid refresh token" });
  }
});


router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});




















export default router

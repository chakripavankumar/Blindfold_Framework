import express from "express";
import  jwt  from "jsonwebtoken";
import {createAccountSchema,SigninSchema,CreateRoomSchema } from "@repo/common/types"
import { JWT_SECRET } from '@repo/backend-common/config';
const app = express();


app.post("/signup", (req,res)=>{
  const data =  createAccountSchema.safeParse(req.body);
  if(!data.success){
    res.json({
      message: "Incorrect inputs"
  })
  return;
  }
  res.json({
    userId: "123"
})
})
app.post("/signin", (req,res)=>{
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
      res.json({
          message: "Incorrect inputs"
      })
      return;
  }

  const userId = 1;
  const token = jwt.sign({
      userId
  }, JWT_SECRET);

  res.json({
      token
  })
})


app.post("/room", (req,res)=>{
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
      res.json({
          message: "Incorrect inputs"
      })
      return;
  }
  // db call

  res.json({
      roomId: 123
  })
})

app.listen(3005 ,()=>{
    console.log("port is sucessfully lising in port 3003" )
});
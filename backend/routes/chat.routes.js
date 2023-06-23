const express = require('express');
require('dotenv').config();
const {decodeToken}=require('../middlewares/decodeToken.middleware')
const chatRouter = express.Router();

chatRouter.use(decodeToken)

chatRouter.post('/completion',async (req,res)=>{
    const chatInput=req.body.message?.content
    // console.log(chatInput)
    try {
        await fetch("https://api.openai.com/v1/chat/completions",{
            method: 'POST',
            headers:{
                "Content-Type":'application/json',
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body:JSON.stringify({
                model: "gpt-3.5-turbo",
                "messages": [{role: 'user', content: `${chatInput}`}],
                max_tokens: 100
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            res.status(201).json(data);
        })
    } catch (error) {
        console.log(error)
    }
})


module.exports={chatRouter}
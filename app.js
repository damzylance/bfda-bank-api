let { json } = require('express');
let express = require('express')
let fs = require('fs')
let bcrypt = require("bcryptjs")
const {rootRouter:useApi} = require('./routes')

const app = express()
let PORT = 3000;


app.use(express.json())
app.use(useApi)


app.get('/',(req,res)=>{
    res.send(`app is running at ${PORT}`)
})
app.listen(PORT,()=>{
    console.log(`app is running at`)
    
})


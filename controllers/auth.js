let express = require ('express')
let bcrypt = require('bcryptjs')
let fs = require('fs')
const jwt = require('jsonwebtoken')
let app = express()

let signUp = (req,res) =>{
    let userData = req.body
    if(!userData.role) userData.role = "user"
    if(!userData.account) userData.account = "savings"
    userData.balance = 0
    
    const fileData = JSON.parse(fs.readFileSync("database.json"))

    if (!userData.email || !userData.password) return res.status(442).json({message:"Username and password required"})

    const userRecord = fileData.find(function({email}){
        return email.toLocaleLowerCase() === userData.email.toLowerCase()
    })
    
    if(userRecord){
        return res.status(404).json({
            message: `User with ${userData.email} already exist`
        })
    }
    let hashedPassword = bcrypt.hashSync(userData.password)
    userData.password = hashedPassword
    
   

    fileData.push(userData)
    fs.writeFileSync('database.json', JSON.stringify(fileData, null, 2));
    console.log(fileData)

    return res.status(201).json({
        message:"Registration Successful",
        data: {
            ...userData
        }
    })
}
let signIn = (req,res) => {
    let userData = req.body
    const fileData = JSON.parse(fs.readFileSync("database.json"))

    if(!userData.email||!userData.password) {
        return res.status(404).json(
            {
                message:"username or password required"
            })
    }


    const userRecord = fileData.find(function({email}){
        return email.toLocaleLowerCase() === userData.email.toLowerCase()
    })

    if(!userRecord) return res.status(404).json({message:"incorrect email or password"})

    const isValid = bcrypt.compareSync(userData.password,userRecord.password)

    if(!isValid) return res.status(404).json({message:"incorrect email or password"})

    const token = jwt.sign({user:userRecord.email},"secret",{expiresIn:"2h"})

    return res.status(201).json({
        message:"sign in succcessful",
        data: token,
    })



}

module.exports = {signUp,signIn}
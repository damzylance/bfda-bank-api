let express = require('express')
let jwt = require('jsonwebtoken')
let fs = require('fs')
let bcrypt = require('bcryptjs')
// -verify if user role is admin
// -search database for verify email and password
// -verify that user role is admin 
// -if not admin, print error message
// - autorize user to credit or debit

let creditUser = (req,res) => {
    let userData = req.body
    const fileData = JSON.parse(fs.readFileSync("./database.json"))

    if(!userData.email||!userData.password) {
        return res.status(404).json(
            {
                message:"username or password required"
            })
    }


    const adminRecord = fileData.find(function({email}){
        return email.toLocaleLowerCase() === userData.email.toLowerCase()
    })


    if(!adminRecord) return res.status(404).json({message:"incorrect email or password"})

    const isValid = bcrypt.compareSync(userData.password,adminRecord.password)

    if(!isValid) return res.status(404).json({message:"incorrect email or password"})

    if(adminRecord.role !== "admin") return res.status(404).json({
        message:"you don't have the permission to perform this action"
    })

    const userRecord = fileData.find(function({email}){
        return email.toLocaleLowerCase() === userData.user.toLowerCase()
    })
    
    if(!userRecord) return res.status(404).json({message:"user not found"})

    userRecord.balance += userData.amount

    fs.writeFileSync('database.json', JSON.stringify(fileData, null, 2));
    return res.status(201).json({
        message:"user account has been credited successfully"
    })

}
let debitUser =(req,res) => {
    let userData = req.body
    const fileData = JSON.parse(fs.readFileSync("database.json"))

    if(!userData.email||!userData.password) {
        return res.status(404).json(
            {
                message:"username or password required"
            })
    }


    const adminRecord = fileData.find(function({email}){
        return email.toLocaleLowerCase() === userData.email.toLowerCase()
    })


    if(!adminRecord) return res.status(404).json({message:"incorrect email or password"})

    const isValid = bcrypt.compareSync(userData.password,adminRecord.password)

    if(!isValid) return res.status(404).json({message:"incorrect email or password"})

    if(adminRecord.role !== "admin") return res.status(404).json({
        message:"you don't have the permission to perform this action"
    })

    const userRecord = fileData.find(function({email}){
        return email.toLocaleLowerCase() === userData.user.toLowerCase()
    })
    
    if(!userRecord) return res.status(404).json({message:"user not found"})

    userRecord.balance -= userData.amount

    fs.writeFileSync('database.json', JSON.stringify(fileData, null, 2));
    return res.status(201).json({
        message:"user account has been credited successfully"
    })

}

module.exports = {creditUser,debitUser}


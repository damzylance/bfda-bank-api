let express = require('express')
let fs = require('fs')
let bcrypt = require('bcryptjs')
let deleteUser = (req,res) =>{
    let userData = req.body

    let fileData = JSON.parse(fs.readFileSync("./database.json"))

    if(!userData.email || !userData.password){
        return res.status(404).json({
            message: "email and password required"
        })
    }

    const adminRecord = fileData.find(function({email}){
        return email.toLowerCase() === userData.email.toLowerCase()
    })

    if(!adminRecord) res.status(404).json({
        message:"incorrect email or password"
    })

    const isValid = bcrypt.compareSync(userData.password,adminRecord.password)

    if(!isValid) return res.status(404).json({
        message:"incorrect email or password"
    })
    if(adminRecord.role !== "admin") return res.status(404).json({
        message:"You don't have the permission to perform this action"
    })

    const userRecord = fileData.find(function({email}){
        
        return email.toLowerCase() === userData.user.toLowerCase()
    })

    if(!userRecord) return res.status(404).json({
        message:"User not found"
    })
    console.log(userRecord)
    console.log(fileData)
    // delete userRecord
    for(var i = 0; i < fileData.length;i++){
        if(fileData[i].email === userRecord.email){
            fileData.splice(i,1)
        }
    }

    console.log(fileData)


    fs.writeFileSync('database.json', JSON.stringify(fileData, null, 2));
    return res.status(201).json({
        message:"user account has been deleted successfully"
    })


}

module.exports = deleteUser

// for(var i = 0; i < fileData.length; i++) {
//     if(fileData[i].email === userData.user) {
//       fileData.splice(i, 1)
//       return ;
//     }
//  }
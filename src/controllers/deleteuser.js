const fs = require('fs')
const deleteUser = (req, res) => {
    const userData = req.body

    const fileData = JSON.parse(fs.readFileSync('src/database.json'))

    const userRecord = fileData.find(function ({ email }) {
        return email.toLowerCase() === userData.user.toLowerCase()
    })

    if (!userRecord)
        return res.status(404).json({
            message: 'User not found',
        })
    // delete userRecord
    for (let i = 0; i < fileData.length; i += 1) {
        if (fileData[i].email === userRecord.email) {
            fileData.splice(i, 1)
        }
    }

    fs.writeFileSync('src/database.json', JSON.stringify(fileData, null, 2))
    return res.status(201).json({
        message: 'user account has been deleted successfully',
    })
}

module.exports = deleteUser

// for(var i = 0; i < fileData.length; i++) {
//     if(fileData[i].email === userData.user) {
//       fileData.splice(i, 1)
//       return ;
//     }
//  }

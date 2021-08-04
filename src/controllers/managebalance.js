const fs = require('fs')
const bcrypt = require('bcryptjs')
// -verify if user role is admin
// -search database for verify email and password
// -verify that user role is admin
// -if not admin, print error message
// - autorize user to credit or debit

const creditUser = (req, res) => {
    const userData = req.body
    const fileData = JSON.parse(fs.readFileSync('src/database.json'))

    if (!userData.email || !userData.password) {
        return res.status(404).json({
            message: 'username or password required',
        })
    }

    const adminRecord = fileData.find(function ({ email }) {
        return email.toLocaleLowerCase() === userData.email.toLowerCase()
    })

    if (!adminRecord)
        return res.status(404).json({ message: 'incorrect email or password' })

    const isValid = bcrypt.compareSync(userData.password, adminRecord.password)

    if (!isValid)
        return res.status(404).json({ message: 'incorrect email or password' })

    if (adminRecord.role !== 'admin')
        return res.status(404).json({
            message: "you don't have the permission to perform this action",
        })

    const userRecord = fileData.find(function ({ email }) {
        return email.toLocaleLowerCase() === userData.user.toLowerCase()
    })

    if (!userRecord) return res.status(404).json({ message: 'user not found' })

    userRecord.balance += userData.amount

    fs.writeFileSync('src/database.json', JSON.stringify(fileData, null, 2))
    return res.status(201).json({
        message: 'user account has been credited successfully',
    })
}
const debitUser = (req, res) => {
    const userData = req.body
    const fileData = JSON.parse(fs.readFileSync('src/database.json'))

    if (!userData.email || !userData.password) {
        return res.status(404).json({
            message: 'username or password required',
        })
    }

    const adminRecord = fileData.find(function ({ email }) {
        return email.toLocaleLowerCase() === userData.email.toLowerCase()
    })

    if (!adminRecord)
        return res.status(404).json({ message: 'incorrect email or password' })

    const isValid = bcrypt.compareSync(userData.password, adminRecord.password)

    if (!isValid)
        return res.status(404).json({ message: 'incorrect email or password' })

    if (adminRecord.role !== 'admin')
        return res.status(404).json({
            message: "you don't have the permission to perform this action",
        })

    const userRecord = fileData.find(function ({ email }) {
        return email.toLocaleLowerCase() === userData.user.toLowerCase()
    })

    if (!userRecord) return res.status(404).json({ message: 'user not found' })

    userRecord.balance -= userData.amount

    fs.writeFileSync('src/database.json', JSON.stringify(fileData, null, 2))
    return res.status(201).json({
        message: 'user account has been debited successfully',
    })
}

module.exports = { creditUser, debitUser }

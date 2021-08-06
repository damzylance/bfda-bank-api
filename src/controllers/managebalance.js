const fs = require('fs')
// -verify if user role is admin
// -search database for verify email and password
// -verify that user role is admin
// -if not admin, print error message
// - autorize user to credit or debit

const creditUser = (req, res) => {
    const userData = req.body
    const fileData = JSON.parse(fs.readFileSync('src/database.json'))

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

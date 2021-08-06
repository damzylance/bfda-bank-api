const Router = require('express')
const auth = require('./auth')
const manageAccount = require('./managebalance')
const deleteUser = require('./deleteuser')
const authorize = require('../middleware/authorization')

const rootRouter = Router()

rootRouter.use('/', auth)
rootRouter.use('/', authorize, manageAccount)
rootRouter.use('/', authorize, deleteUser)

module.exports.rootRouter = rootRouter

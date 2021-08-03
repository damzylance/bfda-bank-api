const Router = require('express')
const auth = require('./auth')
const manageAccount = require('./managebalance')
const deleteUser = require('./deleteuser')
const rootRouter = Router()

rootRouter.use('/',auth)
rootRouter.use('/',manageAccount)
rootRouter.use('/',deleteUser)

module.exports.rootRouter = rootRouter
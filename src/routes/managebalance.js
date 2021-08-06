const { Router } = require('express')
const manageAccount = require('../controllers/managebalance')

const accountRoute = Router()

accountRoute.post('/credituser', manageAccount.creditUser)
accountRoute.post('/debituser', manageAccount.debitUser)

module.exports = accountRoute

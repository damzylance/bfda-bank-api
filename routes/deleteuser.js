const {Router} = require('express')
const deleteUser = require('../controllers/deleteuser')
require("../controllers/managebalance")

const removeUserRoute = Router()

removeUserRoute.post("/deleteuser",deleteUser)

module.exports = removeUserRoute

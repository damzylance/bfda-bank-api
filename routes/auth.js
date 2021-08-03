const {Router} = require('express')
const auth = require('../controllers/auth.js')

const authRoute = Router()

authRoute.post("/register",auth.signUp)
authRoute.post("/login",auth.signIn)




module.exports = authRoute

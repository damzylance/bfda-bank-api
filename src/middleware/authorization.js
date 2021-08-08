const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) res.status(403).json({ message: 'No token in the header' })
    // eslint-disable-next-line prefer-destructuring
    console.log(token)
    if (token.startsWith('Bearer')) token = token.split(' ')[1]
    try {
        const data = jwt.verify(token, 'secret')
        if (data.role !== 'admin')
            return res.status(401).json({
                message: 'You are not allowed to take this action',
            })
        return next()
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
        })
    }
}

module.exports = verifyToken

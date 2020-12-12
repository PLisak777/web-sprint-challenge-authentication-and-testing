const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'it\'s a secret to everyone'

module.exports = (req, res, next) {
try {
    const { authorization } = req.headers;
    const decoded = jwt.verify(authorization, secret)
    req.decoded = decoded
    next()
} catch (err) {
    res.status(401).json({
        message: 'You shall not pass!',
        error: err
    })
}
    
}
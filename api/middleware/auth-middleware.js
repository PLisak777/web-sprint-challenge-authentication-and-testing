const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		req.token = jwt.verify(token, secrets.jwtSecret);
		console.log(req.token);
	} catch (err) {
		console.error(err);
		next({
			code: 401,
			message: 'Invalid token',
		});
	}
};

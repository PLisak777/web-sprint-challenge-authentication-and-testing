const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./auth-model');
const registerUser = require('./registerUser');

router.post('/register', async (req, res) => {
	try {
		const user = req.body;
		const newUser = await registerUser(user);

		res.status(201).json(newUser);
	} catch (err) {
		res.status(500).json({
			message: 'There was a problem creating a new user',
			error: err,
		});
	}
});

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await db.getUserByUsername(username);

		if (user && bcrypt.compareSync(password, user.password)) {
			res.status(200).json(user);
		} else {
			res.status(403).json({
				message: 'Sorry, unable to locate user',
			});
		}
	} catch (err) {
		res.status(500).json({
			message: 'Unable to log in',
			error: err,
		});
	}
});

module.exports = router;

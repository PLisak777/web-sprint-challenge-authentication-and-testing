const bcrypt = require('bcryptjs');

const db = require('./auth-model');

module.exports = async function (user) {
	const hashed = bcrypt.hashSync(user.password, 10);
	user.password = hashed;
	const newUser = await db.insertUser(user);

	return newUser;
};

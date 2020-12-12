const knex = require('knex');
const db = require('../../data/dbConfig');
const jwt = require('jsonwebtoken');

function getUsers() {
	return db('users');
}

async function getUserByUsername(username) {
	const user = await db('users').where({ username }).first();
	return { ...user, token: generateToken(user) };
}

async function insertUser(user) {
	const index = await db('users').insert(user);

	return getUserByUsername(user.username);
}

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
	};
	const secret = process.env.JWT_SECRET || "it's a secret to everyone";
	const options = {
		expiresIn: '1d',
	};
	return jwt.sign(payload, secret, options);
}

module.exports = {
	getUsers,
	getUserByUsername,
	insertUser,
};

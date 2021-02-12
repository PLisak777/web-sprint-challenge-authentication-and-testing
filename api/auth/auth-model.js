const db = require('../../data/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById,
};

function find() {
	return db('users').select('id, ;username').orderBy('id');
}

function findBy(filter, select) {
	return db('users').select(select).where(filter);
}

async function add(user) {
	const [id] = await db('users').insert(user, 'id');
	return findById(id);
}

async function findById(id) {
	return db('users').where({ id }).first();
}
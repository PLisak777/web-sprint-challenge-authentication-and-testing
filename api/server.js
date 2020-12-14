const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('./middleware/auth-middleware');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', auth, jokesRouter);
server.use('/', (req, res) => res.json({ api: 'running' }));
server.use(errorHandler);

module.exports = server;

function errorHandler(err, req, res, next) {
	res.status(err.code).json({
		message: err.message,
	});
}

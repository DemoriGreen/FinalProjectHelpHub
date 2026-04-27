require('dotenv').config();
const express = require('express');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const ticketsRouter = require('./routes/tickets');
const requestLogger = require('./middleware/requestLogger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/tickets', ticketsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

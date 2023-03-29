const { instrument } = require('@socket.io/admin-ui');
const path = require('path');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');
const databaseFunction = require('./controllers/databaseController');
app.use(express.json());
app.use(express.static(path.join(__dirname, './../build')));

const users = [];

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use('/api', apiRoutes);
app.use('/users', userRoutes);

const server = http.createServer(app);

const io_server = socketIO(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://admin.socket.io'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io_server.on('connection', (socket_connection) => {
  console.log('user connected', socket_connection.id);

  // socket_connection.on('connect', (res) => {
  //   console.log('a user has connected', res.id);
  // });
  socket_connection.on('disconnect', async (res) => {
    console.log('user disconnected');
    const username = await databaseFunction.getUserName(res.user_cookies);
    const unIndex = users.indexOf(username);
    if (unIndex != null && unIndex !== undefined) users.splice(unIndex, 1);
    console.log('Users logged in:', users);
  });

  socket_connection.on('i_have_joined', async (res) => {
    console.log('in user has joined server.js');
    console.log('this user has joined', res.user_cookies);
    const username = await databaseFunction.getUserName(res.user_cookies);
    if (!users.includes(username)) users.push(username);
    io_server.emit('emmiting_to_users', users);
    console.log('Users logged in:', users);
    // io_server.emit('usersArray')
    // `${username} has won this round`);
  });
});

// io_server.on('connection', (socket_connection) => {
//   console.log('A user connected ', socket_connection.id);
//   io_server.emit('userjoined', { id: socket_connection.id });

//   socket_connection.on('user_input', (res) => {
//     console.log('User input is correct you win', res.message);
//     // socket_connection.emit('testing the response', { message: 'im here' });
//   });

//   socket_connection.on('user_has_won', (res) => {
//     console.log('User ', res.user_cookie, 'has won');
//   });
//   socket.on('disconnect', () => {

// })
// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
//
//
//
//
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = {
    ...defaultErr,
    log: err.log,

    message: err.message,
  };
  console.log(errorObj.log);

  res.status(errorObj.status).json(errorObj.message);
  //   res.locals.message = err.message;
  //   console.log('ERROR: ', err);
  //   const errorStatus = err.status
  //  || 500;
  //   return res.status(errorStatus).send(res.locals.message);
});

// instrument(io_server, { auth: false });

server.listen(5001, () => {
  console.log('Server is running on port 5001');
});

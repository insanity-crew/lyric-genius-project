const path = require('path');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');
const io = require('socket.io');
const http = require('http');

app.use(express.json());
app.use(express.static(path.join(__dirname, './../build')));

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use('/api', apiRoutes);
app.use('/users', userRoutes);

const server = http.createServer(app);

// const io_server = socketIO(server, {

// })
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
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
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});

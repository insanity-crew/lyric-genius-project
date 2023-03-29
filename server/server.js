const path = require('path');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const mongoose = require('mongoose');
// const cors = require('cors');

app.use(express.json());
app.use(express.static(path.join(__dirname, './../build')));

const MONGO_URI =
  'mongodb+srv://iterationDB:iterationDB@cluster0.8frqam3.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'lyric-genius-project',
  })
  // .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// app.use(
//   cors({
//     credentials: true,
//     origin: 'http://localhost:5001',
//   })
// );

app.use('/api', apiRoutes);
app.use('/users', userRoutes);
//
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

function createServer() {
  const app = express();
  app.use(express.json());
  app.use('/api', apiRoutes);
  app.use('/users', userRoutes);
  return app;
}

module.exports = createServer;

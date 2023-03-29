const User = require('../models/userModel');
const userController = {};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

userController.createUser = async (req, res, next) => {
  //deconstruct body
  const { name, email, password } = req.body;

  //test for invalid input
  if (name.length < 1)
    return next({
      log: 'Invalid name param in userController.createUser middleware function',
      status: 400,
      message: {
        err: ' Invalid name param in userController.createUser middleware function',
      },
    });
  if (!validateEmail(email))
    return next({
      log: 'Invalid email param in userController.createUser middleware function',
      status: 400,
      message: {
        err: ' Invalid email param in userController.createUser middleware function',
      },
    });
  if (password.length < 1)
    return next({
      log: 'Invalid password param in userController.createUser middleware function',
      status: 400,
      message: {
        err: 'Invalid password param in userController.createUser middleware function',
      },
    });

  // MongoDB Create User & Error Handling
  try {
    await User.create({ name, email, password });
    return next();
  } catch (err) {
    return next({
      log: 'Express error handler caught createUser middleware error',
      status: 400,
      message: { err: err.message },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  //deconstruct body
  const { email, password } = req.body;

  //test for invalid input
  if (!validateEmail(email))
    return next({
      log: 'Invalid email param in userController.createUser middleware function',
      status: 400,
      message: {
        err: ' Invalid email param in userController.createUser middleware function',
      },
    });
  if (password.length < 1)
    return next({
      log: 'Invalid password param in userController.createUser middleware function',
      status: 400,
      message: {
        err: 'Invalid password param in userController.createUser middleware function',
      },
    });

  //query database
  const user = await User.findOne({ email, password });

  //handle no user found
  if (!user) {
    return next({
      log: 'Error in userController.verifyUser middleware function no user found in DB',
      status: 400,
      message: {
        err: 'Error in userController.verifyUser middleware function no user found in DB',
      },
    });
  }

  //verification process
    //if match, send through
  if (password === user.password) {
    res.locals.id = user._id;
    res.locals.verified = true;
    return next();
    //if no match return incorrect user/password
  } else {
    return next({
      log: 'Wrong username or password',
      status: 400,
      message: {
        err: 'Wrong username or password',
      },
    });
  }
};
module.exports = userController;

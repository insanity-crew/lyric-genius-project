const User = require('../models/userModel');

const userController = {};

userController.createUser = async (req, res, next) => {
  console.log('in createuser controller');
  const { name, email, password } = req.body;
  try {
    if (name && password && email) {
      await User.create({ name, email, password });
      return next();
    } else {
      throw new Error('Missing name, email, or password');
    }
  } catch (err) {
    next({
      log: 'Express error handler caught createUser middleware error',
      status: 400,
      message: { err: err.message },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.locals.error = 'Incorrect email';
    return next();
  }

  if (password === user.password) {
    console.log('id in verifyUser', user._id);
    res.locals.id = user._id;
    res.locals.verified = true;
    return next();
  } else {
    res.locals.error = 'Incorrect password';
    res.locals.verified = false;
    return next();
  }
};

module.exports = userController;

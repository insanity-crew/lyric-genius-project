const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookiesController = require('../controllers/cookiesController');
const databaseController = require('../controllers/databaseController');

router.post(
  '/createusers',
  userController.createUser,
  cookiesController.setSSIDCookie,
  (req, res) => {
    res.status(200).send('User Created');
  }
);

router.post(
  '/login',
  userController.verifyUser,
  cookiesController.setSSIDCookie,
  (req, res) => {
    res.status(200).json({
      id: res.locals.id,
      verified: res.locals.verified,
    });
  }
);

// router.post('/getUser', databaseController.getUser, (req, res) => {
//   res.status(201).json(res.locals.id);
// });

module.exports = router;

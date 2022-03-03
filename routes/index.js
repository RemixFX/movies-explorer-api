const router = require('express').Router();
const usersRoute = require('./users');
const moviesRoute = require('./movies');
const { validationLogin, validationCreateUser } = require('../middlewares/validations');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.post('/signin', validationLogin, login);

router.post('/signup', validationCreateUser, createUser);

router.post('/signout', logout);

router.use(auth);
router.use('/users', usersRoute);
router.use('/movies', moviesRoute);

router.use('*', (req, res, next) => {
  next(new NotFoundError('запрашиваемый ресурс не найден'));
});

module.exports = router;

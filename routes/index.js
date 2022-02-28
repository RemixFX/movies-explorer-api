const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRoute = require('./users');
const moviesRoute = require('./movies');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).messages({
    'string.empty': 'Поле {#label} не может быть пустым',
    'string.min': 'Поле {#label} должно быть минимум {#limit} символов',
    'any.required': '{#label} - обязательное поле',
    'string.email': 'Неверный формат почты',
    'object.unknown': 'Переданы не разрешенные данные',
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }).messages({
    'string.empty': 'Поле {#label} не может быть пустым',
    'string.min': 'Поле {#label} должно быть минимум {#limit} символов',
    'string.max': 'Поле {#label} может быть максимум {#limit} символов',
    'any.required': '{#label} - обязательное поле',
    'string.email': 'Неверный формат почты',
    'string.pattern.base': 'Некорректный адрес ссылки',
  }),
}), createUser);

router.post('/signout', logout);

router.use(auth);
router.use('/users', usersRoute);
router.use('/movies', moviesRoute);

router.use('*', (req, res, next) => {
  next(new NotFoundError('запрашиваемый ресурс не найден'));
});

module.exports = router;

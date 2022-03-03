const { celebrate, Joi } = require('celebrate');

const validationCreateUser = celebrate({
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
});

const validationLogin = celebrate({
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
});

const validationUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }).messages({
    'string.empty': 'Поле {#label} не может быть пустым',
    'string.min': 'Поле {#label} должно быть минимум {#limit} символа',
    'string.max': 'Поле {#label} может быть максимум {#limit} символов',
    'any.required': '{#label} - обязательное поле',
    'string.email': 'Неверный формат почты',
    'object.unknown': 'Переданы не разрешенные данные',
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
      .regex(/^(https?:\/\/)(w{0,3})(([\da-z-]+)\.){1,3}([a-z.]{2,6})([\w-:~?#@!$&'()*+,;=./]*)*\/?$/),
    trailerLink: Joi.string().required()
      .regex(/^(https?:\/\/)(w{0,3})(([\da-z-]+)\.){1,3}([a-z.]{2,6})([\w-:~?#@!$&'()*+,;=./]*)*\/?$/),
    thumbnail: Joi.string().required()
      .regex(/^(https?:\/\/)(w{0,3})(([\da-z-]+)\.){1,3}([a-z.]{2,6})([\w-:~?#@!$&'()*+,;=./]*)*\/?$/),
    nameRU: Joi.string().required()
      .regex(/^[^a-z]+$/i, { name: 'русском' }),
    nameEN: Joi.string().required()
      .regex(/^[^а-яё]+$/i, { name: 'английском' }),
  }).messages({
    'string.empty': 'Поле {#label} не может быть пустым',
    'string.min': 'Поле {#label} должно быть минимум {#limit} символов',
    'string.max': 'Поле {#label} может быть максимум {#limit} символов',
    'any.required': '{#label} - обязательное поле',
    'string.pattern.base': 'Некорректный адрес ссылки1',
    'string.pattern.name': 'Поле {#label} должно быть на {#name} языке',
    'object.unknown': 'Переданы не разрешенные данные',
  }).unknown(true),
});

const validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }).messages({
    'string.empty': 'Поле {#label} не может быть пустым',
    'string.length': 'Поле {#label} должно быть длиной 24 символов',
    'string.hex': 'Поле {#label} содержит некорректный id',
    'any.required': '{#label} - обязательное поле',
  }),
});

module.exports = {
  validationLogin,
  validationCreateUser,
  validationUpdateProfile,
  validationCreateMovie,
  validationDeleteMovie,
};

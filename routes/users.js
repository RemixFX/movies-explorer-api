const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMyProfile, updateProfile } = require('../controllers/users');

router.get('/me', getMyProfile);

router.patch('/me', celebrate({
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
}), updateProfile);

module.exports = router;

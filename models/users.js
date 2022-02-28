/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Некорректный адрес почты',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

// Убираем возврат поля password при создании пользователя
userSchema.methods.toJSON = function noShowPassword() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new Error('Неправильная почта или пароль'));
    }
    return bcrypt.compare(password, user.password).then((result) => {
      if (!result) {
        return Promise.reject(new Error('Неправильная почта или пароль'));
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);

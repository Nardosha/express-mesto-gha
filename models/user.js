import * as mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js';
import isURL from 'validator/lib/isURL.js';
import {REQUIRED_EMAIL_ERR, REQUIRED_PASSWORD_ERR} from "../utils/ENUMS.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь'
  },
  avatar: {
     type: String,
     validate: {
        validator: function (url) {
          return isURL(url)
        },
        message: 'Введите пароль'
      },
     default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
    },
    email: {
      type: String,
      unique: true,
      required: [true, REQUIRED_EMAIL_ERR],
      validate: {
        validator: function(email) {
          return isEmail(email)
        },
        message: 'Введите пароль'
      }
    },
    password: {
      type: String,
      required: [true, REQUIRED_PASSWORD_ERR],
      select: false
    }
})

userSchema.statics.findUserByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({email}).select('+password')
    if (!user) {
      throw new Error('Неправильные почта или пароль')
    }

    return user
  } catch (e) {
    console.log('catch in findUserByCredentials', e)
  }
}

const User = mongoose.model('user', userSchema);

export {User, userSchema};
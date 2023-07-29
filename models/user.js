import * as mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто'
  },
  about:{
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v)
      },
      message: 'Введите пароль'
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
})

userSchema.statics.findUserByCredentials = async function(email, password) {
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
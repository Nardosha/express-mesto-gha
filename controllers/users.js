import {User} from "../models/user.js";
import {DEFAULT_ERROR_CODE, DEFAULT_MESSAGE, INCORRECT_DATA_ERROR_CODE, NOT_FOUND_ERROR_CODE} from "../utils/ENUMS.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findUserByCredentials(email, password)

    if (!user) {
      throw new Error('Неверные имя пользоваеля или пароль')
    }

    const token = jwt.sign({_id: user._id}, 'shrek', {
      expiresIn: 3600000 * 24 * 7
    })

    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true
    })
    res.send(token)
  } catch (err) {
    res.status(401).send({message: err.message})
  }
}

const createUser = async (req, res) => {
  try {
    const {
      name = undefined,
      about = undefined,
      avatar = undefined,
      email,
      password
    } = req.body;

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({name, about, avatar, email, password: hash});
    res.send({data: user})
  } catch (err) {
    if (err.name === "CastError" || err.name === "ValidationError") {
      res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Переданы некорректные данные при создании пользователя."})
      return
    }

    res.status(DEFAULT_ERROR_CODE).send({message: DEFAULT_MESSAGE})
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send({data: users})
  } catch (err) {
    if (err.name === "CastError" || err.name === "ValidationError") {
      res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Переданы некорректные данные при поиске пользователей."})
      return
    }

    res.status(DEFAULT_ERROR_CODE).send({message: DEFAULT_MESSAGE})
  }

}

const getUser = async (req, res) => {
  try {
    const {userId} = req.params;

    const user = await User.findById(userId)

    if (!user) {
      const customError = new Error();
      customError.name = 'ValidationError'
      throw customError
    }

    res.send({data: user})
  } catch (err) {
    if (err.name === "CastError") {
      res.status(INCORRECT_DATA_ERROR_CODE).send({message: "ереданы некорректные данные при поиске пользователя."})
      return
    }

    if (err.name === "ValidationError") {
      res.status(NOT_FOUND_ERROR_CODE).send({message: "Пользователь по указанному _id не найден."})
      return
    }

    res.status(DEFAULT_ERROR_CODE).send({message: DEFAULT_MESSAGE})
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(userId, {...req.body}, {
      new: true,
      runValidators: true,
      upsert: true
    });

    if (!user) {
      const customError = new Error();
      customError.name = 'ValidationError'
      throw customError
    }

    res.send({data: user});

  } catch (err) {
    if (err.name === "CastError") {
      res.status(NOT_FOUND_ERROR_CODE).send({message: "Пользователь с указанным _id не найден."})
      return
    }

    if (err.name === "ValidationError") {
      res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Переданы некорректные данные при обновлении профиля."})
      return

    }
    res.status(DEFAULT_ERROR_CODE).send({message: DEFAULT_MESSAGE})
  }
}

const updateAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const {avatar} = req.body;

    const user = await User.findByIdAndUpdate(userId, {avatar}, {
      new: true,
      runValidators: true,
      upsert: true
    });

    if (!user) {
      const customError = new Error();
      customError.name = 'ValidationError'
      throw customError
    }

    res.send({data: user});

  } catch (err) {
    if (err.name === "CastError") {
      res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Переданы некорректные данные при обновлении аватара."})
      return
    }

    if (err.name === "ValidationError") {
      res.status(NOT_FOUND_ERROR_CODE).send({message: "Пользователь с указанным _id не найден."})
      return

    }
    res.status(DEFAULT_ERROR_CODE).send({message: DEFAULT_MESSAGE})
  }
}


export {
  login,
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateAvatar
}
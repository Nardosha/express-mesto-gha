import {User} from "../models/user.js";
import {DEFAULT_ERROR_CODE, DEFAULT_MESSAGE, INCORRECT_DATA_ERROR_CODE, NOT_FOUND_ERROR_CODE} from "../utils/ENUMS.js";

const createUser = async (req, res) => {
  try {
    const {name, about, avatar} = req.body;

    const user = await User.create({name, about, avatar});

    res.send({data: user})
  } catch (err) {
    if (err.name === "CastError") {
      res.status(NOT_FOUND_ERROR_CODE).send({message: "Переданы некорректные данные при создании пользователя."})
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
    if (err.name === "CastError") {
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
    res.send({data: user})
  } catch (err) {
    if (err.name === "CastError") {
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

    res.send({data: user});

  } catch (err) {
    if (err.name === "CastError") {
      res.status(NOT_FOUND_ERROR_CODE).send({message: "Пользователь с указанным _id не найден."})
      return
    }

    if (err.name === "ValidationError") {
      res.status(NOT_FOUND_ERROR_CODE).send({message: "Переданы некорректные данные при обновлении профиля."})
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

    res.send({data: user});

  } catch (err) {
    if (err.name === "CastError") {
      res.status(NOT_FOUND_ERROR_CODE).send({message: "Пользователь с указанным _id не найден."})
      return
    }

    if (err.name === "ValidationError") {
      res.status(NOT_FOUND_ERROR_CODE).send({message: "Переданы некорректные данные при обновлении аватара."})
      return

    }
    res.status(DEFAULT_ERROR_CODE).send({message: DEFAULT_MESSAGE})
  }
}


export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateAvatar
}
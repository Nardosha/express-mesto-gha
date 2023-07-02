import {User} from "../models/user.js";

const createUser = async (req, res) => {
  console.log(1, 'Запрос createUser')

  try {
    const {name, about, avatar} = req.body;

    const user = await User.create({name, about, avatar});

    res.send({data: user})
  } catch (err) {
    res.status(500).send({message: err.message})
  }

}

const getUsers = (req, res) => {
  console.log(1, 'Запрос getUsers');
  try {
    const users = User.find({});

    res.send({data: users})
  } catch (err) {
    res.status(500).send({message: err.message})
  }

}


const getUser = async (req, res) => {
  console.log(1, 'Запрос getUser')

  try {
    const {userId} = req.params;

    const user = await User.findById(id)
    res.send({data: user})
  } catch (err) {
    res.status(500).send({message: err.message})
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
    res.status(500).send({message: err.message})
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
    res.status(500).send({message: err.message})
  }
}


export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateAvatar
}
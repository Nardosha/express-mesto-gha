import { User } from "../models/user.js";

const createUser = (req, res) => {
  console.log(1, 'Запрос createUser')
  console.log(3, req.body)

  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => {
      console.log('new user', user)
      res.send(user)
    })
    .catch(err => res.status(500).send({message: err.message}))
}

const getUsers = (req, res) => {
  console.log(1, 'Запрос getUsers')
  console.log(2, 'req', req)
  console.log(3, 'res', res)

  User.find({})
    .then(users => {
      console.log('users', users)
      res.send({data: users})
    })
    .catch(err => res.status(500).send({message: err.message}))
}


const getUser = (req, res) => {
  console.log(1, 'Запрос getUser')
  console.log(3, 'req', req)

  const {id} = req.params;

  User.findById(id)
    .then(user => {
      console.log('user', user)
      res.send({data: user})
    })
    .catch(err => res.status(500).send({message: err.message}))
}

export {
  createUser,
  getUsers,
  getUser
}
import User from "../models/user.js";


const createUser = (req, res) => {
  console.log('createUser')
  console.log('req', req)
  console.log('res', res)

  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => {
      console.log('new user', user)
      res.send(user)
    })
    .catch(err => res.status(500).send({message: err.message}))
}

const getUsers = (req, res) => {
  console.log('getUsers')
  console.log('req', req)
  console.log('res', res)

  User.find({})
    .then(users => {
      console.log('users', users)
      res.send({data: users})
    })
    .catch(err => res.status(500).send({message: err.message}))
}


const getUser = (req, res) => {
  console.log('getUser')
  console.log('req', req)
  console.log('res', res)

  User.findById(req.params.id)
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
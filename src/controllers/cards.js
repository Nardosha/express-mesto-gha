import Card from '../models/card.js'


const createCard = async (req, res) => {
  try {
    const {name, link, ownerId = req.user._id, likes} = req.body;

    const card = await Card.create({name, link, owner: ownerId, likes})
    await card.populate(['owner', 'likes'])

    res.send({data: card})

  } catch (e) {
    res.status(500).send({message: e.message})
  }
}

const getCards = (req, res) => {
  Card.find({})
    .then(cards => {
      res.send({data: cards})
    })
    .catch(err => {
      res.status(500).send({message: err.message})
    })
}

const deleteCard = (req, res) => {
  const {id} = req.params;

  Card.findByIdAndRemove(id)
    .then(card => {
      res.send({data: card})
    })
    .catch(err => {
      res.status(500).send({message: err.message})
    })
}

export {
  createCard,
  getCards,
  deleteCard
}
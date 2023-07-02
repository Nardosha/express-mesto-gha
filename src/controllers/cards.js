import Card from '../models/card.js'
import {User} from "../models/user.js";


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

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({})

    res.send({data: cards})
  } catch (e) {
    res.status(500).send({message: e.message})
  }
}

const deleteCard = async (req, res) => {
  try {
    const {cardId} = req.params;

    const card = await Card.findByIdAndRemove(cardId);

    res.send({data: card});
  } catch (e) {
    res.status(500).send({message: e.message})
  }
}

const likeCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const {cardId} = req.params;


    const card = await Card.findByIdAndUpdate(cardId, {
        $addToSet: {likes: userId}
      },
      {new: true}
    );

    await card.populate('likes')

    res.send({data: card});

  } catch (err) {
    res.status(500).send({message: err.message})
  }
}


const dislikeCard = async (req, res) => {
  const userId = req.user._id;
  const {cardId} = req.params;

  const card = await Card.findByIdAndUpdate(cardId, {$pull: {likes: userId}}, {new: true})
  res.send({data: card})
}

export {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard
}
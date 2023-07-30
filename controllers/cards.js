import Card from '../models/card.js'
import {
  DEFAULT_ERROR_CODE,
  INTERNAL_SERVER_ERROR, DELETE_CARD_FORBIDDEN_ERROR,
  INCORRECT_DATA_ERROR_CODE, NOT_FOUND_CARD_ERROR,
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_USER_ERROR
} from "../utils/ENUMS.js";
import NotFoundError from "../errors/NotFoundError.js";
import ForbiddenError from "../errors/ForbiddenError.js";

const createCard = async (req, res, next) => {
  try {
    const {name, link, ownerId = req.user._id, likes} = req.body;

    const card = await Card.create({name, link, owner: ownerId, likes})
    await card.populate(['owner', 'likes'])

    res.send({data: card})

  } catch (err) {
    next(err)
  }
}

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({})

    res.send({data: cards});
  } catch (err) {
    next(err)
  }
}

const deleteCard = async (req, res, next) => {
  try {
    const {cardId} = req.params;
    const {_id: userId} = req.user


    const isOwner = Card.isOwner(cardId, userId)


    if (!isOwner) {
      throw new ForbiddenError(DELETE_CARD_FORBIDDEN_ERROR)
    }
    const deletedCard = await Card.findByIdAndDelete(cardId)

    res.send({data: deletedCard});
  } catch (err) {
    next(err)
  }
}

const likeCard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {cardId} = req.params;


    const card = await Card.findByIdAndUpdate(cardId, {
        $addToSet: {likes: userId}
      },
      {new: true}
    )

    if (!card) {
      throw new NotFoundError(NOT_FOUND_CARD_ERROR)
    }

    await card.populate('likes')

    res.send({data: card});

  } catch (err) {
    next(err)
  }
}

const dislikeCard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {cardId} = req.params;

    const card = await Card.findByIdAndUpdate(cardId, {$pull: {likes: userId}}, {new: true})

    if (!card) {
      throw new NotFoundError(NOT_FOUND_CARD_ERROR)
    }

    res.send({data: card})
  } catch (err) {
    next(err)
  }
}

export {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard
}
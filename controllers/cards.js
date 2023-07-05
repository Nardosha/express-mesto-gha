import Card from '../models/card.js'
import {DEFAULT_ERROR_CODE, DEFAULT_MESSAGE, INCORRECT_DATA_ERROR_CODE, NOT_FOUND_ERROR_CODE} from "../utils/ENUMS.js";

const createCard = async (req, res) => {
  try {
    const {name, link, ownerId = req.user._id, likes} = req.body;

    const card = await Card.create({name, link, owner: ownerId, likes})
    await card.populate(['owner', 'likes'])

    res.send({data: card})

  } catch (err) {
    if (err.name === "CastError" || err.name === "ValidationError") {
      res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Переданы некорректные данные при создании карточки."})
      return
    }

    res.status(DEFAULT_ERROR_CODE).send({message: DEFAULT_MESSAGE})
  }
}

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({})

    res.send({data: cards});
  } catch (err) {
    if (err.name === "CastError" || err.name === "ValidationError") {
      res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Переданы некорректные данные при поиске карточек."})
      return
    }

    res.status(DEFAULT_ERROR_CODE).send({message: DEFAULT_MESSAGE})
  }
}

const deleteCard = async (req, res) => {
  try {
    const {cardId} = req.params;

    const card = await Card.findByIdAndRemove(cardId);

    if (!card) {
      const customError = new Error();
      customError.name = 'ValidationError'
      throw customError
    }

    res.send({data: card});
  } catch (err) {
    if (err.name === "CastError") {
      res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Переданы некорректные данные карточки."})
      return
    }

    if (err.name === "ValidationError") {
      res.status(NOT_FOUND_ERROR_CODE).send({message: "Карточка с указанным _id не найдена."})
      return
    }

    res.status(DEFAULT_ERROR_CODE).send({message: DEFAULT_MESSAGE})
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
    if (err.name === "CastError") {
      res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Передан несуществующий _id карточки."})
      return
    }

    if (err.name === "ValidationError" || err.name === "TypeError") {
      res.status(NOT_FOUND_ERROR_CODE).send({message: "Переданы некорректные данные для постановки лайка."})
      return

    }
    res.status(DEFAULT_ERROR_CODE).send({message: DEFAULT_MESSAGE})
  }
}


const dislikeCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const {cardId} = req.params;

    const card = await Card.findByIdAndUpdate(cardId, {$pull: {likes: userId}}, {new: true})

    if (!card) {
      const customError = new Error();
      customError.name = 'ValidationError'
      throw customError
    }

    res.send({data: card})
  } catch (err) {
    if (err.name === "CastError") {
      res.status(INCORRECT_DATA_ERROR_CODE).send({message: "Передан несуществующий _id карточки."})
      return
    }

    if (err.name === "ValidationError") {
      res.status(NOT_FOUND_ERROR_CODE).send({message: "Переданы некорректные данные для снятии лайка."})
      return

    }
    res.status(DEFAULT_ERROR_CODE).send({message: DEFAULT_MESSAGE})
  }
}

export {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard
}
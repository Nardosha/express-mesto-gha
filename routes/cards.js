import express from "express"
import {createCard, deleteCard, dislikeCard, getCards, likeCard} from "../controllers/cards.js";
import {auth} from "../middlewares/auth.js";

const router = express.Router();

router.get('/', auth, getCards);
router.post('/', auth, createCard);
router.delete('/:cardId', auth, deleteCard);
router.put('/:cardId/likes', auth, likeCard)
router.delete('/:cardId/likes', auth, dislikeCard)

export default router;

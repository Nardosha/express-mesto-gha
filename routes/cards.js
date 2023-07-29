import express from "express"
import {createCard, deleteCard, dislikeCard, getCards, likeCard} from "../controllers/cards.js";
import {auth} from "../middlewares/auth.js";
import {validateCardData, validateCardId} from "../utils/validationHelper.js";

const router = express.Router();

router.get('/', auth, getCards);
router.post('/', validateCardData, auth, createCard);
router.delete('/:cardId', validateCardId, auth, deleteCard);
router.put('/:cardId/likes', validateCardId, auth, likeCard)
router.delete('/:cardId/likes', validateCardId, auth, dislikeCard)

export default router;

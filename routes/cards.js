import express from "express"
import {createCard, deleteCard, dislikeCard, getCards, likeCard} from "../controllers/cards.js";
import {auth} from "../middlewares/auth.js";
import {validateCardData, validateId} from "../utils/validationHelper.js";

const router = express.Router();

router.get('/', auth, getCards);
router.post('/', validateCardData, auth, createCard);
router.delete('/:cardId', validateId, auth, deleteCard);
router.put('/:cardId/likes', validateId, auth, likeCard)
router.delete('/:cardId/likes', validateId, auth, dislikeCard)

export default router;

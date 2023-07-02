import express from "express"
import {createCard, deleteCard, getCards} from "../controllers/cards.js";

const router = express.Router();

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);

export default router;
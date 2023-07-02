import express from "express"
import {createUser, getUser, getUsers} from "../controllers/users.js";

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/userId', getUser);

export default router;

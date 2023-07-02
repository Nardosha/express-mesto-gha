import express from "express"
import {createUser, getUser, getUsers, updateAvatar, updateUser} from "../controllers/users.js";

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);

router.patch('/me', updateUser)
router.patch('/me/avatar', updateAvatar)

export default router;

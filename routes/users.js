import express from "express"
import {login, createUser, getUser, getUsers, updateAvatar, updateUser} from "../controllers/users.js";

const router = express.Router();

router.post('/signin', login)
router.post('/signup', createUser);
router.get('/', getUsers);
router.get('/:userId', getUser);

router.patch('/me', updateUser)
router.patch('/me/avatar', updateAvatar)

export default router;

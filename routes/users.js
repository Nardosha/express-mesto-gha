import express from "express"
import {login, createUser, getUser, getUsers, updateAvatar, updateUser, getUserInfo} from "../controllers/users.js";
import {auth} from "../middlewares/auth.js";

const router = express.Router();

router.post('/signin', login)
router.post('/signup', createUser);
router.get('/', auth, getUsers);
router.get('/me', auth, getUserInfo)
router.get('/:userId', auth, getUser);
router.patch('/me', auth, updateUser)
router.patch('/me/avatar', auth, updateAvatar)

export default router;

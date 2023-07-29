import express from "express"
import {login, createUser, getUser, getUsers, updateAvatar, updateUser, getUserInfo} from "../controllers/users.js";
import {auth} from "../middlewares/auth.js";
import {validateLogin, validateUserData, validateId, validateUserUrl} from "../utils/validationHelper.js";

const router = express.Router();

router.post('/signin', validateLogin, login)
router.post('/signup', validateUserData, createUser);
router.get('/', auth, getUsers);
router.get('/me', auth, getUserInfo)
router.get('/:userId', validateId, auth, getUser);
router.patch('/me', validateUserData, auth, updateUser)
router.patch('/me/avatar', validateUserUrl, auth, updateAvatar)

export default router;

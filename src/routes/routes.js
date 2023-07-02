import router from "express"
import {createUser, getUser, getUsers} from "../controllers/users.js";

router.post('/', createUser);
router.get('/', getUsers);
router.get('/userId', getUser);

export default router;

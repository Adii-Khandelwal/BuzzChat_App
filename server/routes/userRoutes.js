// ES6 module syntax
import { Router } from 'express';
import { login, register,setAvatar } from '../controllers/userController.js';

const router = Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar);

export default router;





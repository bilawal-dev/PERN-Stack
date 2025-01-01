import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import { validateSignUp } from '../middleware/validateSignUp.js';
import { validateSignIn } from '../middleware/validateSignIn.js';

const router = Router();

router.post('/sign-up', validateSignUp, signUp);

router.post('/sign-in', validateSignIn, signIn);

export default router;
import express from 'express';
import { changepassword, getAuthenticatedUser, login, logout, signup } from '../controllers/user.controllers';
import { requiresAuth } from '../middleware/auth';

const router = express.Router();

router.get('/',requiresAuth,getAuthenticatedUser);
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.post('/change',changepassword);

export default router;
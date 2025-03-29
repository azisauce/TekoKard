import express from 'express';
import { AuthController } from '../controllers/authController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Auth routes
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);

// Protected route example
router.get('/protected', AuthMiddleware.verifyToken, AuthController.protected);

export default router;

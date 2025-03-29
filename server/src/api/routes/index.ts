const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
// const authRoutes = require('./auth.routes');
const teamRoutes = require('./team.routes');

import authRoutes from './authRoutes';

// Auth routes
router.use('/auth', authRoutes);

// User routes
router.use('/users', userRoutes);

// Teams routes
router.use('/teams', teamRoutes);

export default router;

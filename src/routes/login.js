import express from 'express';
import LoginController from '../controllers/login.js'
import AuthService from '../services/auth.js'
import User from '../models/users.js'
import bcrypt from 'bcrypt'
const router = express.Router();
const loginController = new LoginController(User, AuthService)
router.post('/', (req, res) => {
    loginController.login(req, res)
});
//router.get('/', (req, res) => loginController.logout(req, res));

export default router;
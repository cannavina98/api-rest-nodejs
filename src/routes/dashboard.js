import express from "express";
import LoginController from "../controllers/login.js";
import AuthService from '../services/auth.js'
import User from '../models/users.js'

const router = express.Router();
const loginController = new LoginController(User,AuthService);

router.get('/', (req, res) => {
    loginController.verifySession(req, res);
});

export default router
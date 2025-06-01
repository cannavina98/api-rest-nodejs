import express from 'express';
import User from '../models/users.js';
import UsersController from '../controllers/users.js';
import AuthService from '../services/auth.js';

const router = express.Router();
const usersController = new UsersController(User, AuthService);
router.get('/', (req, res) => usersController.get(req, res));
router.get('/:id', (req, res) => usersController.getById(req, res));
router.post('/', (req, res) => usersController.post(req, res));
router.put('/:id', (req, res) => usersController.put(req, res));
router.delete('/:id', (req, res) => usersController.delete(req, res));
router.post('/authenticate', (req, res) =>
    usersController.authenticate(req, res)
);

export default router;
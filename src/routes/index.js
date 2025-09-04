import express from 'express';
import projetosRouter from './projetos.js';
import usersRouter from './users.js';
import bcrypt from 'bcrypt';
import path from 'path';
const router = express.Router();
router.use('/projetos', projetosRouter);
router.use('/users', usersRouter);
router.get('/', (req, res) => {
    const filename = path.join(__dirname, '..', 'views', 'login')
    res.sendFile(filename);
});

export default router;
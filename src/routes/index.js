import express from 'express';
import projetosRouter from './projetos.js';
import usersRouter from './users.js';

const router = express.Router();
router.use('/projetos', projetosRouter);
router.use('/users', usersRouter);
router.get('/', (req, res) => {
    res.send("Hello World!")
});

export default router;
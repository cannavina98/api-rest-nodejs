import express from 'express';
import Projeto from '../models/projeto.js';
import ProjetoController from '../controllers/projetos.js';

const router = express.Router();
const projetoController = new ProjetoController(Projeto);
router.get('/', (req,res) => projetoController.get(req, res));
router.get('/:id', (req, res) => projetoController.getById(req, res));
router.post('/', (req,res) => projetoController.post(req, res));
router.put('/:id', (req, res) => projetoController.put(req, res));
router.delete('/:id', (req, res) => projetoController.delete(req, res));

export default router;
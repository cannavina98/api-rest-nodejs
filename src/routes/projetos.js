import express from 'express';
import Projeto from '../models/projeto.js';
import ProjetoController from '../controllers/projetos.js';

const router = express.Router();
const projetoController = new ProjetoController(Projeto);
//https://www.youtube.com/watch?v=BOahFNoIrPk&t=1711s
/**
 * @swagger
 * tags:
 *   name: Projetos
 *   description: Api endpointes to manage Projetos
 */

/**
 * @swagger
 *   /projetos:
 *     get:
 *       summary: Get all Projetos
 *       tags: [Projetos]
 *       responses:
 *         "200":
 *           description: List of all Projetos
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Projetos'
 *         "400":
 *           $ref: '#/components/responses/400'  
 *         "401":
 *           $ref: '#/components/responses/401'  
 *         "404":
 *           $ref: '#/components/responses/404' 
 */
router.get('/', (req,res) => projetoController.get(req, res));

/**
 * @swagger
 *   /projetos/{id}:
 *     get:
 *       summary: Get a specific Projeto
 *       tags: [Projetos]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: project id
 *       responses:
 *         "200":
 *           description: List of all Projetos
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Projetos'
 *         "400":
 *           $ref: '#/components/responses/400'  
 *         "401":
 *           $ref: '#/components/responses/401'  
 *         "404":
 *           $ref: '#/components/responses/404' 
 */
router.get('/:id', (req, res) => projetoController.getById(req, res));

/**
 * @swagger
 *   /projetos/{id}:
 *     post:
 *       summary: Crie um projeto
 *       tags: [Projetos]
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Projetos'
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'  
 *         "401":
 *           $ref: '#/components/responses/401'  
 *         "201":
 *           description: Projeto criado com sucesso
 *           contents:
 *             application/json 
 */
router.post('/', (req,res) => projetoController.post(req, res));

/**
 * @swagger
 *   /projetos/{id}:
 *     put:
 *       summary: Update a Projeto
 *       tags: [Projetos]
 *       parameters:
 *           - in: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: Projeto ID
 *       requestBody:    
 *             required: true
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Projetos'
 *                   required:
 *       responses:
 *         "204":
 *           description: Projeto atualizado com sucesso
 *           contents:
 *             application/json 
 *         "400":
 *           $ref: '#/components/responses/400'  
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "404":
 *           $ref: '#/components/responses/401'  
 */
router.put('/:id', (req, res) => projetoController.put(req, res));

/**
 * @swagger
 *   /projetos/{id}:
 *     delete:
 *       summary: Delete a Projeto
 *       tags: [Projetos]
 *       parameters:
 *           - in: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: Projeto ID
 *       responses:
 *         "204":
 *           description: Projeto deletado com sucesso
 *           contents:
 *             application/json 
 *         "400":
 *           $ref: '#/components/responses/400'  
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "404":
 *           $ref: '#/components/responses/401'  
 */
router.delete('/:id', (req, res) => projetoController.delete(req, res));

export default router;
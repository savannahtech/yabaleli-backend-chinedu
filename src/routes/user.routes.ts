
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: Password
 *         name:
 *           type: string
 *       example:
 *         email: john.doe@test.com
 *         password: Alexander K. Dewdney
 *         name: John Doe
 * 
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: Password
 *       example:
 *         email: john.doe@test.com
 *         password: Alexander K. Dewdney
 */

import { Router } from 'express';
import { use } from '../shared/utils/errors';
import { login, registerUser } from '../modules/users/user.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Account Management
 * /api/v1/account/register:
 *   post:
 *     summary: Register User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUser'
 *       500:
 *         description: Some server error
 *
 */
router.post('/register', use(registerUser));

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Account Management
 * /api/v1/account/login:
 *   post:
 *     summary: Login User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUser'
 *       403:
 *         description: Unauthorized
 *
 */
router.post('/login', use(login));

export default router;

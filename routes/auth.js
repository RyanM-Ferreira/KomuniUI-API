/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Operações relacionadas ao login
 */

import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';
import request from 'supertest';

const SECRET = 'hackateen_key';

export const authRoute = express.Router();

export async function setTokenForTest(user, appInstance) {
    const loginResponse = await request(appInstance)
        .post('/login')
        .send({
            email: user.email,
            password: user.password,
        });

    const token = loginResponse.body.token;
    console.log('Token gerado:', token);

    return token;
}

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     description: Autentica um usuário e retorna um token JWT para acesso aos endpoints protegidos.
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: password@123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna o token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT de autenticação.
 *       401:
 *         description: Credenciais inválidas.
 */
authRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
        return res.status(401).send({ erro: { mensagem: 'Credenciais inválidas' } });
    }
    const token = jwt.sign({ userId: user.userId, email: user.email }, SECRET, { expiresIn: '1h' });
    console.log('Token gerado no login:', token);
    res.send({ email: user.email, userId: user.userId, token });
});
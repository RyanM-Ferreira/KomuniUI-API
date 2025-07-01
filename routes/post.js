/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Operações relacionadas aos posts
 */

import { authMiddleware } from '../middleware/authMiddleware.js';

import express from 'express';
import { createPost, readPosts, readPostsPerId, updatePostPerId, deletePostPerId } from '../models/posts.js';

export const postsRoute = express.Router();

import multer from 'multer';
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo não permitido. Apenas imagens são aceitas!'), false);
        }
    },

});


/** 
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     description: Cria um novo post do tipo 'event', 'request' ou 'alert'.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - content
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Título do post"
 *               type:
 *                 type: string
 *                 enum: [event, request, alert]
 *                 example: "event"
 *               content:
 *                 type: string
 *                 example: "Conteúdo do post"
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *       500:
 *         description: Erro interno ao criar post
 */
postsRoute.post('/posts', authMiddleware, upload.single('file'), async (req, res) => {
    const posts = req.body;
    const imageData = req.file.buffer;
    console.log('req.file', req.file);
    console.log('req.body', req.file.buffer);
    console.log('imagedata', imageData);

    if (imageData) {
        posts.file = imageData;
        posts.mimeType = imageData.mimetype;
        posts.fileName = imageData.originalname;
    }

    res.statusCode = 400;
    try {
        if (!posts.title && !posts.type && !posts.content && !posts.userId) {
            const response = {
                erro: {
                    mensagem: `Todos os campos obrigatorios devem ser preenchidos `,
                },
            };
            return res.send(response);
        }

        if (!posts?.title) {
            const response = {
                erro: {
                    mensagem: `O atributo 'título' não foi encontrado, porém é obrigatório`,
                },
            };

            return res.send(response);
        }

        if (!posts?.type) {
            const response = {
                erro: {
                    mensagem: `O atributo 'tipo' não foi encontrado ou não foi escrito corretamente, porém é obrigatório, a forma correta é 'event', 'request' ou 'alert'`,
                },
            };

            return res.send(response);
        }

        if (!posts?.content) {
            const response = {
                erro: {
                    mensagem: `O atributo 'conteúdo' não foi encontrado, porém é obrigatório`,
                },
            };

            return res.send(response);
        }

        if (!posts?.userId) {
            const response = {
                erro: {
                    mensagem: `O atributo 'userId' não foi encontrado, porém é obrigatório`,
                },
            };

            return res.send(response);
        }


        const response = await createPost(posts);
        res.statusCode = 201;

        return res.send(response);

    } catch (error) {
        if (error) {
            console.error('Erro ao criar o posts:', error);

            res.statusCode = 500;
            const response = {
                erro: {
                    mensagem: `Erro ao criar o posts ${posts.title}`
                }
            };
            return res.send(response);

        }
    }
});


/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     summary: Atualiza um post existente
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [event, request, alert]
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       400:
 *         description: Nenhum atributo fornecido para atualização
 *       500:
 *         description: Erro ao atualizar post
 */
postsRoute.patch('/posts/:id', authMiddleware, async (req, res) => {

    const posts = req.body;

    res.statusCode = 400;


    if (!posts?.title && !posts.type && !posts.content) {
        const response = {
            erro: {
                mensagem: `Nenhum atributo foi encontrado, porém ao menos um é obrigatório para atualização`,
            },
        };

        return res.send(response);

    }

    const id = req.params.id;
    try {
        const response = await updatePostPerId(id, posts);
        res.statusCode = 200;

        return res.send(response);


    } catch (error) {
        console.error('Erro ao Atualizar o post:', error);

        res.statusCode = 404;
        const response = {
            erro: {
                mensagem: `Erro ao atualizar o post ${id}`
            }
        };
        return res.send(response);

    };
});


/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Remove um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       202:
 *         description: Post removido com sucesso
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro ao remover post
 */
postsRoute.delete('/posts/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;

    try {
        await deletePostPerId(id);

        res.statusCode = 202;
        const response = {
            erro: {
                mensagem: `Post ${id} removido com sucesso!`,
            }
        };

        return res.send(response);

    } catch (error) {

        res.statusCode = 500;
        const response = {
            erro: {
                mensagem: `Erro ao remover o post ${id}, ${error}`
            }
        };
        return res.send(response);

    }
});


/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Busca um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 type:
 *                   type: string
 *                 content:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro ao buscar post
 */
postsRoute.get('/posts/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await readPostsPerId(id);

        res.statusCode = 200;

        if (!response) {
            res.statusCode = 404;
        }

        return res.send(response);
    } catch (error) {
        res.statusCode = 404;
        const response = {
            erro: {
                mensagem: `Erro ao buscar o post ${id}, ${error}`
            }
        };
        return res.send(response);

    }
});


/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todos os posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   postId:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   type:
 *                     type: string
 *                   content:
 *                     type: string
 *                   userId:
 *                     type: integer
 *       500:
 *         description: Erro ao buscar posts
 */
postsRoute.get('/posts', async (req, res) => {
    try {
        const response = await readPosts();
        res.statusCode = 200;

        return res.send(response);

    } catch (error) {
        console.error('Erro ao buscar os posts:', error);

        res.statusCode = 404;
        const response = {
            erro: {
                mensagem: `Erro ao buscar os posts`
            }
        };
        return res.send(response);
    }
});
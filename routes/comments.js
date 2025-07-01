/**
 * @swagger
 * tags:
 *   - name: Comentários
 *     description: Operações relacionadas aos comentários
 */

import express from 'express';
import { createComment, readComments, readCommentsPerId, updateCommentsPerId, deleteCommentsPerId, readCommentsByPostId } from './../models/comments.js';

export const commentsRoute = express.Router();

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Cria um novo comentário
 *     tags: [Comentários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - date
 *               - postId
 *               - userId
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Comentário de exemplo"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-05T12:00:00Z"
 *               postId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *       500:
 *         description: Erro interno ao criar comentário
 */
commentsRoute.post('/comments', async (req, res) => {
    const comment = req.body;

    res.statusCode = 400;
    try {
        if (!comment.content && !comment.date && !user.id && !post.id) {
            const response = {
                erro: {
                    mensagem: `Todos os campos obrigatorios devem ser preenchidos `,
                },
            };
            return res.send(response);
        }
        if (!comment?.content) {
            const response = {
                erro: {
                    mensagem: `O atributo 'conteúdo' não foi encontrado, porém é obrigatório`,
                },
            };

            return res.send(response);
        }

        if (!comment?.date) {
            const response = {
                erro: {
                    mensagem: `O atributo 'data' não foi encontrado, porém é obrigatório`,
                },
            };

            return res.send(response);
        }

        if (!comment?.postId) {
            const response = {
                erro: {
                    mensagem: `O atributo 'postId' não foi encontrado, porém é obrigatório`,
                },
            };

            return res.send(response);
        }

        if (!comment?.userId) {
            const response = {
                erro: {
                    mensagem: `O atributo 'userId' não foi encontrado, porém é obrigatório`,
                },
            };

            return res.send(response);
        }


        const response = await createComment(comment);
        res.statusCode = 201;

        return res.send(response);

    } catch (error) {
        if (error) {
            console.error('Erro ao criar o comentário:', error);

            res.statusCode = 400;
            const response = {
                erro: {
                    mensagem: `Erro ao criar o comentário ${comment.commentId}`
                }
            };
            return res.send(response);
        }
    }
});


/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     summary: Atualiza um comentário existente
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *       400:
 *         description: Nenhum atributo fornecido para atualização
 *       500:
 *         description: Erro ao atualizar comentário
 */
commentsRoute.patch('/comments/:id', async (req, res) => {

    const comment = req.body;

    res.statusCode = 400;


    if (!comment?.content && !comment.date) {
        const response = {
            erro: {
                mensagem: `Nenhum atributo foi encontrado, porem ao menos um é obrigatório para atualização`,
            },
        };

        return res.send(response);
    }

    const id = req.params.id;
    try {
        const response = await updateCommentsPerId(id, comment);
        res.statusCode = 200;

        return res.send(response);

    } catch (error) {
        console.error('Erro ao Atualizar o comentário:', error);

        res.statusCode = 500;
        const response = {
            erro: {
                mensagem: `Erro ao atualizar o comentário ${id}`
            }
        };
        return res.send(response);
    };
});


/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Remove um comentário
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário
 *     responses:
 *       202:
 *         description: Comentário removido com sucesso
 *       500:
 *         description: Erro ao remover comentário
 */
commentsRoute.delete('/comments/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await deleteCommentsPerId(id);

        res.statusCode = 202;

        const response = {
            response: {
                mensagem: `Comentário ${id} removido com sucesso!`,
            }
        };
        return res.send(response);

    } catch (error) {

        res.statusCode = 500;
        const response = {
            erro: {
                mensagem: `Erro ao remover o Comentário ${id}, ${error}`
            }
        };
        return res.send(response);

    }
});


/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Busca um comentário pelo ID
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário
 *     responses:
 *       200:
 *         description: Comentário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 commentId:
 *                   type: integer
 *                 content:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 postId:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *       404:
 *         description: Comentário não encontrado
 */
commentsRoute.get('/comments/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await readCommentsPerId(id);

        res.statusCode = 200;

        return res.send(response);
    } catch (error) {
        res.statusCode = 404;
        const response = {
            erro: {
                mensagem: `Erro ao buscar o comentário ${id}, ${error}`
            }
        };
        return res.send(response);
    }
});


/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Lista todos os comentários
 *     tags: [Comentários]
 *     responses:
 *       200:
 *         description: Lista de comentários cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   commentId:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   postId:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *       404:
 *         description: Nenhum comentário encontrado
 */
commentsRoute.get('/comments', async (req, res) => {
    try {
        const response = await readComments();
        res.statusCode = 200;

        return res.send(response);
    } catch (error) {

        res.statusCode = 404;
        const response = {
            erro: {
                mensagem: `Erro ao buscar os comentários`
            }
        };
        return res.send(response);
    }
});

// Rota para filtrar por post, ainda falta fazer o swagger 
commentsRoute.get('/comments/post/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const response = await readCommentsByPostId(postId);
        res.status(200).send(response);
    } catch (error) {
        console.error('Erro ao buscar comentários do post:', error);
        res.status(500).send({
            erro: {
                mensagem: 'Erro interno ao buscar os comentários.'
            }
        });
    }
});

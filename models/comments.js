import { sequelize } from './database.js';
import Sequelize from 'sequelize';

import { User } from './users.js';
import { Posts } from './posts.js';

export const Comments = sequelize.define('comments', {
    commentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo "content" não pode ser vazio!'
            }
        }
    },
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        validate: {
            isDate: {
                msg: 'Data inválida!'
            }
        },
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'userId'
        },
        onDelete: 'CASCADE'
    },
    postId: {
        type: Sequelize.INTEGER,
        references: {
            model: Posts,
            key: 'postId'
        },
        onDelete: 'CASCADE'
    }
});

export async function createComment(comment) {
    try {
        const result = await Comments.create(comment);
        console.log(`Comentário ${result.commentId} foi criado com sucesso!`);
        return result;
    } catch (error) {
        console.error('Erro ao criar o Comentário:', error);
        throw error;
    }
};

export async function readComments() {
    try {
        const result = await Comments.findAll();
        if (result.length === 0) {
            throw "Nenhum comentário encontrado!";
        }
        console.log(`Comentários consultados com sucesso!`, result);
        return result;
    } catch (error) {
        console.error('Erro ao buscar os comentários:', error);
        throw error;
    }
};

export async function readCommentsPerId(id) {
    try {
        const result = await Comments.findByPk(id);
        if (result === null) {
            throw "Comentário não encontrado!";
        }
        console.log(`Comentário consultado com sucesso!`, result);
        return result;
    } catch (error) {
        console.error('Erro ao buscar o Comentário:', error);
        throw error;
    }
};

export async function updateCommentsPerId(id, dataComments) {
    try {
        const result = await Comments.findByPk(id);
        console.log(result);
        if (result === null) {
            throw "Comentário não encontrado!";
        }
        if (result) {
            for (const key in dataComments) {
                if (Object.hasOwn(result.dataValues, key)) {
                    result[key] = dataComments[key];
                }
            }
            await result.save();
            console.log(`Comentário atualizado com sucesso!`, result);
        }

        return result;
    } catch (error) {
        console.error('Erro ao atualizar o Comentário:', error);
        throw error;
    }
};

export async function deleteCommentsPerId(id) {
    try {
        const result = await Comments.destroy({ where: { commentId: id } });
        if (result === 0) {
            throw "Comentário não encontrado!";
        }
        console.log(`Comentário deletado com sucesso!`, result);
        return result;
    } catch (error) {
        console.error('Erro ao deletar o Comentário:', error);
        throw error;
    }
};

export async function readCommentsByPostId(postId) {
    try {
        const result = await Comments.findAll({
            where: { postId: postId }
        });
        if (result.length === 0) {
            throw "Nenhum comentário encontrado para esse post!";
        }
        console.log(`Comentários do post ${postId} consultados com sucesso!`, result);
        return result;
    } catch (error) {
        console.error('Erro ao buscar os comentários por postId:', error);
        throw error;
    }
}

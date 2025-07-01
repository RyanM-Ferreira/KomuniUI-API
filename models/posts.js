import { sequelize } from './database.js';
import Sequelize from 'sequelize';

import { User } from './users.js';

export const Posts = sequelize.define('posts', {
    postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('event', 'request', 'alert'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['event', 'request', 'alert']],
                msg: 'O campo "type" deve ser um dos seguintes valores: event, request, alert.'
            }
        }
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
    },
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        validate: {
            isDate: {
                msg: 'Data inválida!'
            }
        }
    },
    place: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'userId'
        },
        allowNull: false,
        onDelete: 'CASCADE'

    }
});

export async function createPost(post) {
    try {
        const result = await Posts.create(post);
        console.log(`Post ${result.title} foi criado com sucesso!`);
        return result;
    } catch (error) {
        console.error('Erro ao criar o Post:', error);
        throw error;
    }
};

export async function readPosts() {
    try {
        const result = await Posts.findAll();
        if (result.length === 0) {
            throw "Nenhum Post encontrado!";
        }
        console.log(`Posts consultados com sucesso!`, result);
        return result;
    } catch (error) {
        console.error('Erro ao buscar os Posts:', error);
        throw error;
    }
};

export async function readPostsPerId(id) {
    try {
        const result = await Posts.findByPk(id);
        if (result === null) {
            throw "Post não encontrado!";
        }
        console.log(`Post consultado com sucesso!`, result);
        return result;
    } catch (error) {
        console.error('Erro ao buscar o Post', error);
        throw error;
    }
};

export async function updatePostPerId(id, dataPost) {
    try {
        const result = await Posts.findByPk(id);
        if (result === null) {
            throw "Post não encontrado!";
        }
        if (result) {
            for (const key in dataPost) {
                if (Object.hasOwn(result.dataValues, key)) {
                    result[key] = dataPost[key];
                }
            }
            await result.save();
            console.log(`Post atualizado com sucesso!`, result);
        } else {
            console.log(`Post não encontrado!`);
        }

        return result;
    } catch (error) {
        console.error('Erro ao atualizar o Post:', error);
        throw error;
    }
};

export async function deletePostPerId(id) {
    try {
        const result = await Posts.destroy({ where: { postId: id } });
        if (result === 0) {
            throw "Post não encontrado!";
        }
        return result;
    } catch (error) {
        console.error('Erro ao deletar o Post:', error);
        throw error;
    }
};

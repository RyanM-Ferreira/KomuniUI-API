const PORT = 3000;

import sqlite3 from 'sqlite3';
import express from 'express';
import bodyParser from 'body-parser';

import { commentsRoute } from './routes/comments.js';
import { usersRoute } from './routes/users.js';
import { postsRoute } from './routes/post.js';
import { authRoute } from './routes/auth.js';

import { sequelize } from './models/database.js';

export const app = express();

app.use(bodyParser.json());

app.use(commentsRoute);
app.use(usersRoute);
app.use(postsRoute);
app.use(authRoute);

// ...existing code...
import { swaggerSpec, swaggerUi } from './swagger.js';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ...existing code...

export async function App() {
    // const db = new sqlite3.Database('./database/database.sqlite', (erro) => {
    //     if (erro) {
    //         console.error('Erro ao inicializar o banco de dados:', erro);
    //         return;
    //     }
    //     console.log('Banco de dados conectado com sucesso!');
    // });

    await sequelize.sync();

    const server = app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);

        console.log(`Documentação visual e interativa das rotas e requisições disponível em http://localhost:3000/api-docs`);
    });
    return server;
}

App();
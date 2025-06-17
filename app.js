import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './models/database.js';

import { usersRoute } from './routes/users.js';
import { commentsRoute } from './routes/comments.js';
import { postsRoute } from './routes/post.js';
import { authRoute } from './routes/auth.js';

import { swaggerSpec, swaggerUi } from './swagger.js';

export const app = express();

const PORT = 3000;

/* Vou começar a usar EJS como template engine, aparentemente é um dos mais utilizados.
Tem uma boa documentação por aí. */
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Para ler dados de forms

app.use(usersRoute);
app.use(commentsRoute);
app.use(postsRoute);
app.use(authRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/signup', (req, res) => { res.render('signup'); });
app.get('/login', (req, res) => { res.render('login'); });

export async function App() {
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Acesse http://localhost:3000/signup`);
    });
}

App();
import request from 'supertest';
import { App, app } from '../app.js';
import { sequelize } from '../models/database.js';
import { setTokenForTest } from '../routes/auth.js';

let server;

beforeAll(async () => {
    server = await App();
});

afterAll(async () => {
    await sequelize.close();
});

beforeEach(async () => {
    await sequelize.truncate({ cascade: true });
});

describe('Testes para o endpoint /posts', () => {

    it('Deve criar um novo post com sucesso', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);
    

        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);
    });

    it('Deve retornar erro ao tentar criar um novo post sem nenhum atributo', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);

        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um novo post sem conteudo', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);

        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um novo post sem tipo', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);

        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um novo post sem o id do user', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);
      
        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post'
            });

        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar criar um novo post sem o titulo', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);

        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(400);
        expect(postResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar um post especificio por meio de id', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);

        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const postId = await request(app)
            .get(`/posts/${postResponse.body.postId}`)
            .send();

        expect(postId.statusCode).toBe(200);
        expect(postId.body.postId).toEqual(postResponse.body.postId);
    });

    it('Deve retornar um erro ao tentar obter um post especificio por meio de id, porém o post não existe', async () => {
        const postResponse = await request(app)
            .get('/posts/30')
            .send();

        expect(postResponse.statusCode).toBe(404);
        expect(postResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar todos os posts', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);

        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const posts = await request(app)
            .get(`/posts`)
            .send();

        expect(posts.statusCode).toBe(200);
        expect(posts.body).toBeInstanceOf(Array);
        expect(posts.body.length).toBeGreaterThan(0);
    });

    it('Deve retornar erro ao tentar buscar os posts, porém não existe nenhum post', async () => {
        const postResponse = await request(app)
            .get('/posts')
            .send();

        expect(postResponse.statusCode).toBe(404);
        expect(postResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve atualizar o post com sucesso', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);


        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);
        
        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const postpatch = await request(app)
            .patch(`/posts/` + postResponse.body.postId)
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é o post atualizado',
                date: '2023-10-02',
                userId: userResponse.body.userId
            });

        expect(postpatch.statusCode).toBe(200);
        expect(postpatch.body.content).toBe('Este é o post atualizado');
        expect(postpatch.body.date).toBe('2023-10-02');
        expect(postpatch.body.userId).toEqual(postResponse.body.userId);
    });

    it('Deve retornar erro ao tentar atualizar um post, porém o não é enviado nenhum atributo', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);
        
        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const postpatch = await request(app)
            .patch(`/posts/` + postResponse.body.postId)
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(postpatch.statusCode).toBe(400);
        expect(postpatch.body.erro).toHaveProperty('mensagem');
    });

    it('Deve retornar erro ao tentar atualizar um post, porém o post não existe', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);
        
        const postResponse = await request(app)
            .patch('/posts/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Este é o post atualizado',
                date: '2023-10-02'
            });

        expect(postResponse.statusCode).toBe(404);
        expect(postResponse.body.erro).toHaveProperty('mensagem');
    });

    it('Deve deletar o post com sucesso', async () => {
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);

        const postResponse = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Título do post',
                type: 'event',
                content: 'Conteúdo do post',
                userId: userResponse.body.userId
            });

        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toHaveProperty('postId');
        expect(postResponse.body.userId).toEqual(userResponse.body.userId);

        const postdelete = await request(app)
            .delete(`/posts/` + postResponse.body.postId)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(postdelete.statusCode).toBe(202);
        expect(postdelete.body.erro).toHaveProperty('mensagem');
        expect(postdelete.body.erro.mensagem).toBe(`Post ${postResponse.body.postId} removido com sucesso!`);
    });

    it('Deve retornar erro ao tentar deletar um post, porém o post não existe', async () => {
        
        
        const user = {
            name: 'João',
            email: 'João@exemplo.com',
            password: '123456'
        }

        const userResponse = await request(app)
            .post('/users')
            .send(user);

        expect(userResponse.statusCode).toBe(201);
        expect(userResponse.body).toHaveProperty('userId');
        expect(userResponse.body.name).toBe('João');

        const token = await setTokenForTest(user, app);

        const postResponse = await request(app)
            .delete('/posts/1')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(postResponse.statusCode).toBe(500);
        expect(postResponse.body.erro).toHaveProperty('mensagem');
    });
});
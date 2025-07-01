import express from 'express';
import { searchPlaces } from '../GoogleApi/Places.js';

export const placesRoute = express.Router();

placesRoute.get('/places', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ erro: { mensagem: 'Parâmetro "query" é obrigatório.' } });
    }
    try {
        const results = await searchPlaces(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ erro: { mensagem: 'Erro ao buscar lugares', detalhes: err.message } });
    }
});
const conn = require('../database/connection');

const crypto = require('crypto');

module.exports = {
    async readAll(request, response) {
        const ngos = await conn('ngo').select('*');

        return response.json(ngos);
    },

    async create(request, response) {
        const { city, email, fu, name, whatsapp } = request.body;
    
        const id = crypto.randomBytes(8).toString('HEX');
    
        await conn('ngo').insert({ id, name, email, whatsapp, city, uf });

        return response.json({ id });
    }
};
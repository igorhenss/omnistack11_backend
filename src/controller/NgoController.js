const conn = require('../database/connection');

const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async readAll(request, response) {
        const ngos = await conn('ngo').select('*');

        return response.json(ngos);
    },

    async create(request, response) {
        const { city, email, fu, name, whatsapp } = request.body;
    
        const id = generateUniqueId();
    
        await conn('ngo').insert({ id, name, email, whatsapp, city, fu });

        return response.json({ id });
    }
};
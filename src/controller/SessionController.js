const conn = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ngo = await conn('ngo').where('id', id)
            .select('name').first();

        if (!ngo) {
            return response.status(400).json({ error: 'ID not found.'})
        }

        return response.json(ngo);
    }
};
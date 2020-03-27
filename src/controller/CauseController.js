const conn = require('../database/connection');

module.exports = {
    async readAll(request, response) {
        const { page = 1 } = request.query;

        const [count] = await conn('cause').count();

        const causes = await conn('cause').join('ngo', 'ngo.id', '=', 'cause.ngo_id')
            .limit(5).offset(( page - 1 ) * 5)
            .select([
                'cause.*',
                'ngo.name',
                'ngo.email',
                'ngo.whatsapp',
                'ngo.city',
                'ngo.fu'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(causes);
    },

    async create(request, response) {
        const { title, description, value } = request.body;

        const ngo_id = request.headers.authorization;

        const [id] = await conn('cause').insert({ title, description, value, ngo_id });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        const ngo_id = request.headers.authorization;

        const cause = await conn('cause').where('id', id)
            .select('ngo_id').first();

        if (cause.ngo_id != ngo_id) {
            return response.status(401).json({ error: 'Unauthorized.'});
        }

        await conn('cause').where('id', id)
            .delete();
        
        return response.status(204).send();
    }
};
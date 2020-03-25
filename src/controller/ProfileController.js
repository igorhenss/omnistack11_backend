const conn = require('../database/connection');

module.exports = {
    async readAll(request, response) {
        const ngo_id = request.headers.authorization;

        const causes = await conn('cause').where('ngo_id', ngo_id)
            .select('*');

        return response.json(causes);
    }
};
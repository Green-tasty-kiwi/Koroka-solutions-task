const axios = require('axios');
const config = require('../config');
const url = require('url');

module.exports = class UsersGateway {
    async findAll({ page = 1 } = {}) {
        let params = new url.URLSearchParams({ page });

        const response = await axios({
            withCredentials: true,
            url: `${config.reqresApiUrl}/users?${params.toString()}`,
            method: 'GET',
        });

        return response.data;
    }
}

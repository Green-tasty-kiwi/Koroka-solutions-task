const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
// const csv = require('csv-parser');
// const constructCsvLine = require('../helpers/constructCsvLine')

module.exports = function ({ usersGateway }) {
    router
        .get('/api/users', async (request, response, next) => {
            const usersData = await usersGateway.findAll({ page: request.query.page });
            const users = usersData.data
            response.send(users)
        })
        .get('/api/users.csv', async (request, response, next) => {

            const usersData = await usersGateway.findAll();
            const pages = usersData.total_pages;
            const users = [];

            for (i = 1; i <= pages; i++) {
                const data = await usersGateway.findAll({ page: i });
                users.push(...data.data)
            }

            const header = ["First-name, Last-name, Email, Avatar"];
            const rows = users.map(user =>
                `${user.first_name}, ${user.last_name}, ${user.email}, ${user.avatar}`
            );
            const csvString = header.concat(rows).join("\n");

            response.attachment('users.csv');
            response.status(200)
            response.send(csvString)

        })
    return router;
}


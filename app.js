const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const hbs = require('express-handlebars');
const path = require('path');
const api = require('./api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const UsersGateway = require('./gateways/UsersGateway');
const usersGateway = new UsersGateway;

const handlebars = hbs.create({
    layoutsDir: path.join(__dirname, '/views/layouts'),
    defaultLayout: 'layout',
    extname: '.hbs',
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.use(api({ usersGateway }));

app.get('/', async (req, res) => {
    const users = await usersGateway.findAll();

    res.render('main-page', { users: users.data });
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
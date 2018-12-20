const app = require('express')();
const bodyParser = require('body-parser');

const errorHandle = require('../app/exceptions/hadle.error'); 
const routes = require('../app/router/index');

//PLUGINS
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//ROUTES
app.use(routes);

//EXCEPTIONS
app.use(errorHandle);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

module.exports = app;



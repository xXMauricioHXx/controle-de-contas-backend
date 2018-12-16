const app = require('express')();
const bodyParser = require('body-parser');

const errorHandle = require('../app/exceptions/hadle.error'); 
const contasRouter = require('../app/router/contas.router');
const usuarioRouter = require('../app/router/usuario.router');
const cartaoRouter = require('../app/router/cartao.router');


//PLUGINS
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//ROUTES
app.use(contasRouter);
app.use(usuarioRouter);
app.use(cartaoRouter);

//EXCEPTIONS
app.use(errorHandle);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

module.exports = app;



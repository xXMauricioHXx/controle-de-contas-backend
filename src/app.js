const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandle = require('./exceptions/hadleError'); 
const routes = require('./routes');

//PLUGINS
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//ROUTES
app.use(routes);

//EXCEPTIONS
app.use(errorHandle);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

module.exports = app;



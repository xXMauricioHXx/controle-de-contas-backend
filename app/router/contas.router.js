const app = require('express').Router();

const Authentication = require('../middlewares/authentication.middleware');
const ContasController = require('../controllers/contas.controller');

const auth = new Authentication();
const contasController = new ContasController();

app.post('/v1/contas',  contasController.insert)
app.get('/v1/contas',  contasController.find)
app.get('/v1/contas/:id',  contasController.findById)
app.put('/v1/contas/:id',  contasController.update)
app.delete('/v1/contas/:id',  contasController.remove)

module.exports = app;
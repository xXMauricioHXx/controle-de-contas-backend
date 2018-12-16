const app = require('express').Router();

const Authentication = require('../middlewares/authentication.middleware');
const CartaoController = require('../controllers/cartao.controller');

const auth = new Authentication();
const cataoController = new CartaoController();

app.post('/v1/cartao', auth.verify, cataoController.insert)
app.get('/v1/cartao', auth.verify, cataoController.find)
app.get('/v1/cartao/:id', auth.verify, cataoController.findById)
app.put('/v1/cartao/:id', auth.verify, cataoController.update)
app.delete('/v1/cartao/:id', auth.verify, cataoController.remove)

module.exports = app;
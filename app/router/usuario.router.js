const app = require('express').Router();

const Authentication = require('../middlewares/authentication.middleware');
const UsuarioController = require('../controllers/usuario.controller');

const auth = new Authentication();
const usuarioController = new UsuarioController();

app.post('/v1/auth', usuarioController.auth)
app.post('/v1/usuarios', auth.verify, usuarioController.insert)
app.get('/v1/usuarios', auth.verify, usuarioController.find)
app.get('/v1/usuarios/:id', auth.verify, usuarioController.findById)
app.put('/v1/usuarios/:id', auth.verify, usuarioController.update)
app.delete('/v1/usuarios/:id', auth.verify, usuarioController.remove)

module.exports = app;
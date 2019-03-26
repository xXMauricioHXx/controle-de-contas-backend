const router = require('express').Router();

const contasRouter = require('./conta/contas.route');
const usuarioRouter = require('./usuario/usuario.route');
const cartaoRouter = require('./cartao/cartao.route');

router.use('/v1', contasRouter)
router.use('/v1', usuarioRouter)
router.use('/v1', cartaoRouter)

module.exports = router; 
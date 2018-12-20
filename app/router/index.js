const router = require('express').Router();

const contasRouter = require('./contas.router');
const usuarioRouter = require('./usuario.router');
const cartaoRouter = require('./cartao.router');

router.use('/v1', contasRouter)
router.use('/v1', usuarioRouter)
router.use('/v1', cartaoRouter)

module.exports = router; 
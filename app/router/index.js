const router = require('express').Router();

const contasRouter = require('./contas');
const usuarioRouter = require('./usuario');
const cartaoRouter = require('./cartao');

router.use('/v1', contasRouter)
router.use('/v1', usuarioRouter)
router.use('/v1', cartaoRouter)

module.exports = router; 
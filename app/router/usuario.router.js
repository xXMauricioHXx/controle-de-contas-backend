const router = require('express').Router();

const authVerify = require('../middlewares/authentication.middleware');
const usuarioController = require('../controllers/usuario.controller');

router.post('/auth', usuarioController.auth)
router.post('/usuarios', authVerify, usuarioController.insert)
router.get('/usuarios', authVerify, usuarioController.find)
router.get('/usuarios/:id', authVerify, usuarioController.findById)
router.put('/usuarios/:id', authVerify, usuarioController.update)
router.delete('/usuarios/:id', authVerify, usuarioController.remove)

module.exports = router;
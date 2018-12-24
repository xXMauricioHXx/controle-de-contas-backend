const router = require('express').Router();

const authVerify = require('../middlewares/authentication');
const validateId = require('../middlewares/validateId');
const usuarioController = require('../controllers/usuario');

router.post('/auth', usuarioController.auth)
router.post('/usuarios', [
    authVerify,
    usuarioController.insert
]);
router.get('/usuarios', [
    authVerify,
    usuarioController.find
]);
router.get('/usuarios/:id', [
    authVerify,
    validateId,
    usuarioController.findById
]);
router.put('/usuarios/:id', [
    authVerify,
    validateId,
    usuarioController.update
]);
router.delete('/usuarios/:id', [
    authVerify,
    validateId,
    usuarioController.remove
]);

module.exports = router;
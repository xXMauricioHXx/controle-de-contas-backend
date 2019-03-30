const router = require('express').Router();

const authVerify = require('../middlewares/authentication');
const validateId = require('../middlewares/validateId');
const contasController = require('./contas.controller');


router.post('/contas', [
    //authVerify,
    contasController.insert
]);

router.get('/contas', [
    //authVerify,
    contasController.find
]);

router.get('/contas/:id', [
    //authVerify,
    validateId, 
    contasController.findById
]);

router.put('/contas/:id', [
    //authVerify,
    validateId,
    contasController.update
]);
router.delete('/contas/:id', [
    //authVerify,
    validateId,
    contasController.remove
]);

module.exports = router;
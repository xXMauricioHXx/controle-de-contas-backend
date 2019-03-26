const router = require('express').Router();

const authVerify = require('../middlewares/authentication');
const validateId = require('../middlewares/validateId');
const cataoController = require('./cartao.controller');

router.post('/cartao', [
    //authVerify,
    cataoController.insert
]);
router.get('/cartao', [
    //authVerify,
    cataoController.find
]);
router.get('/cartao/:id', [
    //authVerify,
    validateId,
    cataoController.findById
]);
router.put('/cartao/:id', [
    //authVerify,
    validateId,
    cataoController.update
]);
router.delete('/cartao/:id',[ 
    //authVerify,
    validateId,
    cataoController.remove
]);

module.exports = router;
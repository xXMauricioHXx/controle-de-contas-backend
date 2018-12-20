const router = require('express').Router();

const authVerify = require('../middlewares/authentication.middleware');
const contasController = require('../controllers/contas.controller');

router.post('/contas', authVerify, contasController.insert)    
router.get('/contas', authVerify, contasController.find)
router.get('/contas/:id', authVerify, contasController.findById)
router.put('/contas/:id', authVerify, contasController.update)
router.delete('/contas/:id', authVerify, contasController.remove)

module.exports = router;
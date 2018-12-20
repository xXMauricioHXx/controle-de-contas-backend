const router = require('express').Router();

const authVerify = require('../middlewares/authentication.middleware');
const cataoController = require('../controllers/cartao.controller');

router.post('/cartao', authVerify, cataoController.insert)
router.get('/cartao', authVerify, cataoController.find)
router.get('/cartao/:id', authVerify, cataoController.findById)
router.put('/cartao/:id', authVerify, cataoController.update)
router.delete('/cartao/:id', authVerify, cataoController.remove)

module.exports = router;
const Cartao = require('../models/cartao.model');
const CustomError = require('../exceptions/contants.exception');
const ExceptionsContants = require('../exceptions/contants.exception');

function CartaoController() 
{
    const find = (req, res, next) => {
        Cartao.find()
            .then(cartao => {                
                res.json(cartao);
                return next
            })
            .catch(next);
    }

    const findById = (req, res, next) => {
        Cartao.findById(req.params.id)
            .then(cartao => {
                if (cartao) {
                    res.json(conta);                    
                } else {                   
                    throw new CustomError(ExceptionsContants.CARTAO_NAO_ENCONTRADO);
                }
                return next();
            })
            .catch(next)
    }

    const insert = (req, res, next) => {
        let cartao = new Cartao(req.body);
        cartao.save()
            .then(cartao => {
                res.json(cartao);
                return next();                
            })
            .catch(next)
    }

    const update = (req, res, next) => {
        const options = {
            new: true
        }

        Cartao.findByIdAndUpdate(req.params.id, req.body, options)
            .then(cartao => {
                if (cartao.length) {
                    res.json(cartao)
                    return next();
                } else {
                    throw new CustomError(ExceptionsContants.CARTAO_NAO_ENCONTRADO);
                }                
            })
            .catch(next)
    }

    const remove = (req, res, next) => {
        Conta.deleteOne({_id: req.params.id}).exec()
            .then(cmdResult => {
                if (cmdResult.n) {
                    res.sendStatus(204)                    
                } else {
                    throw new CustomError(ExceptionsContants.CARTAO_NAO_ENCONTRADO);
                }                
                return next();
            })
            .catch(next)
    }

    return {
        find,
        findById,
        insert,
        update,
        remove
    }
}


module.exports = CartaoController
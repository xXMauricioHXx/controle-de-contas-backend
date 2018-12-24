const Conta = require('../models/contas');
const AppError = require('../exceptions/appException');
const ExceptionsContants = require('../exceptions/contantsException');

const find = (req, res, next) => {
    Conta.find()
        .then(contas => {                
            res.json(contas);
            return next
        })
        .catch(next);
}

const findById = (req, res, next) => {
    Conta.findById(req.params.id)
        .then(conta => {
            if (conta) {
                res.json(conta);                    
            } else {                   
                throw new AppError(ExceptionsContants.CONTA_NAO_CADASTRADA_NO_SISTEMA);
            }
            return next();
        })
        .catch(next)
}

const insert = (req, res, next) => {
    let conta = new Conta(req.body);
    conta.save()
        .then(conta => {
            res.json(conta);
            return next();                
        })
        .catch(next)
}

const update = (req, res, next) => {
    const options = {
        new: true
    }

    Conta.findByIdAndUpdate(req.params.id, req.body, options)
        .then(conta => {
            if (conta.length) {
                res.json(conta)
                return next();
            } else {
                throw new AppError(ExceptionsContants.CONTA_NAO_CADASTRADA_NO_SISTEMA);
            }                
        })
        .catch(next)
}

const remove = (req, res, next) => {
    Conta.deleteOne({_id: req.params.id}).exec()
        .then(cmdResult => {            
            if (cmdResult.n){
                res.sendStatus(204)                    
            }else {
                throw new AppError(ExceptionsContants.CONTA_NAO_CADASTRADA_NO_SISTEMA);
            }                
            return next();
        })
        .catch(next)
}
  


module.exports = {
    find,
    findById,
    insert,
    update,
    remove
}
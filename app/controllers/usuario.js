const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');
const AppError = require('../exceptions/appException');
const AuthenticationError = require('../exceptions/authenticationException');
const ExceptionsContants = require('../exceptions/contantsException');

const find = (req, res, next) => {
    Usuario.find()
        .then(usuario => {                
            res.json(usuario);
            return next()
        })
        .catch(next);
}

const findById = (req, res, next) => {
    Usuario.findById(req.params.id)
        .then(usuario => {
            if (usuario) {       
                usuario.senha = undefined;             
                res.json(usuario);                    
            } else {                   
                throw new AppError(ExceptionsContants.USUARIO_NAO_CADASTRADO_NO_SISTEMA);
            }
            return next();
        })
        .catch(next)
}

const insert = (req, res, next) => {
    let usuario = new Usuario(req.body);
    usuario.save()
        .then(usuario => {
            usuario.senha = undefined
            res.json(usuario);
            return next();                
        })
        .catch(next)
}

const update = (req, res, next) => {
    const options = {
        new: true,
        runValidators: true
    }

    Usuario.findByIdAndUpdate(req.params.id, req.body, options)
        .then(usuario => {
            if (usuario) {
                usuario.senha = undefined;
                res.json(usuario)
                return next();
            } else {
                throw new AppError(ExceptionsContants.USUARIO_NAO_CADASTRADO_NO_SISTEMA);
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
                throw new AppError(ExceptionsContants.USUARIO_NAO_CADASTRADO_NO_SISTEMA);
            }                
            return next();
        })
        .catch(next)
}

const auth = (req, res, next) => {    
    Usuario.findOne({email: req.body.email})
        .then( function (usuario) {           
            if (usuario) {
                const token = jwt.sign({email: usuario.email}, process.env.JWT_SECRET, {
                    expiresIn: 5000
                });

                res.json({token: token});                                
            } else {
                throw new AuthenticationError(ExceptionsContants.USUARIO_SEM_PERMISSAO_DE_ACESSO);
            }
        })
        .catch(next);
}

module.exports = {
    find,
    findById,
    insert,
    update,
    remove,
    auth
}
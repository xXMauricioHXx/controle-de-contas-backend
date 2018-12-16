const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario.model');
const CustomError = require('../exceptions/contants.exception');
const AuthenticationError = require('../exceptions/authentication.exception');
const ExceptionsContants = require('../exceptions/contants.exception');


function UsuarioController() 
{
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
                    res.json(usuario);                    
                } else {                   
                    throw new CustomError(ExceptionsContants.USUARIO_NAO_ENCONTRADO);
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
            new: true
        }

        Usuario.findByIdAndUpdate(req.params.id, req.body, options)
            .then(usuario => {
                if (usuario.length) {
                    usuario.senha = undefined;
                    res.json(usuario)
                    return next();
                } else {
                    throw new CustomError(ExceptionsContants.USUARIO_NAO_ENCONTRADO);
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
                    throw new CustomError(ExceptionsContants.USUARIO_NAO_ENCONTRADO);
                }                
                return next();
            })
            .catch(next)
    }

    const auth = (req, res, next) => {
        Usuario.findOne({email: req.body.email, senha: req.body.senha})
            .then(usuario => {
                if (usuario) {
                    const token = jwt.sign({email: usuario.email}, process.env.JWT_SECRET, {
                        expiresIn: 5000
                    });
                    res.json({token: token});                    
                } else {
                    throw new AuthenticationError(ExceptionsContants.USUARIO_NAO_ENCONTRADO);
                }
            })
            .catch(next);
    }

    return {
        find,
        findById,
        insert,
        update,
        remove,
        auth
    }
}


module.exports = UsuarioController
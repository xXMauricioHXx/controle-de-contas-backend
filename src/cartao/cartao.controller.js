const Cartao = require("./cartao.model");
const AppError = require("../exceptions/AppError");
const ExceptionsContants = require("../exceptions/ExceptionsConstants");

const find = (req, res, next) => {
  Cartao.find()
    .then(cartao => {
      res.json(cartao);
      return next;
    })
    .catch(next);
};

const findById = (req, res, next) => {
  Cartao.findById(req.params.id)
    .then(cartao => {
      if (cartao) {
        res.json(cartao);
      } else {
        throw new AppError(
          ExceptionsContants.CARTAO_NAO_CADASTRADO_NO_SISTEMA,
          404
        );
      }
      return next();
    })
    .catch(next);
};

const insert = (req, res, next) => {
  let cartao = new Cartao(req.body);
  cartao
    .save()
    .then(cartao => {
      res.json(cartao);
      return next();
    })
    .catch(next);
};

const update = (req, res, next) => {
  const options = {
    new: true
  };

  Cartao.findByIdAndUpdate(req.params.id, req.body, options)
    .then(cartao => {
      if (cartao) {
        res.json(cartao);
        return next();
      } else {
        throw new AppError(
          ExceptionsContants.CARTAO_NAO_CADASTRADO_NO_SISTEMA,
          404
        );
      }
    })
    .catch(next);
};

const remove = (req, res, next) => {
  Conta.deleteOne({ _id: req.params.id })
    .exec()
    .then(cmdResult => {
      if (cmdResult.n) {
        res.sendStatus(204);
      } else {
        throw new AppError(
          ExceptionsContants.CARTAO_NAO_CADASTRADO_NO_SISTEMA,
          404
        );
      }
      return next();
    })
    .catch(next);
};

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

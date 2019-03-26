const Conta = require("./contas.model");
const AppError = require("../exceptions/AppError");
const ExceptionsContants = require("../exceptions/ExceptionsConstants");
const moment = require("moment");

const find = (req, res, next) => {
  Conta.find()
    .then(contas => {
      res.json(contas);
      return next;
    })
    .catch(next);
};

const findById = (req, res, next) => {
  Conta.findById(req.params.id)
    .then(conta => {
      if (conta) {
        res.json(conta);
      } else {
        throw new AppError(
          ExceptionsContants.CONTA_NAO_CADASTRADA_NO_SISTEMA,
          404
        );
      }
      return next();
    })
    .catch(next);
};

const insert = (req, res, next) => {
  const contaBody = req.body;
  if (contaBody.parcelas) {
    let currentDate = moment(contaBody.dataDaCompra);
    for (let i = 0; i < contaBody.parcelas; i++) {
      contaBody.dataDaCompra = currentDate.toISOString();
      contaBody.mes = currentDate.month() + 1;
      let conta = new Conta(contaBody);
      conta
        .save()
        .then(conta => {
          res.status(200).json({ contaId: conta._id });
          return next();
        })
        .catch(next);
      currentDate = moment(currentDate).add(1, "M");
    }
  } else {
    let conta = new Conta(req.body);
    conta
      .save()
      .then(conta => {
        res.status(200).json({ contaId: conta._id });
        return next();
      })
      .catch(next);
  }
};

const update = (req, res, next) => {
  const options = {
    new: true
  };

  Conta.findOneAndUpdate({ _id: req.params.id }, req.body, options)
    .then(conta => {
      if (conta) {
        res.status(200).json({ contaId: conta._id });
        return next();
      } else {
        throw new AppError(
          ExceptionsContants.CONTA_NAO_CADASTRADA_NO_SISTEMA,
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
          ExceptionsContants.CONTA_NAO_CADASTRADA_NO_SISTEMA,
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

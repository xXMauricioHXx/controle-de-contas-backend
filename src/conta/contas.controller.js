const Conta = require("./contas.model");
const AppError = require("../exceptions/appError.js");
const ExceptionsContants = require("../exceptions/exceptionsConstants.js");
const moment = require("moment");

const find = (req, res, next) => {
  Conta.find()
    .then(contas => {
      res.status(200).json(contas);
      return next();
    })
    .catch(next);
};

const findById = (req, res, next) => {
  Conta.findById(req.params.id)
    .then(conta => {
      if (conta) {
        res.status(200).json(conta);
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
  const { parcelas } = req.body;
  if (parcelas) {
    insertComParcelas(req.body)
      .then(() => {
        res.status(200);
        return next();
      })
      .catch(next);
  }
  insertSemParcela(req.body)
    .then(() => {
      res.status(200);
      return next();
    })
    .catch(next);
};

const insertComParcelas = conta => {
  return new Promise(async (resolve, reject) => {
    try {
      const { paracelas } = conta;
      for (let i = 0; i < paracelas; i++) {
        conta = getContaMesSeguinte(conta);
        const novaConta = new Conta(conta);
        await novaConta.save();
      }
    } catch (err) {
      reject(err);
    }
  });
};

const insertSemParcela = conta => {
  const novaConta = new Conta(conta);
  return novaConta.save();
};

const getContaMesSeguinte = conta => {
  const contaMesSeguinte = { ...conta };
  contaMesSeguinte.dataDaCompra = moment(contaMesSeguinte.dataDaCompra)
    .add(1, "M")
    .toISOString();
  contaMesSeguinte.mes = contaMesSeguinte.mes + 1;
  return contaMesSeguinte;
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

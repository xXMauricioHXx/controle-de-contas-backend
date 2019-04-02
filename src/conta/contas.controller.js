const Conta = require("./contas.model");
const AppError = require("../exceptions/appError");
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

const insert = async (req, res, next) => {
  const { parcelas } = req.body;
  try {
    if (parcelas) {
      await insertComParcelas(req.body);
      res.sendStatus(200);
      return next();
    }
    const conta = await insertSemParcela(req.body);
    res.json(conta).status(200);
    return next();
  } catch(err) {
    return next(err);
  }
  
};

const insertComParcelas = data => {
  return new Promise((resolve, reject) => {
    try {
      getPrestacoesConta(data, data.parcelas).forEach(async (conta) => {
        let novaConta = new Conta(conta);
        await novaConta.save();
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const getPrestacoesConta = (conta, numeroParcelas) => {
  let contas = [];  
  for (let i = 0; i < numeroParcelas; i++) {
    contas.push(conta);
    conta = getContaMesSeguinte(conta);
  }
  console.log(contas);
  return contas;
}
 
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

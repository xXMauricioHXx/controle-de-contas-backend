const Conta = require("./contas.model");
const AppError = require("../exceptions/appError");
const ExceptionsContants = require("../exceptions/exceptionsConstants");
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

const insert = async (req, res, next) => {
  const { parcelas } = req.body;
  if (parcelas) {
    insertComParcelas(req.body);
    return next();
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

const insertComParcelas = conta => {
  return new Promise((resolve, reject) => {
    try {
      const { dataDaCompra, paracelas } = conta;      
      for (let i = 0; i < paracelas; i++) {
        conta.dataDaCompra = dataToString(dataDaCompra);
        conta.mes = currentDate.month() + 1;
        const novaConta = new Conta(conta);
        novaConta.save();
        dataAtual = moment(dataAtual).add(1, "M");
      }
    } catch (err) {}
  });
};

const dataToString = (data) => {
  return moment(data).toISOString();
}

const addMonthInDate  = (data) => {
  return moment(data).add(1, "M");
}
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

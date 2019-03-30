const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Usuario = require("./usuario.model");
const AppError = require("../exceptions/AppError");
const ExceptionsContants = require("../exceptions/exceptionsConstants");

const find = (req, res, next) => {
  Usuario.find()
    .then(usuarios => {
      const data = getUserData(usuarios);
      res.status(200).json(data);
      return next();
    })
    .catch(next);
};

const findById = (req, res, next) => {
  Usuario.findById(req.params.id)
    .then(usuario => {
      if (usuario) {
        const data = getUserData([usuario]);
        res.status(200).json(data[0]);
      } else {
        throw new AppError(
          ExceptionsContants.USUARIO_NAO_CADASTRADO_NO_SISTEMA,
          404
        );
      }
      return next();
    })
    .catch(next);
};

const insert = (req, res, next) => {
  let usuario = new Usuario(req.body);
  usuario
    .save()
    .then(usuario => {
      res.status(200).json({ usuarioId: usuario._id });
      return next();
    })
    .catch(next);
};

const update = (req, res, next) => {
  const options = {
    new: true,
    runValidators: true
  };

  Usuario.findOneAndUpdate({ _id: req.params.id }, req.body, options)
    .then(usuario => {
      if (usuario) {
        res.status(200).json({ usuarioId: usuario._id });
        return next();
      } else {
        throw new AppError(
          ExceptionsContants.USUARIO_NAO_CADASTRADO_NO_SISTEMA,
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
          ExceptionsContants.USUARIO_NAO_CADASTRADO_NO_SISTEMA,
          404
        );
      }
      return next();
    })
    .catch(next);
};

const auth = async (req, res, next) => {
  const { email, senha } = req.body;
  const user = await Usuario.findOne({ email });

  if (!user) {
    throw new AppError(ExceptionsContants.USUARIO_SEM_PERMISSAO_DE_ACESSO, 401);
  }
  if (!(await bcrypt.compare(senha, user.senha))) {
    throw new AppError(USUARIO_OU_SENHA_INVALIDA, 400);
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: 8240
  });
  res.status(200).json({ token: token });
  return next();
};
const getUserData = usuarios => {
  return usuarios.map(({ _id, nome, email }) => {
    return {
      _id,
      nome,
      email
    };
  });
};

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  auth
};

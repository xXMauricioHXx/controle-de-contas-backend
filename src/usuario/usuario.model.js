const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  saldoMes: {
    type: Object,
    required: true
  }
});

const hashPassword = (obj, next) => {
  bcrypt
    .hash(obj.senha, 10)
    .then(hash => {
      obj.senha = hash;
      next();
    })
    .catch(next);
};

const saveMiddleware = function(next) {
  const usuario = this;
  if (!usuario.isModified("senha")) {
    next();
  } else {
    hashPassword(usuario, next);
  }
};

const updateMiddleware = function(next) {
  if (!this.getUpdate().senha) {
    next();
  } else {
    hashPassword(this.getUpdate(), next);
  }
};

usuarioSchema.pre("save", saveMiddleware);
usuarioSchema.pre("findOneAndUpdate", updateMiddleware);
usuarioSchema.pre("update", updateMiddleware);

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;

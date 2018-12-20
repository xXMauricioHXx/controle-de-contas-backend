const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        required: true,
        select: false
    }
})

usuarioSchema.pre('save', function(next) {
    const usuario = this;
    if (!usuario.isModified('senha')) {
        next();
    } else {
        bcrypt.hash(usuario.senha, 1)
            .then(hash => {
                usuario.senha = hash;
                next();
            })
            .catch(next)
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;

//db.usuarios.insert({"nome":"Mauricio Henrique", "email": "mauriciosh558@gmail.com", "senha":"123456"})          
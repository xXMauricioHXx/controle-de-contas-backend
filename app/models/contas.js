const mongoose = require('mongoose');
const Cartao = require('./cartao');
const Usuario = require('./usuario');

const contaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true,
        maxlength: 255
    },
    valor: {
        type: Number,
        required: true
    },
    parcelas: {
        type: Number
    },
    dataDaCompra: {
        type: String,
        required: true
    },
    dataDoCadastro: {
        type: String,
        required: true
    },
    mes: {
        type: Number,
        required: true
    },
    tipoCompra: {
        type: String,
        enum: ['Cartão', 'A vista'],
        required: true
    },
    usuario: {
        type: {Usuario},
        required: true
    },
    cartao: {
        type: {Cartao},        
    },
    categoria: {
        type: String,
        enum: ['Comida', 'Roupa', 'Viagem', 'Eletrônicos'],
        required: true
    }
})

const Conta = mongoose.model('Conta', contaSchema);
module.exports = Conta;

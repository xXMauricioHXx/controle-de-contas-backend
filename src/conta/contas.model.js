const mongoose = require('mongoose');

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
        type: Object,
        required: true
    },
    cartao: {
        type: Object,        
    },
    categoria: {
        type: String,
        enum: ['Comida', 'Roupa', 'Viagem', 'Eletrônicos'],
        required: true
    }
})

const Conta = mongoose.model('Conta', contaSchema);
module.exports = Conta;

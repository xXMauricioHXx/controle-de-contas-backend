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
        required: true
    }
})

const Conta = mongoose.model('Conta', contaSchema);
module.exports = Conta;

//{ "_id" : ObjectId("5c0d720c96c24938df7d1026"), "nome" : "Mauricio Henrique", "email" : "mauriciosh558@gmail.com", "senha" : "123456" }
//{ "_id" : ObjectId("5c0d732899565c21eac9096d"), "nome" : "Hipercard", "diaVencimento" : 7 }
//db.contas.insert({"descricao":"MC Donalds", "valor":69.90, "dataDaCompra": "2018-12-09T19:53:28.036Z", "dataDoCadastro": "2018-12-09T19:53:28.036Z", "mes": 12, "tipoCompra": "A vista", "usuario":{ "_id" : ObjectId("5c0d720c96c24938df7d1026"), "nome" : "Mauricio Henrique", "email" : "mauriciosh558@gmail.com", "senha" : "123456" }, "cartao":{ "_id" : ObjectId("5c0d732899565c21eac9096d"), "nome" : "Hipercard", "diaVencimento" : 7 }})
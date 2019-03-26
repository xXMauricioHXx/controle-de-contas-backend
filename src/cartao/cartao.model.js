const mongoose = require('mongoose');

const cartaoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    diaVencimento: {
        type: Number,
        required: true
    }  

})

const Cartao = mongoose.model('Cartao', cartaoSchema);
module.exports = Cartao;

//db.cartao.insert({"nome":"Hipercard", "diaVencimento": 7})
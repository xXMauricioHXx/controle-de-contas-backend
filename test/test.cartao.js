const assert = require('assert');
const Cartao = require('../src/cartao/cartao.model');
const mongoose = require('../database');

describe('Cartão', function() {
    before(function (done) {
        const db = mongoose.connection;
        db.once('open', function() {          
            done();
        });        
    });
    
    describe('Criação de Cartão', function() {
        it('Cartão isNew = false', function() {
            let cartao = new Cartao({
                nome: "Hipercard",
                diaVencimento: 7
            });

            cartao.save()
                .then(() => {
                    assert(!cartao.isNew);
                })
                .catch(err => {
                    throw new Error(err.message);
                })
        });
    });

    after(function(done){
        mongoose.connection.close();
        done()
    });
});
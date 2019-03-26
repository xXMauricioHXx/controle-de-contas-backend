const assert = require('assert');
const Cartao = require('../src/cartao/cartao.model');
const mongodb = require('../database/mongodb');

describe('Cartão', function() {
    before(function (done) {
        mongodb.connect();
        const db = mongoDB.getConnection();        
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
        mongoDB.endConnect();
        done()
    });
});
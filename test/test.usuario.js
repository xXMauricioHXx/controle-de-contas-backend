const assert = require('assert');
const mongoDB = require('../config/mongoDB');
const Usuario = require('../app/models/usuario');

describe('Usuário', function() {
    before(function (done) {
        mongoDB.connect();
        const db = mongoDB.getConnection();        
        db.once('open', function() {          
            done();
        });        
    });
    
    describe('Criação de usuario', function() {
        it('Usuário isNew = false', function() {
            let usuario = new Usuario({
                nome: "Mauricio Henrique",
                email: "mauriciosh558@gmail.com",
                senha: "123456"
            });

            usuario.save()
                .then(() => {                    
                    assert(!usuario.isNew);
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
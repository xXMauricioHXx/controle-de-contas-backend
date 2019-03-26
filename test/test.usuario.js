const assert = require('assert');
const mongoose = require('../database');
const Usuario = require('../src/usuario/usuario.model');

describe('Usuário', function () {
    before(function (done) {
        const db = mongoose.connection;
        db.once('open', function () {
            done();
        });
    });

    describe('Criação de usuario', function () {
        it('Usuário isNew = false', function () {
            let usuario = new Usuario({
                nome: "Mauricio Henrique",
                email: "mauriciosh558@gmail.com",
                senha: "123456",
                saldoMes: {
                    janeiro: 1800.00,
                    fevereiro: 1800.00,
                    marco: 1800.00,
                    abril: 1800.00,
                    maio: 1800.00,
                    junho: 1800.00,
                    julho: 1800.00,
                    agosto: 1800.00,
                    setembro: 1800.00,
                    outubro: 1800.00,
                    novembro: 1800.00,
                    dezembro: 1800.00
                }
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

    after(function (done) {
        mongoose.connection.close();
        done()
    });
});
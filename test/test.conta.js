const assert = require('assert');
const Conta = require('../src/conta/contas.model');
const Cartao = require('../src/cartao/cartao.model');
const Usuario = require('../src/usuario/usuario.model');

describe('Conta', function () {
    describe('Criação de Conta', function () {
        it('Conta isNew = false', function () {

            let cartao = new Cartao({
                nome: "Mastercard",
                diaVencimento: 11
            });
            cartao.save();

            let usuario = new Usuario({
                nome: "Joyce Trindade",
                email: "trindade.soc@gmail.com",
                senha: "123456",
                saldoMes: {
                    janeiro: 1100.00,
                    fevereiro: 1100.00,
                    marco: 1100.00,
                    abril: 1100.00,
                    maio: 1100.00,
                    junho: 1100.00,
                    julho: 1100.00,
                    agosto: 1100.00,
                    setembro: 1100.00,
                    outubro: 1100.00,
                    novembro: 1100.00,
                    dezembro: 1100.00
                }
            });

            usuario.save();
            let conta = new Conta({
                descricao: "Mc Donalds",
                valor: 69.00,
                dataDaCompra: "2019-01-01",
                dataDoCadastro: "2019-01-01",
                mes: 1,
                tipoCompra: 'Cartão',
                usuario: usuario,
                cartao: cartao,
                categoria: 'Comida'
            });

            conta.save()
                .then(() => {
                    assert(!conta.isNew);
                })
                .catch(err => {
                    throw new Error(err);
                })
        });
    });
});
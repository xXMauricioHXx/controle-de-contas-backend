const assert = require("assert");
const Conta = require("../src/conta/contas.model");
const Cartao = require("../src/cartao/cartao.model");
const Usuario = require("../src/usuario/usuario.model");
const CartaoController = require("../src/conta/contas.controller");

describe("Conta", function() {
  describe("Criação de Conta", function() {
    it("Conta isNew = false", function() {
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
          janeiro: 1100.0,
          fevereiro: 1100.0,
          marco: 1100.0,
          abril: 1100.0,
          maio: 1100.0,
          junho: 1100.0,
          julho: 1100.0,
          agosto: 1100.0,
          setembro: 1100.0,
          outubro: 1100.0,
          novembro: 1100.0,
          dezembro: 1100.0
        }
      });

      usuario.save();
      let conta = new Conta({
        descricao: "Mc Donalds",
        valor: 69.0,
        dataDaCompra: "2019-01-01",
        dataDoCadastro: "2019-01-01",
        mes: 1,
        tipoCompra: "Cartão",
        usuario: usuario,
        cartao: cartao,
        categoria: "Comida"
      });

      conta
        .save()
        .then(() => {
          assert(!conta.isNew);
        })
        .catch(err => {
          throw new Error(err);
        });
    });
  });
});

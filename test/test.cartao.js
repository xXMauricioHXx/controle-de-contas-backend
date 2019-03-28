const assert = require("assert");
const Cartao = require("../src/cartao/cartao.model");
const mongoose = require("../database");

describe("Cartão", function() {
  describe("Criação de Cartão", function() {
    it("Cartão isNew = false", function() {
      let cartao = new Cartao({
        nome: "Hipercard",
        diaVencimento: 7
      });

      cartao
        .save()
        .then(() => {
          assert(!cartao.isNew);
        })
        .catch(err => {
          throw new Error(err.message);
        });
    });
  });
});

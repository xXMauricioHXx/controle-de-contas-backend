const router = require("express").Router();

const authVerify = require("../middlewares/authentication");
const validateId = require("../middlewares/validateId");
const ContasController = require("./contas.controller");

router.post("/contas", (req, res, next) => {
  ContasController.insert(req.body)
    .then(conta => {
      res.status(200).json(conta);
      return next();
    })
    .catch(next);
});

router.get("/contas", [
  //authVerify,
  ContasController.find
]);

router.get("/contas/:id", validateId, (req, res, next) => {
  ContasController.findById(req.params.id).then(contas => {
    res.status(200).json(contas);
  }).catch(next);
});

router.put("/contas/:id", [
  //authVerify,
  validateId,
  ContasController.update
]);
router.delete("/contas/:id", [
  //authVerify,
  validateId,
  ContasController.remove
]);

module.exports = router;

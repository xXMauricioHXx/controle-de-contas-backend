const router = require("express").Router();

const authVerify = require("../middlewares/authentication");
const validateId = require("../middlewares/validateId");
const ContasController = require("./contas.controller");

router.post("/contas", async (req, res, next) => {
  ContasController.insert(req.body)
    .then(() => {
      res.sendStatus(200);
      return next();
    })
    .catch(next);
});

router.get("/contas", [
  //authVerify,
  ContasController.find
]);

router.get("/contas/:id", [
  //authVerify,
  validateId,
  ContasController.findById
]);

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

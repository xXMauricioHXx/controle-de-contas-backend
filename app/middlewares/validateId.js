const mongoose = require('mongoose');
const AppError = require('../exceptions/appException');
const ExceptionsContants = require('../exceptions/contantsException');

const validateId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(new AppError(ExceptionsContants.NENHUM_REGISTRO_ENCONTRADO_COM_O_ID_INFORMADO));        
    } else {
        next();
    }
}

module.exports = validateId;
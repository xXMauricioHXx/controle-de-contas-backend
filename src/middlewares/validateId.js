const mongoose = require('mongoose');
const AppError = require('../exceptions/AppError');
const ExceptionsContants = require('../exceptions/ExceptionsConstants');

const validateId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        next(new AppError(ExceptionsContants.NENHUM_REGISTRO_ENCONTRADO_COM_O_ID_INFORMADO, 404));        
    } else {
        next();
    }
}

module.exports = validateId;
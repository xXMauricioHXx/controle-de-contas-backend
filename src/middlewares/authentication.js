const jwt = require('jsonwebtoken');
const AppError = require('../exceptions/AppError');
const ExceptionsContants = require('../exceptions/ExceptionsConstants');

const verify = (req, res, next) =>{
	let token 	= req.headers['x-access-token'];

	if(token){
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if(err){
				throw new AppError(ExceptionsContants.TOKEN_DE_ACESSO_INVALIDO_OU_MODIFICADO, 401);                    					
			}							
			req.usuario = decoded;
			next();			
		});			
	}else{
		throw new AppError(ExceptionsContants.TOKEN_DE_ACESSO_NAO_ENVIADO, 401); 
	}
}

module.exports = verify;
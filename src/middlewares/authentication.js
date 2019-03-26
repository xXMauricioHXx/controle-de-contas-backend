const jwt = require('jsonwebtoken');
const AuthenticationError = require('../exceptions/authenticationException');
const ExceptionsContants = require('../exceptions/ExceptionsConstants');

const verify = (req, res, next) =>{
	let token 	= req.headers['x-access-token'];

	if(token){
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if(err){
				throw new AppError(ExceptionsContants.TOKEN_DE_ACESSO_INVALIDO_OU_MODIFICADO);                    					
			}							
			req.usuario = decoded;
			next();			
		});			
	}else{
		throw new AuthenticationError(ExceptionsContants.TOKEN_DE_ACESSO_NAO_ENVIADO); 
	}
}

module.exports = verify;
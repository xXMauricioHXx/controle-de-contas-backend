const jwt = require('jsonwebtoken');
const AuthenticationError = require('../exceptions/authentication.exception');
const ExceptionsContants = require('../exceptions/contants.exception');

function Authentication()
{
	const verify = (req, res, next) =>{
		let token 	= req.headers['x-access-token'];
	
		if(token){
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if(err){
                    throw new AuthenticationError(ExceptionsContants.TOKEN_INVALIDO_OU_MODIFICADO);                    					
				}							
				req.usuario = decoded;
				next();			
			});			
		}else{
			throw new AuthenticationError(ExceptionsContants.TOKEN_NAO_ENVIADO); 
		}
	}

	return {
		verify
	}
}

module.exports = Authentication;
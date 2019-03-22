function HandleError(err, req, res, next)
{   
    this.error = {    
        error: {
            name: err.name,
            message: err.message,
            code: err.code        
        }
    }
    
    switch(err.name) {
        case 'CastError':
            res.status(400).json(this.error)
            next(err)
        break
        case 'ValidationError':
            let messages = [];            
            for (let name in err.errors) {
                messages.push({name: err.name, message: err.errors[name].message})
            }

            let error = {                
                errors: messages
            }            
            res.status(400).json(error);
            next(err)
        break;
        case 'AuthenticationError':
            res.status(401).json(this.error)
            next(err)
        break
    } 
    res.status(404).json(error)
}

module.exports = HandleError;
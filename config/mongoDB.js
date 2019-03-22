const mongoose = require('mongoose');
//VTW4G7I1ofl1CcGJ
//admin

//mongodb+srv://admin:VTW4G7I1ofl1CcGJ@cluster0-o6gt5.mongodb.net/test?retryWrites=true

const connect = () => {                                 
    return mongoose.connect('mongodb+srv://admin:VTW4G7I1ofl1CcGJ@cluster0-o6gt5.mongodb.net/test?retryWrites=true', 
        {    
            useCreateIndex: true,
            useNewUrlParser: true
        }
    );    
}

const getConnection = () => {
    return mongoose.connection;
}

const endConnect = () => {
    mongoose.connection.close();
}
 
module.exports = {
    connect,
    getConnection,
    endConnect
};
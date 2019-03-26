const mongoose = require("mongoose");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
const connect = () => {                                 
    return mongoose.connect(process.env.MONGODB_URI , 
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
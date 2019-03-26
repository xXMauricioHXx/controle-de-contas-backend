const mongoose = require("mongoose");

const connect = () => {                                 
    return mongoose.connect(process.env.MONGODB_URI, 
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
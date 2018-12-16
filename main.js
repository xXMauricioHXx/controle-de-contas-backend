const http = require('http');
const mongoose = require('mongoose');

const app = require('./config/express');

mongoose.connect(process.env.MONGODB_URI, {   
    useNewUrlParser: true
}).then(() => {
    console.log('Connected in MongoDB');
}).catch(err => {
    console.error(err);
    process.exit(1);
})

http.createServer(app).listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

    



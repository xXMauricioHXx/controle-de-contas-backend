const http = require('http');
const app = require('./config/express');
const mongoDB = require('./config/mongoDB');


mongoDB.connect()
    .then(() => {
        console.log('Connected in MongoDB');
        http.createServer(app).listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT ||3000}`);
        });
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    })


    



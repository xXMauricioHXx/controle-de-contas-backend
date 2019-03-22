const mongoDB = require('./config/mongoDB')

function connect() {
    return mongoDB.connect();
}

async function clear() 
{
    console.log('Zerando collection...');
    await connect().then(conn => {
        conn.connection.db.dropDatabase((err, result) => {
            if (err) {
                throw new Error(err);
            }
            console.log('\nCollection zerada com sucesso');
            console.log('\nIniciando os testes\n');
            process.exit();
        });
    });
}
clear()
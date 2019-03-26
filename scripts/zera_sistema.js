const mongoose = require("../database");
async function clear() {
   console.log("Zerando collection...");
   await mongoose.connection.then(conn => {
      conn.db.dropDatabase((err, result) => {
         if (err) {
            throw new Error(err);
         }
         console.log("\nCollection zerada com sucesso");
         console.log("\nIniciando os testes\n");
         process.exit();
      });
   });
}
clear();

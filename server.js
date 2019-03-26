const http = require("http");
const app = require("./src/app");
const mongoose = require("./database");
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected in MongoDB");
  http.createServer(app).listen(process.env.PORT || 3000, () => {
    console.log(
      `Server is running on http://localhost:${process.env.PORT || 3000}`
    );
  });
});

db.on("error", (err) => {
  console.log(err);
})
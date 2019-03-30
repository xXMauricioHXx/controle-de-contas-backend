const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;

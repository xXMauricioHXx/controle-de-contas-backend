const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin:VTW4G7I1ofl1CcGJ@cluster0-o6gt5.mongodb.net/test?retryWrites=true", {
  useCreateIndex: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;

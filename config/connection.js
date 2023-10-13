const mongoose = require("mongoose");
const url = process.env.DB_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("Connected");
})

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection failed"));

module.exports = mongoose;
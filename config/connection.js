const mongoose = require("mongoose");
const url = "mongodb+srv://mirzaarri:Arri14321@cluster0.qtq9cdd.mongodb.net/"
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("Connected");
})

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection failed"));

module.exports = mongoose;
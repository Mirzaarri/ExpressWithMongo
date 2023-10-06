const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require("body-parser")
let PORT = 4000;
let mongoose = require('./config/connection');
let userRoutes = require('./routes/user')
let blogRouter = require('./routes/blog')

app.get("/home",(req,res)=>{
  res.send({"name":"my"});
})


app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/user', userRoutes)
app.use('/blog', blogRouter)


app.listen(PORT, 'localhost', (req, res)=>{
  console.log(`Server starting at ${PORT}`);
})
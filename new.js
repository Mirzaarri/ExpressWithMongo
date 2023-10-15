const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser")
let PORT = 4000;
let mongoose = require('./config/connection');
let userRoutes = require('./routes/user')
let blogRouter = require('./routes/blog')
let signupRouter = require('./routes/login')
let productRouter = require('./routes/product')
let quantityRouter = require('./routes/quantity')
// app.get("/home",(req,res)=>{
//   res.send({"name":"my"});
// })


app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/user', userRoutes)
app.use('/blog', blogRouter)
app.use('/loginsystem', signupRouter)
app.use('/', quantityRouter)
app.use('/', productRouter)

app.listen(PORT, 'localhost', (req, res)=>{
  console.log(`Server starting at ${PORT}`);
})
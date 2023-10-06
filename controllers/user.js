const Todo = require("../models/user");
const createdata = async (req, res) =>{
try {
  const {name, email, password} = req.body;
  const todo = new Todo({
    name,
    email,
    password,
  })
  await todo.save()
  res.json(todo);
} catch (err) {
  res.status(500).json({error: err.message})
}
}

//getting data from database
const getAllData = async (req, res)=>
{
try {
    const getTodos = await Todo.find({})
    res.json(getTodos)
  } catch(err){
  res.status(500).json({error: err.message})
}
}

//getting data from database using params
const getSingleData = async (req, res)=>{
  try{
    const getTodo = await Todo.findById(req.params.id);
      res.json(getTodo)
  } catch(error){
    res.status(500).json({error: error.message});
  }
}

//getting data from database using query
const getSingleDataWithQuery = async (req, res)=>{
  try{
    const getTodo = await Todo.findOne({_id: req.query.id});
      res.json(getTodo)
  } catch(error){
    res.status(500).json({error: error.message});
  }
}

//deleting data from database
const deleteData = async (req, res)=>{
  try {
    const getTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(getTodo)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}


//updating data in database
const updateData = async (req, res) => {
  try {
    const getTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(201).send(getTodo);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = {
  createdata, 
  getAllData, 
  getSingleData, 
  getSingleDataWithQuery, 
  deleteData,
  updateData
}
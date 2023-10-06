const Blog = require('../models/blog');

//inserting one blog
const createBlog = async (req, res) =>{
  try {
    const {title, subTitle, description, subscribers} = req.body; 
    const blog = new Blog({
      title,
      subTitle,
      description,
      subscribers
    })
    await blog.save()
    res.json(blog);
  } catch (err) {
    res.status(500).json({error: err.message})
  }
  }

  //inserting multiple records
  const createMultipleBlogs = async (req, res) => {
    try {
      const blogsData = req.body;
      const blogs = blogsData.map(blogData => new Blog(blogData));
      const insertedBlogs = await Blog.insertMany(blogs);
  
      res.json(insertedBlogs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  //getting data
  const getData = async (req, res) =>{
    try {
      const blog = await Blog.find({});
      res.json(blog);
    } catch (err) {
      res.status(500).json({error: err.message})
    }
    }

  //getting single data using params
    const getSingleData = async (req, res) =>{
      try {
        const blog = await Blog.findById(req.params.id)
        res.json(blog);
      } catch (err) {
        res.status(500).json({error: err.message})
      }
      }


  //getting single data using Query
const getSingleDataWithQuery = async (req, res)=>{
  try{
    const getBlog = await Blog.findOne({_id:req.query.id})
      res.json(getBlog);
  } catch(error){
    res.status(500).json({error: error.message});
  }
}

  //getting single data using Query
  const getSingleDataWithNameQuery = async (req, res)=>{
    try{
      const getBlog = await Blog.findOne({title: req.query.title});
        res.json(getBlog)
    } catch(error){
      res.status(500).json({error: error.message});
    }
  }



  //deleting data
      const deleteData = async (req, res) =>{
        try {
          const blog = await Blog.findByIdAndDelete(req.params.id)
          res.json(blog);
        } catch (err) {
          res.status(500).json({error: err.message})
        }
        }
  
  //updating record
        const updateData = async (req, res) =>{
          try {
            const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true})
            res.json(blog);
          } catch (err) {
            res.status(500).json({error: err.message})
          }
          }
  module.exports = {
    createBlog, 
    getData, 
    getSingleData, 
    getSingleDataWithQuery,
    getSingleDataWithNameQuery,
    deleteData, 
    updateData, 
    createMultipleBlogs
  }
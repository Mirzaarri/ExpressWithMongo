const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true,
    isLength: {
      options: { max: 15 },
      errorMessage: 'Title cannot exceed 15 chars',
    }
  },
  subTitle: {
    type:String,
    required:true
  },
  description: {
    type:String,
    required:true,
    isLength: {
      options: { min: 10 },
      errorMessage: 'Description should be at least 10 chars',
    }
  },
  subscribers: {
    type: Number,
    required: true,
    isInt: true,
  }
})

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
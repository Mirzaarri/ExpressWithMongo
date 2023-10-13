const Product = require('../models/product');

const addData = async (req, res) =>{
  try{
    const { name } = req.body;
    const product = new Product({name})
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const product = Product.find({});
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addData, getAllProducts }
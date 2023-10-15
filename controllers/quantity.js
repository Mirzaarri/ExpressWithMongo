const Quantity = require('../models/qualtity');

const createQuantity = async (req, res) =>{
  try{
    const { productId, value, userId } = req.body;
    const quantity = new Quantity({
      productId,
      value,
      userId
    })
    await quantity.save();
    res.status(201).json({ message: 'Quantity added successfully', quantity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getQuantityByProductId = async (req, res, next) => {
  try {
    const {productId} = req.params;
    const quantities = await Quantity.find({productId}).populate("productId")
    res.status(200).json(quantities)
  } catch (error) {
    next(error)
  }
}

const getQuantityByUserId = async (req, res, next) => {
  try {
    const {userId} = req.params;
    const quantities = await Quantity.find({userId}).populate("userId").populate("productId")
    res.status(200).json(quantities)
  } catch (error) {
    next(error)
  }
}

module.exports = { createQuantity, getQuantityByProductId, getQuantityByUserId}
const Favourite = require('../models/favouriteModel');
//const { json } = require('body-parser');
//const { resolveSoa } = require("dns");
const Product = require('../models/homeModel');
const User  = require('../models/authModel');

const addToFavourite = async (req, res) => {
    try {
      const item = new Favourite(req.body); // Create a new instance of Favourite with req.body
      try{
        // Check if the ownerId exists in the users collection
        const userExists = await  User.exists({ _id: req.body.ownerId });
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }
  
        // Check if the productId exists in the products collection
        const productExists = await Product.exists({ _id: req.body.productId });
        if (!productExists) {
            return res.status(404).json({ error: 'Product not found' });
        }}catch{
          return res.status(500).json({ error: 'error with id' });
        }
        const itemExists = await Favourite.exists({ ownerId: req.body.ownerId ,productId: req.body.productId });
        if (itemExists) {
            return res.status(404).json({ error: 'item already exist' });
        }
      await item.save();
      
      res.status(201).json({ result: "Item added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
const getAllItemsByOwnerId = async (req, res) =>{

  try{
    const items = await Favourite.find({ownerId : req.query.ownerId});
    if (items){
      res.status(200).json(items);
    } else{
      res.status(404).json({error: "No items match this ownerId"});
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({error : "Internal server error"});
  }

};

const deleteitem = async (req, res) => {
  try{
    try{
      // Check if the ownerId exists in the users collection
      const userExists = await  User.exists({ _id: req.body.ownerId });
      if (!userExists) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Check if the productId exists in the products collection
      const productExists = await Product.exists({ _id: req.body.productId });
      if (!productExists) {
          return res.status(404).json({ error: 'Product not found' });
      }}catch{
        return res.status(500).json({ error: 'error with id' });
      }

      const itemExists = await Favourite.exists({ ownerId: req.body.ownerId ,productId: req.body.productId });

      if (!itemExists) {
        return res.status(404).json({message: 'Item is not found'});
      }

      await Favourite.deleteOne({ ownerId: req.body.ownerId, productId: req.body.productId });
      res.status(200).json({ message: 'Item removed from favourite successfully' });
  } catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

  module.exports = {
    addToFavourite,
    getAllItemsByOwnerId,
    deleteitem
  }

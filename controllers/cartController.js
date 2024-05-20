const CartItem = require('../models/cartModel');
const Product = require('../models/homeModel');
const User  = require('../models/authModel');

const addProduct = async (req, res) => {
    try {
      const { ownerId, productId, name, price, quantity } = req.body;
      try{
      // Check if the ownerId exists in the users collection
      const userExists = await  User.exists({ _id: ownerId });
      if (!userExists) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Check if the productId exists in the products collection
      const productExists = await Product.exists({ _id: productId });
      if (!productExists) {
          return res.status(404).json({ error: 'Product not found' });
      }}catch{
        return res.status(500).json({ error: 'error with id' });
      }
      
      // Check if item already exists in cart
      let cartItem = await CartItem.findOne({ ownerId: ownerId, productId: productId });
      if (cartItem) {
        // If item exists, update quantity
        cartItem.quantity += quantity *1;
      } else {
        // If item does not exist, create new cart item
        cartItem = new CartItem({ ownerId, productId, name, price, quantity });
      }
  
      // Save the cart item
      await cartItem.save();
      
      res.status(201).json({ message: 'Item added to cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const GetProductsInCartById = async (req, res) => {
    try {
      try{
        // Check if the ownerId exists in the users collection
        const userExists = await  User.exists({ _id: req.params.ownerId });
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }
  
       }catch{
          return res.status(500).json({ error: 'error with id' });
        }
      // Query all products from the database
      const products = await CartItem.find({ownerId: req.params.ownerId});
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const deleteProduct = async (req, res) => {
    try {

      const ownerId = req.body.ownerId;
      const productId = req.body.productId;
      
      try{
        // Check if the ownerId exists in the users collection
        const userExists = await  User.exists({ _id: ownerId });
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }
  
        // Check if the productId exists in the products collection
        const productExists = await Product.exists({ _id: productId });
        if (!productExists) {
            return res.status(404).json({ error: 'Product not found' });
        }}catch{
          return res.status(500).json({ error: 'error with id' });
        }

      // Find and delete the cart item by product ID
      await CartItem.deleteOne({ ownerId: ownerId, productId: productId });
  
      res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports = {
    addProduct,
    deleteProduct,
    GetProductsInCartById
  }
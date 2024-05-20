const Product = require('../models/homeModel');
const User = require('../models/authModel');
const fs = require("fs");


const searchByDesc =  async (req, res) => {
  try {
    const { keyword } = req.query;

    // Query products from the database based on keyword in description
    const products = await Product.find({ description: { $regex: keyword, $options: 'i' } });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



const getProductById = async (req, res) => {
  try{
    const product = await Product.findById(req.query.id);

    if(product){
      res.status(200).json(product);
      return product;
    } else{
      res.status(404).json({error : "Product not found"});
    }
  } catch(error){
    res.status(500).json({error : error.message});
  }
}

const getProductByOwnerId = async (req, res) => {
  try {
    const products = await Product.find({ownerId: req.query.ownerId});
    if (products){
      res.status(200).json(products);
    } else{
      res.status(404).json({error: "Product not found"});
    }
  } catch (error){
    res.status(500).json({error: error.message});
  }
}

// const addProduct =  (req, res) => {
//   const product = new Product();
//   product.name = req.body.name;
//   product.description = req.body.description;
//   product.category = req.body.category;
//   product.gender = req.body.gender;
//   product.price = req.body.price;
//   product.ownerId = req.body.ownerId;
  
//   if(req.file && req.file.path){
//     product.image = req.file.path;
//   }

//   product.save()
//   .then(() => res.status(201).json({result : "product added successfully"}))
//   .catch((error) => res.status(500).json({error : error.message}));
// }
const addProductv2 = async(req,res) =>{
  try {
    const user =await User.exists({_id :req.body.ownerId});
    
    if(!user){
      return res.status(404).json({
        message : "User not Found"
      });
    }
      const product = new Product({
        name : req.body.name,
        description : req.body.description,
        category : req.body.category,
        gender : req.body.gender,
        price :req.body.price,
        ownerId :req.body.ownerId
      });

      if(req.file && req.file.path){
        product.image = req.file.path;
      }

      await product.save();
      res.status(200).json({
        message : product
      })
    }  catch (error) {
    res.status(404).json({
      status : 404, 
      error : "User Not Found"
    })
  }
}

// const addProduct =  async (req, res) => {
//   try{
//     const product = new Product();
//     product.name = req.body.name;
//     product.description = req.body.description;
//     product.category = req.body.category;
//     product.gender = req.body.gender;
//     product.price = req.body.price;
//     product.ownerId = req.body.ownerId;    
//     if(req.file && req.file.path){
//       product.image = req.file.path;
//     }
//     // Check if the ownerId exists in the users collection

//     const userExists = await User.exists({ _id: product.ownerId });
//     if (!userExists) {
//       return res.status(404).json({ error: 'User not found' });
//     } 
//       await product.save()
//       res.status(201).json({result : "product added successfully"});
//   } catch{
//     (error) => res.status(500).json({error : error.message})
//   };
// }

const updateProduct = async (req, res) => {

  const updatedProduct = {};

  if(req.body.name) updatedProduct.name = req.body.name;
  if(req.body.description) updatedProduct.description = req.body.description;
  if(req.body.category) updatedProduct.category = req.body.category;
  if(req.body.gender) updatedProduct.gender = req.body.gender;
  if(req.body.price) updatedProduct.price = req.body.price;

  if(req.file && req.file.path){
    updatedProduct.image = req.file.path;

    const oldProduct = await Product.findById(req.query.id);

    if(!oldProduct){
      return res.status(404).json({error : "Product not found"});
    }

    fs.unlinkSync(oldProduct.image);
  };

  try{
    const products = await Product.findByIdAndUpdate(req.query.id, updatedProduct, {new : true});
    res.status(200).json(products);
  }catch(error){
    res.status(500).json({error : error.message});
  }
}

const deleteProduct = async (req, res) => {
  try{
    const products = await Product.findByIdAndDelete(req.query.id);
    fs.unlinkSync(products.image);
    res.status(200).json({result : "Product deleted successfully"});
  } catch(error){
    res.status(500).json({error : error.message});
  }
}



const gender = async (req, res) => {
    try {
      // Query products from the database
      const products = await Product.find();
  
      // Categorize products by gender
      const categorizedProducts = {
        women: products.filter(product => product.gender === 'women'),
        men: products.filter(product => product.gender === 'men')
      };
      if(req.params.gender == "men")
      {
        return res.status(200).json(categorizedProducts.men);
      } else if (req.params.gender == "women")
      {
        return res.status(200).json(categorizedProducts.women);
      } else {
        return res.status(404).json({msg: "Gender not found"})
      }
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

const category = async (req, res) => {
    try {
      // Query products from the database
      const products = await Product.find();

      // Categorize products by category
      const categorizedProducts = {
        bags: products.filter(product => product.category === 'bags'),
        shoes: products.filter(product => product.category === 'shoes')
      };

      if(!categorizedProducts)
      {
        return res.status(404).json({msg: "Category not found"});
      }

      if(req.params.category == "bags")
      {
        return res.status(200).json(categorizedProducts.bags);
        
      } else if (req.params.category == "shoes")
      {
        return res.status(200).json(categorizedProducts.shoes);
      } else {
        return res.status(404).json({msg: "Category not found"})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const allProducts = async (req, res) => {
    try {
      // Query all products from the database
      const products = await Product.find();
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  module.exports = {
    search: searchByDesc,
    getProductById,
    getProductByOwnerId,
    updateProduct,
    deleteProduct,
    gender,
    category,
    allProducts,
    addProductv2
  }
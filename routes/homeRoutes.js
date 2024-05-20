const express = require('express');
const router =express.Router();
const multer = require("multer");
const path = require("path");

const homeController = require('../controllers/homeController');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, path.join(__dirname, "../images"));
    },
  
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + path.extname(file.originalname));
    }
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) =>{
      if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
        cb(null, true);
      } else {
        console.log("Image have to be with [jpg] or [png] or [jpeg] extention");
      }
    }
  });

router.get('/api/products/search',homeController.search);
router.get('/api/gender/:gender',homeController.gender);
router.get('/api/category/:category',homeController.category);
router.get('/api/products',homeController.allProducts);
router.get('/api/product/', homeController.getProductById );
router.delete('/api/product/', homeController.deleteProduct );
router.patch('/api/products/', upload.single("image"), homeController.updateProduct);

router.get('/api/', homeController.getProductByOwnerId );

router.post('/api/add/', upload.single("image"), homeController.addProductv2);


module.exports = router;
const express = require('express');
const router =express.Router();

const favouriteController = require('../controllers/favouriteController');


router.get('/api/favourite', favouriteController.getAllItemsByOwnerId);
router.post('/api/favourite', favouriteController.addToFavourite);
router.delete('/api/favourite', favouriteController.deleteitem);


module.exports = router;

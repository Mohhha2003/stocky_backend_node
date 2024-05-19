const mongoose =require("mongoose");


const favouriteSchema = new mongoose.Schema({
  productId : {
    type : String,
    required : true
  },

  ownerId : {
    type : String,
    required : true
  },
  name:{
      type: String,
      required:true
  },
  price:{
      type: Number,
      required:true
  },
});
  const Favourite = mongoose.model('Favourite', favouriteSchema);

  module.exports = Favourite;
  

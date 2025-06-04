const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    },
  price: {
      type: Number,
      required: true,
  },
  images:[{
      image:{
          type:String,
          required:true
      }
  }],
  category:{
      type: String,
      required: true
  },
  stock:{
    type:Number,
  }, 
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

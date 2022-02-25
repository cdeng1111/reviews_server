// designed for potential consideration

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review_id: { type: Number, unique: true, required: true },
  product_id: { type: Number, unique: true, required: true },
  rating: { type: Number },
  summary: { type: String },
  body: { type: String },
  response: { type: String },
  recommend: { type: Boolean },
  reported: { type: Boolean },
  helpfulness: { type: Number },
  date: { type: Date },
  photos: [
    {
      id: { type: Number },
      url: { type: String },
    },
  ],
});

const productSchema = mongoose.Schema({
  product_id: Number,
  reviews: [reviewSchema],
});

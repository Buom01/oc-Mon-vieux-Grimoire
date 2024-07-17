const mongoose = require('../mongoose');

const bookRatingSchema = mongoose.Schema({
  userId: {type: String, required: true},
  grade: {type: Number, required: true}
});

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [bookRatingSchema],
  averageRating: { type: Number, required: true }
});

bookSchema.pre(
  ['validate'],
  function (next)
  {
    if (this.ratings)
      this.averageRating = this.ratings.reduce((partialSum, {grade}) => (partialSum + grade), 0) / this.ratings.length;
    next();
  }
);

module.exports = mongoose.model('Book', bookSchema);
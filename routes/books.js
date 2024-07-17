const express = require('express');
const router = express.Router();
const multer = require('multer');
const Book = require('../things/book');

const upload = multer();
const auth = require('../middlewares/auth');
const createId = require('../middlewares/createId');
const getId = require('../middlewares/getId');
const {handleBookImageCreation, handleBookImageDestruction} = require('../middlewares/handleBookImage');
const getAverageRating = require('../middlewares/averageRating');


router.get(
  '/',
  async function(req, res, next)
  {
    try
    {
      res.json(await Book.find());
    }
    catch(error)
    {
      console.error(error);
      res.status(400).json({message: error.message})
    };
  }
);

router.get(
  '/bestrating',
  async function(req, res, next)
  {
    try
    {
      res.json(await (Book.find().sort({averageRating: -1}).limit(3)));
    }
    catch(error)
    {
      console.error(error);
      res.status(400).json({message: error.message})
    };
  }
);

router.get(
  '/:id',
  async function(req, res, next)
  {
    const id = req.params.id;

    try
    {
      res.json(await Book.findById(id));
    }
    catch(error)
    {
      console.error(error);
      res.status(400).json({message: error.message})
    };
  }
);

router.post(
  '/',
  auth,
  upload.single('image'),
  createId,
  handleBookImageCreation,
  async function(req, res, next)
  {
    try
    {
      const userId = req.auth.userId;
      const {title, author, year, genre, averageRating} = JSON.parse(req.body.book);
      
      const book = new Book({
        _id: req.id,
        userId,
        title,
        author,
        imageUrl: req.imageUrl,
        year,
        genre,
        ratings: [{
          userId,
          grade: averageRating
        }],
        averageRating
      });
      await book.save();

      res.status(201).json({message: 'Livre crée !'});
    }
    catch(error)
    {
      console.error(error);
      res.status(400).json({message: error.message})
    };
  }
);

router.put(
  '/:id',
  auth,
  upload.single('image'),
  getId,
  async function(req, res, next)
  {
    const {title, author, year, genre} = req.body.book ? JSON.parse(req.body.book) : req.body;

    try
    {
      const {matchedCount} = await Book.updateOne(
        {
          _id: req.id ?? null,
          userId: req.auth.userId
        },
        {
          title, author, year, genre,
          imageUrl: req.imageUrl
        }
      );
      if (matchedCount == 1)
        return next();
      else
        res.status(403).json({message: `Vous n'avez pas le droit de modifier ce livre`});
    }
    catch(error)
    {
      console.error(error);
      res.status(400).json({message: error.message})
    };
  },
  handleBookImageCreation,
  (req, res, next) => {
    res.status(200).json({message: 'Livre modifié !'});
  }
);


router.delete(
  '/:id',
  auth,
  getId,
  handleBookImageDestruction,
  async function(req, res, next)
  {
    try
    {
      const {deletedCount} = await Book.deleteOne({
        _id: req.id ?? null,
        userId: req.auth.userId
      });

      if (deletedCount == 1)
        res.status(200).json({message: 'Livre supprimé !'});
      else
        res.status(400).json({message: `Le livre n'a pas été supprimé`});
    }
    catch(error)
    {
      console.error(error);
      res.status(400).json({message: error.message})
    };
  }
);

router.post(
  '/:id/rating',
  auth,
  getId,
  async function(req, res, next)
  {
    const {rating} = req.body;
    const {userId} = req.auth; // @Présente-moi

    try
    {
      // @Présente-moi
      const doc = await Book.findById(req.id);

      const userRating = {
        userId,
        grade: rating
      };
      const ratings = [...doc.ratings, userRating];
      const averageRating = getAverageRating(ratings);

      const {modifiedCount} = await Book.updateOne(
        {$and: [{_id: req.id},{'ratings.userId': {'$ne': userId}}]},
        {
          $push: {
            ratings: userRating
          },
          averageRating
        }
      );

      if (modifiedCount == 1)
      {
        res.status(200).json({
          ...doc._doc,
          ratings,
          averageRating
        });
      }
      else
        res.status(400).json({message: `La note n'a pas pu être ajoutée`});
    }
    catch(error)
    {
      console.error(error);
      res.status(400).json({message: error.message})
    };
  }
);

module.exports = router;

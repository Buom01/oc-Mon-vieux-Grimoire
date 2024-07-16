var express = require('express');
var router = express.Router();
var Book = require('../things/book');

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

module.exports = router;

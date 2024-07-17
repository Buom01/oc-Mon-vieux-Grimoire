const sharp = require('sharp'); 
const fs = require('node:fs').promises;
const {backendHostname} = require('../config');

function pathFor(id)
{
  const imagePath = `/uploads/${id}.webp`;  // @Présente moi
  const imageRelativePath = '.' + imagePath;
  const imageUrl = `${backendHostname}${imagePath}`;

  return {imageRelativePath, imageUrl};
}

async function handleBookImageCreation(req, res, next)
{
  if (!req.file)
    return next();
  try
  {
    const {imageRelativePath, imageUrl} = pathFor(req.id);
    await sharp(req.file.buffer).rotate().webp({quality: 85}).toFile(imageRelativePath);

    req.imageUrl = imageUrl;
    next();
  }
  catch(error)
  {
    console.error(error);
    res.status(400).json({message: error.message})
  };
}

async function handleBookImageDestruction(req, res, next)
{
  try
  {
    const {imageRelativePath} = pathFor(req.id);
    await fs.unlink(imageRelativePath);

    next();
  }
  catch(error)
  {
    console.error(error);
    if (error.code === 'ENOENT')
      return next();
    res.status(400).json({message: error.message});
  };
}

module.exports = {
  handleBookImageCreation,
  handleBookImageDestruction
};
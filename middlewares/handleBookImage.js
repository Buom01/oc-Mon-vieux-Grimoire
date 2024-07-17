const sharp = require('sharp'); 
const {backendHostname} = require('../config');

module.exports = async function(req, res, next)
{
  console.log('book image');
  if (!req.file)
    return next();
  try
  {
    const imagePath = `/uploads/${req.id}.webp`;  // @Présente moi
    const imageRelativePath = '.' + imagePath;
    const imageUrl = `${backendHostname}${imagePath}`;

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
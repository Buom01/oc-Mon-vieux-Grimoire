const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../things/user');
const {jwtToken} = require('../middlewares/auth');

router.post(
  '/signup',
  async function(req, res, next)
  {
    const {email, password} = req.body;

    try
    {
      const hashedPassword = password && await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword
      });

      await user.save();
      res.status(201).json({message: 'Utilisateur crée !'});
    }
    catch(error)
    {
      console.error(error);
      res.status(400).json({message: error.message})
    };
  }
);

router.post(
  '/login',
  async function(req, res, next)
  {
    const {email, password} = req.body;

    try
    {
      const user = await User.findOne({email});

      if (!user || !password || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({message: "Paire login/mot de passe incorrecte"});

      res.status(200).json({
        userId: user._id,
        token: jwt.sign(
          {userId: user._id},
          jwtToken,
          {expiresIn: '24h'}
        )
      });
    }
    catch(error)
    {
      console.error(error);
      res.status(400).json({error})
    };
  }
);

module.exports = router;

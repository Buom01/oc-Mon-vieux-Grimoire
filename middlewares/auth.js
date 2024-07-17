const jwt = require('jsonwebtoken');
const {jwtSecretKey} = require('../config');

const auth = (req, res, next) => {
   try {
        const [authType, token] = req.headers.authorization.split(' ');
        if (authType !== 'Bearer')
            throw new Error('Unsupported authentication method');

       const decodedToken = jwt.verify(token, jwtSecretKey);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};

module.exports = auth;
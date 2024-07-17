const jwt = require('jsonwebtoken');

const jwtToken = 'RANDOM_DEV_SECRET_KEY';

const auth = (req, res, next) => {
   try {
        const [authType, token] = req.headers.authorization.split(' ');
        if (authType !== 'Bearer')
            throw new Error('Unsupported authentication method');

       const decodedToken = jwt.verify(token, jwtToken);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};

module.exports = {jwtToken, auth};
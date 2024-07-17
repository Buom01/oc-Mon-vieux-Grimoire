const { default: mongoose } = require('mongoose');

module.exports = (req, res, next) => {
    req.id = new mongoose.Types.ObjectId()
	next();
};
function getAverageRating(ratings)
{
    return ratings.reduce((partialSum, {grade}) => (partialSum + grade), 0) / ratings.length;
}

module.exports = getAverageRating;
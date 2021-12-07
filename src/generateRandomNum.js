function generateRandomInRange(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}

module.exports.generateRandomInRange = generateRandomInRange;
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var { getRandomSong, isValidUrl } = require(process.cwd() + '/src/generateRandomSong');

let originalUrl;
let randomSong;

router.post('/', urlencodedParser, async (req, res, next) => {
    originalUrl = req.body.url;

    if (!isValidUrl(originalUrl)) {
        res.json({error: 'invalid url'}); 
        return;
    };

    randomSong = await getRandomSong();
    res.send({original_url: req.body.url, short_url: randomSong});
})

router.get('/songName', (req, res, next) => {
    if (!randomSong) throw 'no url generated';
    res.redirect(originalUrl);
})

module.exports = router;
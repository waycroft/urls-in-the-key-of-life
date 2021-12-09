var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var { getRandomSong, isValidUrl } = require(process.cwd() + '/src/generateRandomSong');

let originalUrl;
let randomSong;

var { Redirect } = require(process.cwd() + '/data/models/redirects');

router.post('/', urlencodedParser, async (req, res, next) => {
    originalUrl = req.body.url;

    if (!isValidUrl(originalUrl)) {
        res.json({error: 'invalid url'}); 
        return;
    };

    randomSong = await getRandomSong();

    let newRedirect = new Redirect({
        _id: randomSong,
        original_url: originalUrl,
    });
    newRedirect.save()
    .then(() => {
        console.log('new Redirect saved with _id:', randomSong);
    });

    res.send({original_url: req.body.url, short_url: randomSong});
})

router.get('/:shortUrl', async (req, res, next) => {
    let songName = req.params.shortUrl;
    console.log(songName);
    let doc = await Redirect.findById(songName).lean();
    res.redirect(doc.original_url);
})

module.exports = router;
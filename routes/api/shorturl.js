var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var { isValidUrl } = require(process.cwd() + '/src/generateRandomSong');
var { generateRandomInRange } = require(process.cwd() + '/src/generateRandomNum');

let originalUrl;

var { Redirect } = require(process.cwd() + '/data/models/redirects');

router.post('/', urlencodedParser, async (req, res, next) => {
    originalUrl = req.body.url;

    if (!isValidUrl(originalUrl)) {
        res.json({error: 'invalid url'}); 
        return;
    };

    let randomInt = generateRandomInRange(100, 0);

    let updateOp = await Redirect.updateOne({_id: randomInt}, {original_url: originalUrl}, {upsert:true});
    console.log(updateOp);

    res.send({original_url: req.body.url, short_url: randomInt});
})

router.get('/:shortUrl', async (req, res, next) => {
    let songName = req.params.shortUrl;
    console.log(songName);
    let doc = await Redirect.findById(songName).lean();
    res.redirect(doc.original_url);
})

module.exports = router;
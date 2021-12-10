var express = require('express');
var router = express.Router();
var dns = require('dns');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended: false})
var { getRandomSong } = require(process.cwd() + '/src/generateRandomSong');
var { isValidUrl } = require(process.cwd() + '/src/validateUrl');

let originalUrl;

var { Redirect } = require(process.cwd() + '/data/models/redirects');

router.post('/', urlencodedParser, async (req, res, next) => {
    originalUrl = req.body.url;
    console.log('input URL:', originalUrl);

    try {
        if (!isValidUrl(originalUrl)) {
            throw 'invalid url';
        };   

        let randomSong = await getRandomSong();

        let updateOp = await Redirect.updateOne({_id: randomSong}, {original_url: originalUrl}, {upsert:true});
        console.log(updateOp);
    
        res.send({original_url: originalUrl, short_url: randomSong});

    } catch (error) {
        console.log(error);
        res.json({error: error});
    }
})

router.get('/:shortUrl', async (req, res, next) => {
    console.log('original url:', req.originalUrl);
    let songName = req.params.shortUrl;
  
    let doc = await Redirect.findById(songName).lean();
  
    res.redirect(doc.original_url);
})

module.exports = router;
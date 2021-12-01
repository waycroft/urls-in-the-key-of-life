var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var fs = require('fs');
var random = require(process.cwd() + '/src/generateRandomNum');

// todo: fix generateRandomNum
// choose a random song name
// assign it to the incoming URL
// actually make it go the the URL

var songList = fs.readFileSync('./data/song-list.json', 'utf-8', (err, data) => {
    return JSON.parse(data)["list"];
})

router.post('/', urlencodedParser, (req, res, next) => {
    res.json({url: req.body.url, json: songList});
})

router.get('/', (req, res, next) => {
    res.send(songList);
})

module.exports = router;
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var fsPromises = require('fs/promises');
var random = require(process.cwd() + '/src/generateRandomNum');
const songList = './data/song-list.json';

let originalUrl;
let randomSong;

// actually make it go the the URL

async function getRandomSong() {
    let songList = await getSongList();
    let index = random.generateRandomInRange(songList.length, 0);

    return String(songList[index]).toLocaleLowerCase();
}

async function getSongList() {
    let promise = fsPromises.readFile(songList, 'utf-8');
    let data = await promise;
    return JSON.parse(data);
} 

function isValidUrl(string) {
    let match = string.match(/https?:\/\/[A-Za-z]+\.[A-Za-z]+/g);
    console.log(match);
    return !!match;
}

router.get('/', async (req, res, next) => {
    res.send(await getRandomSong());
})

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
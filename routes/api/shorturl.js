var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var fsPromises = require('fs/promises');
var random = require(process.cwd() + '/src/generateRandomNum');
const songList = './data/song-list.json';

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

router.get('/', async (req, res, next) => {
    res.send(await getRandomSong());
})

router.post('/', urlencodedParser, async (req, res, next) => {
    res.send({url: req.body.url, json: await getRandomSong()});
})

module.exports = router;
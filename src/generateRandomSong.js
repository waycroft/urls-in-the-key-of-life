var fsPromises = require('fs/promises');
var random = require(process.cwd() + '/src/generateRandomNum');
const songList = './data/song-list.json';

exports.getRandomSong = async () => {
    let songList = await getSongList();
    let index = random.generateRandomInRange(songList.length, 0);

    return String(songList[index]).toLocaleLowerCase();
}

async function getSongList() {
    let promise = fsPromises.readFile(songList, 'utf-8');
    let data = await promise;
    return JSON.parse(data);
} 
exports.getSongList = getSongList;
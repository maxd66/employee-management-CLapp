// useful selects

// SELECT *
// FROM top5000
// GROUP BY artist
// HAVING COUNT(*) > 1;

// SELECT top5000.position, top5000.artist, top5000.song, top5000.year, top_albums.album FROM top5000 INNER JOIN top_albums
//     on top_albums.artist = top5000.artist AND top_albums.year = top5000.year WHERE top5000.artist = 'U2';

class Callback {

}

module.exports = Callback;
// Setup
const recordCollection = {
  2548: {
    albumTitle: 'Slippery When Wet',
    artist: 'Bon Jovi',
    tracks: ['Let It Rock', 'You Give Love a Bad Name']
  },
  2468: {
    albumTitle: '1999',
    artist: 'Prince',
    tracks: ['1999', 'Little Red Corvette']
  },
  1245: {
    artist: 'Robert Palmer',
    tracks: []
  },
  5439: {
    albumTitle: 'ABBA Gold'
  }
};

// Only change code below this line
function updateRecords(records, id, prop, value) {
  if (records.hasOwnProperty(id) === false) {
      records[id] = [id, prop, value];
    }
  if (value === "") {
    delete records[id][prop];
  } else if (prop !== "tracks" && value !== "") {
    if (records[id].hasOwnProperty(prop) === false) {
      records[id][prop] = "";
    }
    records[id][prop] = value;
  } else if (prop === "tracks" && value !== "") {
    if (records[id].hasOwnProperty("tracks") === false) {
      records[id][prop] = [];
    }
    records[id][prop].push(value);
  }
  return records;
}

updateRecords(recordCollection, 5439, 'artist', 'ABBA');

updateRecords(recordCollection, 1111, 'artist', 'Taylor Swift');
updateRecords(recordCollection, 1111, 'albumTitle', '1989');
updateRecords(recordCollection, 1111, 'releaseDate', '2014');
updateRecords(recordCollection, 1111, 'tracks', 'Welcome to New York');
updateRecords(recordCollection, 1111, 'tracks', 'Blank Space');
updateRecords(recordCollection, 1111, 'tracks', 'Style');
updateRecords(recordCollection, 1111, 'tracks', 'Our we Out of the Woods?');
updateRecords(recordCollection, 1111, 'tracks', 'All you had to do was Stay');
updateRecords(recordCollection, 1111, 'tracks', 'Shake it off');
updateRecords(recordCollection, 1111, 'tracks', 'Bad Blood');
updateRecords(recordCollection, 1111, 'tracks', 'Wildest Dreams');
updateRecords(recordCollection, 1111, 'gold', true);
updateRecords(recordCollection, 1111, 'releaseOrder', 5);

console.log(recordCollection[1111])
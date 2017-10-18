const login = require('facebook-chat-api');
const fs = require('fs');
const SelfReloadJSON = require('self-reload-json');

let db = new SelfReloadJSON('database.json');

const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));

console.log('Database loaded');
console.log(db);

login({
  email: credentials.username,
  password: credentials.password
}, (err, api) => {
  if (err) return console.error(err);

  console.log('Bot started');
  // reply when i talk to myself
  api.setOptions({
    selfListen: true
  });

  /* activate to get threadinfo
  api.getThreadList(0, 10, 'inbox', (err, arr) => {
    console.log(arr);
  });
  */

  api.listen((err, message) => {
    // send message with media
    function sendMedia(title, media) {
      console.log(`Replying with ${title} and ${media}`);
      api.sendMessage({
        url: media
      }, message.threadID);
    }

    // reacto to message with heart eyes
    function sendReaction() {
      api.setMessageReaction(':heart_eyes:', message.messageID, (err) => {
        if (err) return console.error(err);
      });
    }

    // loop through songs array
    for (let song = 0; song < db.songs.length; song++) {
      // loop through each song's search queries
      for (let query = 0; query < db.songs[song].queries.length; query++) {
        // test if regex matches
        if (RegExp(`(^|\\s)["']?${db.songs[song].queries[query]}[.!?]?["']?[.]?(?!\\S)`, 'i').test(message.body)) {
          console.log(`Message received: ${message.body}`);
          // call video file with random media file
          sendMedia(db.songs[song].title, db.songs[song].media[Math.floor(Math.random() * db.songs[song].media.length)]);
          // react to message
          sendReaction();
        }
      }
    }
  });
});

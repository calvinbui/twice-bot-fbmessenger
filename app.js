const login = require('facebook-chat-api');
const fs = require('fs');
const SelfReloadJSON = require('self-reload-json');
const request = require('request');
var CronJob = require('cron').CronJob;

var db = JSON.parse(fs.readFileSync('database.json', 'utf8'));
var peopletoIgnore = JSON.stringify(db.ignoreMessagesFrom);
const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));

console.log('Database loaded');
console.log(db);

login({
  email: credentials.username,
  password: credentials.password
}, (err, api) => {
  if (err) {
    process.exit(1);
  }

  var job = new CronJob('0 * * * * *', function() { // every minute
    request('https://raw.githubusercontent.com/calvinbui/twice-bot-fbmessenger/master/database.json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        db = JSON.parse(body);
        peopletoIgnore = JSON.stringify(db.ignoreMessagesFrom);
        console.log('Updated database.json');
        console.log(db)
      }
    })
  }, true, 'Australia/NSW');

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
    if (err) {
      process.exit(1);
    }
    // send message with media
    function sendMedia(title, media) {
      // returns -1 if the person is not on the ignore list
      console.log(`Replying with ${title} and ${media} to ${message.senderID}`);
      api.sendMessage({
        url: media
      }, message.threadID);
    }

    // reacto to message with heart eyes
    function sendReaction() {
      api.setMessageReaction(':heart_eyes:', message.messageID, (err) => {
        if (err) {
          process.exit(1);
        }
      });
    }

    if (peopletoIgnore.indexOf(message.senderID) === -1) {
      if (err) {
        process.exit(1);
      }
      // loop through songs array
      for (let song = 0; song < db.songs.length; song++) {
        // loop through each song's search queries
        for (let query = 0; query < db.songs[song].queries.length; query++) {
          // test if regex matches
          if (RegExp(`(^|\\s)["']?${db.songs[song].queries[query]}[.!?]?["']?[,.]?(?!\\S)`, 'i').test(message.body)) {
            console.log(`Message received: ${message.body}`);
            // call video file with random media file
            sendMedia(db.songs[song].title, db.songs[song].media[Math.floor(Math.random() * db.songs[song].media.length)]);
            // react to message
            sendReaction();
          }
        }
      }
    } else {
      console.log(`Ignoring match from ${message.senderID}`);
    }
  });
});

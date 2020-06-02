const yaml = require('js-yaml');
const login = require('facebook-chat-api');
const fs = require('fs');

const db = yaml.safeLoad(fs.readFileSync('database.yaml', 'utf8'));
const peopleToIgnore = JSON.stringify(db.ignoreMessagesFrom);

console.log('Database loaded');
console.log(db);

login({
  email: process.env.fb_username,
  password: process.env.fb_password,
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
}, (err, api) => {
  if (err) {
    process.exit(1);
  }

  console.log('Bot started');
  // reply when i talk to myself
  api.setOptions({
    listenEvents: true,
    selfListen: true,
    // Choose from either `"silly"`, `"verbose"`, `"info"`, `"http"`, `"warn"`, `"error"`, or `"silent"`.
    logLevel: "http"
  });

  /* activate to get threadinfo
  api.getThreadList(0, 10, 'inbox', (err, arr) => {
    console.log(arr);
  });
  */

  api.listenMqtt((err, message) => {
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

    // react to message with heart eyes
    function sendReaction() {
      api.setMessageReaction(':heart_eyes:', message.messageID, (err) => {
        if (err) {
          process.exit(1);
        }
      });
    }

    if (peopleToIgnore.indexOf(message.senderID) === -1) {
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
            // react to message
            // sendReaction();
            // return random media file from db
            sendMedia(db.songs[song].title, db.songs[song].media[Math.floor(Math.random() * db.songs[song].media.length)]);
            break;
          }
        }
      }
    } else {
      console.log(`Ignoring match from ${message.senderID}`);
    }
  });
});

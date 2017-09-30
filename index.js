var login = require("facebook-chat-api");
var fs = require('fs');
var db = JSON.parse(fs.readFileSync('database.json', 'utf8'));

login({email: "", password: ""}, (err, api) => {
  if(err) return console.error(err);

  api.setOptions({
    selfListen: true
  });

  api.listen((err, message) => {

    function video(videoname, link) {
      console.log("Replying with " + videoname + " and " + link);
      api.sendMessage({
        url: link
        }, message.threadID
      );
    }

    for (song in db.songs) {
      for (query in db.songs[song].queries) {
        var regexp = new RegExp("\\b" + db.songs[song].queries[query] + "\\b", 'i');
        if (regexp.test(message.body)) {
          video(db.songs[song].title, db.songs[song].media[Math.floor(Math.random()*db.songs[song].media.length)])
        }
      }
    }

  });
});

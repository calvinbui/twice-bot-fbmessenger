const login = require("facebook-chat-api");

// strings to match
const tt = /\btt\b/i
const tabletennis = /\btable tennis\b/i
const knockknock = /\bknock knock\b/i
const ohah = /\boh+ ah+\b/i
const signal = /\bsignal\b/i
const cheerup = /\bcheer up\b/i
const touchdown = /\btouchdown\b/i
const td = /\bTD\b/i

login({email: "", password: ""}, (err, api) => {
  if(err) return console.error(err);

  api.setOptions({
    selfListen: true
  });

  api.listen((err, message) => {
    console.log(message);

    function video(videoname, link) {
      console.log("Replying with " + videoname);
      api.sendMessage({
        url: link
        }, message.threadID
      );
    }

    if (tt.test(message.body) || tabletennis.test(message.body)) { video("TT", "https://youtu.be/ePpPVE-GGJw?t=27s") }
    else if (knockknock.test(message.body)) { video("Knock Knock", "https://youtu.be/8A2t_tAjMz8") }
    else if (cheerup.test(message.body)) { video("Knock Knock", "https://youtu.be/c7rCyll5AeY") }
    else if (ohah.test(message.body)) { video("Like OOH-AHH", "https://youtu.be/0rtV5esQT6I") }
    else if (signal.test(message.body)) { video("Signal", "https://youtu.be/VQtonf1fv_s?t=35s") }
    else if (touchdown.test(message.body) || td.test(message.body)) { video("Touchdown", "https://youtu.be/N1oYWMGeUTY") }

  });
});

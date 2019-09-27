# TWICE Facebook Messenger Bot

This bot replies to Facebook Messenger messages with TWICE videos/gifs/links at random when the message received matches a regular expression (regex).

The bot is written in Node.js and also runs in a Docker container.

## Requirements
-   NodeJS or Docker

## Docker

Recommended

```
docker run -d -e fb_username=myemail@facebook.com -e fb_password=easytoguess calvinbui/twice-bot-fbmessenger twice
```

## NodeJS
1.  Export environment variables `fb_username` and `fb_password`
2.  Update the database as needed
3.  Run `npm install` to get all dependencies
4.  Run the script with `node app.js`.

## Updating the database
The database is a JSON file with an entry per song.
-   Queries: comma-separated regex expressions to match in messages
-   Media: comma-separated list of URLs to send (at random) when a query match occurs

## Regex Setting
The regular expression by default matches:
*   Any single or double quotes before or after the word
*   Any exclamation after the word
*   Any periods after the word
*   Any question-marks after the word
*   A combination of the above (within normal limits...)
*   Case-insensitively

## TODO
-   Support two-factor authentication
-   Whitelisting users
-   Blacklisting/Whitelisting threads

## Where to get videos:
* https://www.youtube.com/user/mnetMPD
* https://www.youtube.com/user/LOENENT
* https://www.youtube.com/user/KBSKpop
* https://www.youtube.com/user/kbsworld
* https://www.youtube.com/user/MBCkpop
* https://www.youtube.com/user/jypentertainment
* https://www.youtube.com/user/imbcevery1
* https://www.youtube.com/user/tvpeopleclips
* https://www.youtube.com/user/imbcmusic
* https://www.youtube.com/user/Mnet

# Have some Tzuyu GIFS

![](https://media.giphy.com/media/l3vQXTEZCTSc9077y/giphy.gif)

![](https://media1.tenor.com/images/81ad1336f157f701924784a5a8578ab2/tenor.gif?itemid=7822248)

![](http://i.imgur.com/PujI2OB.gif)

![](https://media1.tenor.com/images/2b11973db9af4c00b234bd1d60991f20/tenor.gif?itemid=7167810)

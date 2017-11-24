# TWICE Facebook Messenger Bot

This bot replies to Facebook Messenger messages with TWICE videos/gifs/links at random when the message received matches a regular expression (regex).

The bot is written in Node.js and also runs in a Docker container.

## Requirements
-   NodeJS or Docker

## Usage
### NodeJS
1.  Create a copy of `credentials.json.default` to `credentials.json`
2.  Update `credentials.json` with your Facebook credentials
3.  Update the database as needed
4.  Run `npm install` to get all dependencies
5.  Run the script with `node app.js`. Use PM2/Forever to restart on errors.

### Docker
1.  Create a copy of `credentials.json.default` to `credentials.json`
2.  Update `credentials.json` with your Facebook credentials
3.  Run `docker build -t twice_bot .` to build the Docker image
4.  Run `docker run -d twice_bot` to start a container from the image as a daemon

### Updating the database
The database is a JSON file with an entry per song.
-   Queries: comma-separated regex expressions to match in messages
-   Media: comma-separated list of URLs to send (at random) when a query match occurs

#### Regex Setting
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

# Have some Tzuyu GIFS

![](https://media.giphy.com/media/l3vQXTEZCTSc9077y/giphy.gif)

![](https://media1.tenor.com/images/81ad1336f157f701924784a5a8578ab2/tenor.gif?itemid=7822248)

![](http://i.imgur.com/PujI2OB.gif)

![](https://media1.tenor.com/images/2b11973db9af4c00b234bd1d60991f20/tenor.gif?itemid=7167810)
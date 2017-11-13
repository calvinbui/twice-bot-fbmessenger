#!/bin/bash
docker run -d \
  --name twice_bot_fbmessenger \
  -v "$PWD":/usr/src/app \
  -w /usr/src/app \
  node:latest \
  /bin/bash -c "npm install && node app.js" \
  --restart unless-stopped

#!/bin/bash
# For building and testing locally

git pull

docker rm --force twice

docker build -t twice .

docker run -d \
--restart unless-stopped \
--name twice
-v credentials.json:/twice/credentials.json \
twice

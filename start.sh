#!/bin/bash

# download the image
docker pull calvinbui/twice-bot-fbmessenger

# delete old image
docker rm --force twice || true

# run new image with credentials
docker run -d \
--restart unless-stopped \
--name twice \
-v "$(pwd)"/credentials.json:/twice/credentials.json \
calvinbui/twice-bot-fbmessenger

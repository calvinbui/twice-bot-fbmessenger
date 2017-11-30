#!/bin/bash

docker rm --force twice

docker build -t twice .

docker run -d --restart unless-stopped --name twice twice
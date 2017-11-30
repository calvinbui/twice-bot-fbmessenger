FROM node:latest

# Bundle APP files
RUN mkdir twice && cd twice
COPY . .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install -g --production
RUN npm install pm2 -g

CMD ["pm2-docker", "app.js"]
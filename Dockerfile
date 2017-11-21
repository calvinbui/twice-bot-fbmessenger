FROM node:latest

# Bundle APP files
COPY app.js .
COPY package.json .
COPY credentials.json .
COPY database.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install -g --production
RUN npm install pm2 -g

CMD ["pm2-docker", "app.js"]
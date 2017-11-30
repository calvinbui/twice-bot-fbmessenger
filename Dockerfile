FROM node:latest

# Bundle APP files
COPY . .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install -g --production
RUN npm install pm2 -g
RUN npm install pm2-auto-pull -g
RUN pm2 set pm2-auto-pull:interval 60000

CMD ["pm2-docker", "app.js"]
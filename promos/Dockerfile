FROM node:22
# Bundle APP files
WORKDIR /app
COPY package.json .
COPY pm2.config.js .
RUN npm install -g serve
# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

COPY . .
# Show current folder structure in logs
RUN ls -al -R
EXPOSE 3000
#RUN pm2 update
CMD ["serve", "-s", "build", "-l", "3000"]



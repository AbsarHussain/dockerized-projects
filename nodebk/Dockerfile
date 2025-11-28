FROM <account_id>.dkr.ecr.<account_region>.amazonaws.com/nodejsbase:latest
#FROM node:18-alpine
# Bundle APP files
WORKDIR /app
COPY package.json .
COPY pm2.config.js .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production  && npm install ts-jest

COPY . .
# Show current folder structure in logs
RUN ls -al -R

#RUN pm2 update
CMD [ "npm", "start" ]


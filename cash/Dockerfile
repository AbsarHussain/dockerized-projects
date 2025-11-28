FROM <account_id>.dkr.ecr.<account_region>.amazonaws.com/node:20.9.0-amd64

WORKDIR /usr/src/app

COPY package.json ./

COPY ecosystem.config.js ./

COPY . .

RUN npm i

RUN npm install -g pm2

EXPOSE 3000

CMD [ "npm","start"]


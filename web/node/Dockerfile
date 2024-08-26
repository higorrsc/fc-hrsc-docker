FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

EXPOSE 3000

RUN npm install

COPY . .

CMD [ "node", "index.js" ]

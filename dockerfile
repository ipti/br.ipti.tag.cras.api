FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG dbName
ARG dbUser
ARG dbHost
ARG dbPassword

EXPOSE 3000
CMD [ "npm", "start" ]

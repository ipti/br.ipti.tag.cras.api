FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

RUN ls -a

ARG dbName
ARG dbUser
ARG dbHost
ARG dbPassword

EXPOSE 3000
CMD [ "npm", "run", "start" ]

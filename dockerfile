FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

# RUN npm run build

COPY . .

# RUN npm start

# CMD [ "npm", "start" ]

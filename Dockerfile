FROM node:latest AS development

WORKDIR /home/api

COPY --from=builder /home/api ./

CMD [ "npm", "run", "start:dev" ]

FROM node:latest AS builder

WORKDIR /home/api

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

COPY . .

RUN npm run build

FROM node:latest as production

WORKDIR /home/api

COPY --from=builder /home/api ./

EXPOSE 3000

CMD [  "npm", "run", "start:migrate:prod" ]
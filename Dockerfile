FROM node:20 AS development

WORKDIR /home/api

COPY --from=builder /home/api ./

CMD [ "npm", "run", "start:dev" ]

FROM node:20 AS builder

WORKDIR /home/api

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:20 AS production

WORKDIR /home/api

ENV PORT=80

COPY --from=builder /home/api ./

EXPOSE 80

CMD ["/bin/sh", "-c", "npx prisma migrate deploy && node dist/main"]
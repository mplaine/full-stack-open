FROM node:21.6.1-alpine

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --only=production

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["npm", "run", "start"]

FROM node:21.6.1
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --only=production
USER node
CMD npm run start

# Build stage
FROM node:21.6.1 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only=production

ENV REACT_APP_BACKEND_URL http://localhost:3000

RUN npm run build


# Serve stage
FROM nginx:1.25.3-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

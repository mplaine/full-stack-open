# Build stage
FROM node:21.6.1-alpine AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

ARG BACKEND_URL

ENV REACT_APP_BACKEND_URL ${BACKEND_URL}

RUN npm run build


# Test stage
FROM build-stage AS test-stage

ENV CI true

RUN npm run test


# Serve stage
FROM nginx:1.25.3-alpine

COPY --from=test-stage /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

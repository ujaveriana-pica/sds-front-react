ARG TAG=lts-alpine
FROM node:$TAG AS builder
WORKDIR /usr/src/
ARG ENVI=prod
COPY package.json .
COPY public public
COPY src src
RUN npm install
RUN npm run build
FROM nginx:1.21.4-alpine
EXPOSE 80
ENV FRONT_OFFICE_HOST localhost
ENV FRONT_OFFICE_PORT 8080
COPY  --from=builder  /usr/src/build/ /usr/share/nginx/html/
COPY nginx/default.conf.template /etc/nginx/templates/
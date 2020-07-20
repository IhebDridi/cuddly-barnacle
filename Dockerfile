FROM node:alpine
ENV PORT=4000
ENV MONGODB="mongodb://mongo:27017/test"
ENV SECRET="secretKey"

WORKDIR /var/api

COPY ./package.json ./
COPY ./package-lock.json ./
RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*
RUN npm install
COPY ./api ./api
COPY ./app.js ./
COPY ./server.js ./

EXPOSE 4000
CMD ["npm", "start"]
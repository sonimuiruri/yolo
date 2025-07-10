
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM alpine:3.16.7

WORKDIR /app

RUN apk update && apk add nodejs npm

COPY --from=build /usr/src/app /app

EXPOSE 3000

CMD ["npm", "start"]
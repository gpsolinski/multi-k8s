FROM node:alpine
WORKDIR /app
RUN apk update && apk add postgresql-client
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 5000
CMD ["yarn", "start"]
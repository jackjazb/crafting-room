FROM node:alpine

WORKDIR /usr/src/frontend

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build
CMD ["yarn", "start"]
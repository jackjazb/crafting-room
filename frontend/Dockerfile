FROM node:18.19.0-alpine as build

ENV NODE_ENV production

WORKDIR /crr/frontend

COPY .yarn .yarn
COPY .yarnrc.yml .
COPY yarn.lock .
COPY frontend/ .

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]

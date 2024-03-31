FROM node:18.19.0-alpine as build

ENV NODE_ENV production

WORKDIR /crr/cms

COPY .yarn .yarn
COPY .yarnrc.yml .
COPY yarn.lock .
COPY cms/ .

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]

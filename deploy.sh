export NODE_ENV='production'

npm i -g pm2

pm2 stop all

yarn install

yarn cms-build

# build the cms first to allow SSG generation on frontend build
pm2 start ecosystem.config.cjs --only cms

yarn frontend-build

pm2 start ecosystem.config.cjs --only frontend

pm2 save

export NODE_ENV=''

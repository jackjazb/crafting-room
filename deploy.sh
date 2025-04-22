export NODE_ENV='production'

npm i -g pm2

pm2 stop all

pnpm run install

pnpm run cms-build

# build the cms first to allow SSG generation on frontend build
pm2 start ecosystem.config.cjs --only cms

pnpm run frontend-build

pm2 start ecosystem.config.cjs --only frontend

pm2 save

export NODE_ENV=''

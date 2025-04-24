rm -fr dist/cms && pnpm --filter=cms deploy dist/cms
cp cms/.env dist/cms/.env

mv dist/cms/dist/build/ dist/cms/
mv dist/cms/dist/config/ dist/cms/
mv dist/cms/dist/src/ dist/cms/

rm -fr dist/cms/dist

exit

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

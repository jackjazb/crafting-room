# npm i -g pm2
yarn cms-build
pm2 start ecosystem.config.js --only cms
yarn frontend-build
pm2 start ecosystem.config.js

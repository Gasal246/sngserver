### Start Dev Server
- copy .env.sample and paste to src/env/.env

# If you are using `yarn`
- yarn install
- yarn prepare
- yarn run dev

# If you are using `npm`
- npm install
- npm run dev

### Production Time
- build the projet: 
    * copy .env to ./src/env folder
    * `npm run build`
    * pm2 monitor pm2.json
    * pm2 start pm2.json


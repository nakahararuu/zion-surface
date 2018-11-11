# Zion-Surface

a video explore for ちゃアニ

Note: Currently, Zion-Surface is PoC project. it doesn't use actually ちゃアニ backend API. We need to replace legacy it.

## Build Setup
for development:
``` bash
# install dependencies
$ npm install # Or yarn install

# launch mock backend server
$ npm run mock

# serve with hot reload at localhost:3000
$ npm run dev

# Optional: If you want to use ServiceWorker on localhost
# you have to exec the following command instead of "npm run dev"
$ npm run build
$ npm start
```

for production:

``` bash
# update web server config
$ vim Caddyfile
$ cat Caddyfile
zion.example.com {
  proxy / node:3000
}

# build for production and launch service
$ docker-compose up
$ curl https://zion.example.com
```

## Feature
- an alternative web client for ちゃアニ
    - as PWA
    - with SSR
- automatic HTTPS


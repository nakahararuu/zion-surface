# Zion-Surface

a video explore for ちゃアニ

Note: Currently, Zion-Surface is PoC project. it doesn't use actually ちゃアニ backend API. We need to replace legacy it.

## Build Setup
``` bash
# run dev server on http://localhost:2015
$ cp .env.default .env
$ docker-compose up

# run prodution server on http://example.xyz:80 and https://example.xyz:443
# (http://example.xyz:80 points to https://example.xyz:443)
$ cp .env.default .env
$ vim .env
$ head -2 .env
# Web Server config
HOST_NAME=example.xyz
$ docker-compose -f docker-compose.yml up
```

## Feature
- an alternative web client for ちゃアニ
    - as PWA
    - with SSR
- automatic HTTPS


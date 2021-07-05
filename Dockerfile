FROM node:14.15.1-stretch-slim AS build

WORKDIR /src
COPY . .

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

RUN npm install

ARG BuildEnv

RUN npm run build:${BuildEnv} 

FROM caddy:2.1.1-alpine
COPY --from=build /src/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /src/build /usr/share/caddy
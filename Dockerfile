FROM node:15.12.0-alpine3.10

RUN npm i -g npm
WORKDIR /usr/app

RUN mkdir ./dev
COPY package* ./dev 
COPY yarn.lock ./dev

WORKDIR /usr/app/dev

RUN yarn install

# copy after yarn for cashe
COPY src ./src

CMD yarn dev


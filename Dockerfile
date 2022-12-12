FROM node:16

WORKDIR /frontend

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY . .

EXPOSE 8080

CMD [ "yarn", "build" ]
CMD [ "yarn", "serve" ]
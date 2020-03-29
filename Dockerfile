FROM replco/prybar as prybar
LABEL stage=intermediate
WORKDIR /gocode/src/github.com/replit/prybar

FROM node:12.2.0-alpine as dependencies
LABEL stage=intermediate
ARG NODE_ENV
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM node:stretch
WORKDIR /app
COPY . .
EXPOSE 2000
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=prybar /gocode/src/github.com/replit/prybar/prybar-nodejs ./prybar-nodejs
CMD ["sh", "run.sh"]
CMD ["sh", "run.sh"]
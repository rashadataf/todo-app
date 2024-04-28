FROM node:20 AS base

ARG APP_WORKDIR
ARG NODE_ENV_DEVELOPMENT
ARG NODE_ENV_PRODUCTION

WORKDIR $APP_WORKDIR

COPY package.json ./

COPY yarn.lock ./

COPY . .

RUN yarn cache clean

RUN yarn install


FROM base AS development

ENV NODE_ENV=$NODE_ENV_DEVELOPMENT


FROM base AS production

ENV NODE_ENV=$NODE_ENV_PRODUCTION

RUN yarn build
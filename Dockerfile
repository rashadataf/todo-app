FROM node:20 AS base

ARG APP_WORKDIR
ARG NODE_ENV_DEVELOPMENT
ARG NODE_ENV_PRODUCTION

WORKDIR $APP_WORKDIR

COPY package.json ./

COPY yarn.lock ./

COPY .yarn/ ./.yarn

COPY .yarnrc ./


FROM base as shared

COPY apps/shared/ ./apps/shared

RUN yarn workspace @workspace/shared install


FROM base as web

COPY --from=shared $APP_WORKDIR/apps/shared/ ./apps/shared

COPY apps/web/ ./apps/web

RUN yarn workspace web install

# CMD ["tail", "-f", "/dev/null"]

FROM base as backend

COPY --from=shared $APP_WORKDIR/apps/shared/ ./apps/shared

COPY apps/backend/ ./apps/backend

RUN yarn workspace backend install

# CMD ["tail", "-f", "/dev/null"]

FROM base as mobile

COPY --from=shared $APP_WORKDIR/apps/shared/ ./apps/shared

COPY apps/mobile/ ./apps/mobile

RUN yarn workspace mobile install

# CMD ["tail", "-f", "/dev/null"]

FROM base AS development

ENV NODE_ENV=$NODE_ENV_DEVELOPMENT

COPY --from=shared $APP_WORKDIR/apps/shared/ ./apps/shared

COPY --from=web $APP_WORKDIR/apps/web/ ./apps/web

COPY --from=backend $APP_WORKDIR/apps/backend/ ./apps/backend

COPY --from=mobile $APP_WORKDIR/apps/mobile/ ./apps/mobile


FROM base AS production

ENV NODE_ENV=$NODE_ENV_PRODUCTION

RUN yarn build
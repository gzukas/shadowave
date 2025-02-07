# Base image for Bun
FROM oven/bun:1.2.2 AS base
WORKDIR /usr/src/app

FROM base AS install
COPY . /temp
RUN cd /temp && bun install --filter ./apps/api --frozen-lockfile --production

FROM base AS builder
COPY --from=install /temp/node_modules node_modules
COPY . .
ENV NODE_ENV=production
RUN bun api build

FROM base AS release
COPY --from=builder /usr/src/app/apps/api/dist .

USER bun
ENTRYPOINT [ "./shadowave-api" ]

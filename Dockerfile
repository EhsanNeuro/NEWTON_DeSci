FROM node:iron AS base

# Config
WORKDIR /app
RUN npm i -g pnpm prisma

# Install
COPY . .
RUN ls -la
RUN pnpm install

# Build
RUN pnpm prisma generate
RUN pnpm run build
RUN ls -la
# Initalize database

# Run
CMD [ "pnpm", "run", "start:prod" ]

# Done 🐍

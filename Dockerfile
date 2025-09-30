# ---- Build Stage ----
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY app/package*.json ./
RUN npm ci
COPY app/ .
RUN npm test

# ---- Production Stage ----
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
EXPOSE 3000
CMD [ "npm", "start" ]

FROM node:22-alpine AS builder

RUN apk upgrade --no-cache

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_BASE=/
ENV VITE_BASE=${VITE_BASE}

RUN npm run build
RUN npm test

FROM nginx:alpine

RUN apk upgrade --no-cache

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

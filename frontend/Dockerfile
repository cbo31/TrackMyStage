# Stage 1 : Build
FROM node:24-alpine AS builder

WORKDIR /TrackMyStage
COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build

# Stage 2 : Production
FROM nginx:alpine

COPY --from=builder /TrackMyStage/dist /usr/share/nginx/html

EXPOSE 80
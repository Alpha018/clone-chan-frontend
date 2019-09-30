FROM node:11.10.1-alpine as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm config set unsafe-perm true

RUN npm install -g @angular/cli@8.3.0

RUN ng build --prod --build-optimizer

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/

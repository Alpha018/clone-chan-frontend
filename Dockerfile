FROM node:11.10.1-alpine as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli@8.3.0

RUN ng build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/

# build site
FROM node:14.0.0-alpine as build
ADD ./Frontend/qr-boxes-site/ /app
WORKDIR /app
# COPY . .
RUN yarn
RUN yarn build

# production
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /app
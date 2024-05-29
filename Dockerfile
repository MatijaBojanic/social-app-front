FROM node:19.7.0-buster-slim AS build

WORKDIR /social-app-front

COPY ./package.json /social-app-front
COPY ./package-lock.json /social-app-front

RUN npm ci

COPY ./ /social-app-front

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /social-app-front/dist /usr/share/nginx/html
COPY --from=build /social-app-front/docker/overwrite-default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]

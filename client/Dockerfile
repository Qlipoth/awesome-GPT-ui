FROM node:14-alpine as build-stage

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "build"]

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4000

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
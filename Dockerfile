FROM node:18.13.0

ENV APP_HOME /app
WORKDIR $APP_HOME

COPY package.json .
RUN npm install

COPY . ./

RUN chmod -R 777 entrypoint.sh

ENV PORT 3000
EXPOSE $PORT

FROM node:16
WORKDIR /app
RUN apt-get update && apt-get install
RUN npm install ts-node redis -g
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm","run","start:dev"]

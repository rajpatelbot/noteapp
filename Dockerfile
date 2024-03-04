FROM node:alpine3.18
WORKDIR /backend
COPY ./backend/package.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start" ]
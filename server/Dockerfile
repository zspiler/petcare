FROM node:14-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i 
COPY . .
EXPOSE 5000 
CMD [ "npm", "start", "app.js" ]
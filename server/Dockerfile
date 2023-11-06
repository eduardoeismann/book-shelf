FROM node:21.1.0
WORKDIR /app 
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000
CMD ["nodemon", "index.js"]


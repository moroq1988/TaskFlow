FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules && \
    npm clean-cache --force && \
    npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

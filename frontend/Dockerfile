FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules && \
    npm cache clean --force && \
    npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

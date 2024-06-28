FROM node:16

WORKDIR /app

COPY package.json ./

RUN npm install --production

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main.js"]

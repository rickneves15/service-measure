FROM node:lts-iron

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 3000
CMD [ "npm", "run", "start:dev"]
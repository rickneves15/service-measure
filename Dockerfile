FROM node:lts-iron

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

RUN npm install

COPY --chown=app:app . /app

COPY . .

RUN npm run build

RUN npm run prisma:generate

EXPOSE 3000
CMD [ "npm", "run", "start:dev"]
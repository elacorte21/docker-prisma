FROM node:slim

RUN apt-get update -y \
&& apt-get install -y openssl

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm ci

EXPOSE 4000

CMD ["sh", "-c", "npm run db:deploy && npm run dev"]
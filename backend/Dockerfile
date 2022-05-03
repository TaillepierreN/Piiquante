FROM node:latest
WORKDIR /app/src
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000 27015 27016 27017
CMD ["npm", "start"]

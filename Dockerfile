#syntax

#image
FROM node:lts-alpine

#project
WORKDIR /api-rest-node

#dependencies
COPY . .

#run
RUN npm install

#commands
CMD ["npm", "run", "server"]

#port
EXPOSE 3000
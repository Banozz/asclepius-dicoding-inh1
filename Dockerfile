FROM node:18-alpine  
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package*.json ./  
RUN npm install 
COPY . .  
EXPOSE 8080
CMD [ "npm", "run", "start"]
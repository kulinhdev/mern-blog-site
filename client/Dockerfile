# Specify the base image
FROM node:19.9.0

# Set the working directory
WORKDIR /app  

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application files to the container
COPY . .

EXPOSE 3000

# Serve the app with a static server
CMD [ "npm", "run", "dev" ]
